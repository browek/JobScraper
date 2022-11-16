import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'
import { OfferService } from '../offer/offer.service';

@Injectable()
export class ScrapperService {
    constructor(private offerService: OfferService) {}

    getData() {
        const linksTab = [
            'https://justjoin.it/remote/javascript/junior',
            'https://justjoin.it/remote/testing/junior'
    ]
    linksTab.forEach(link => {
        this.scrap(link)
    });
    }

    async scrap(link) {
        const browser = await puppeteer.launch({ 
            headless: true,
            devtools: true,
            slowMo: 1000,
        });
        const page = await browser.newPage();
        await page.goto(link, {timeout: 0});
        await page.setViewport({
            width: 1000,
            height: 1800
        });
    
        const allOffers = await page.evaluate(() => {
            const allOffers = document.querySelector("#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-13jvhmn > div.css-1x7tcfa > a.css-agbnxz > div > div > span").textContent.trim()
            return parseInt(allOffers)
        });
    
        let offerNumber = 0;
        do {
            const subLink = await page.evaluate((offerN) => {
                console.log(offerN)
                const table = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div > div')              
                const offerLink = table.querySelectorAll('a')[offerN].href.trim()
                
                const visibleOffers = (table.childElementCount)
                
                return {offerLink, visibleOffers}
            },offerNumber);
            
            this.offerService.findOneOffer(subLink.offerLink)
            .then(() => console.log('Existed link'))
            .catch(async () => {
                await this.newTab(browser, subLink.offerLink)
            })
            
            if(offerNumber>subLink.visibleOffers) {
                this.scroll(page)
            }
            console.log(offerNumber, subLink.visibleOffers,allOffers)
            offerNumber ++
        } while(offerNumber < allOffers)
        page.close()
            setTimeout(() => {  
                    browser.close()
            }, 60000)
    }


    async scroll(page) {
        const scrollable_section = '#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div'
        await page.evaluate(selector => {
            const scrollableSection = document.querySelector(selector);
            scrollableSection.scrollTop = scrollableSection.scrollTop + 1000;
          }, scrollable_section);
    }
    
    async newTab(browser, subLink) {
        const newOfferTab = await browser.newPage();
        await newOfferTab.setViewport({
            width: 1000,
            height: 1800
        });
        await newOfferTab.goto(subLink, {timeout: 0});

        const offerDetails = await newOfferTab.evaluate(() => {
            // main
            const mainTab = document.querySelector("#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-1pc9k2p > div.css-vuh3mm")
                const img = mainTab.querySelector('img').src.trim()
                const name = mainTab.querySelector('div.css-1id4k1').textContent.trim()
                const salary = mainTab.querySelector("div.css-1wla3xl").textContent.trim()
            // info
            const infoTab = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-1pc9k2p > div.css-vuh3mm > div.css-1kgdb8a')
                const company = infoTab.querySelector('div:nth-child(1) > a').textContent.trim()
                const expLvl = infoTab.querySelector('div:nth-child(3) > div.css-1ji7bvd').textContent.trim()
            // tech stack
            const techStackTab = document.querySelector("#root > div > div.css-1xh23hj > div > div.css-1pc9k2p")
            const techStackTab2 = techStackTab.querySelectorAll("div.css-1xc9aks > div > div")

            const techStack = {};
            // const techStack = [];
            techStackTab2.forEach(elem => {
                const key = elem.querySelector('div.css-1eroaug').textContent.trim()
                const value = elem.querySelector('div.css-19mz16e').textContent.trim()
                techStack[key] = value
                // techStack.push({[key]: value})
            });
            const offerDetails = {
                name,
                company,
                salary,
                expLvl,
                techStack,
                img
            }
            console.log(offerDetails)
            return offerDetails
        })
        offerDetails.link = subLink
        console.log(offerDetails)

        this.createOffer(offerDetails)
        newOfferTab.close()
    }
    
    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }
}