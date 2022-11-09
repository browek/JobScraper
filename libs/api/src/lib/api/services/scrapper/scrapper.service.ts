import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'
import { OfferService } from '../offer/offer.service';

@Injectable()
export class ScrapperService {
    constructor(private offerService: OfferService) {}
    async getData() {

        const browser = await puppeteer.launch(
            { headless: false }
            );
        const page = await browser.newPage();
        await page.goto('https://justjoin.it/remote/javascript/junior');
        await page.setViewport({
            width: 1200,
            height: 800
        });

        const subLink = await page.evaluate(() => {
            const table = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div > div')
            const offer = table.querySelector('div:nth-child(1)') 
            const offerLink: string = offer.querySelector('a').href.trim() //link

           return offerLink
        });

        this.offerService.findOneOffer(subLink)
        .then(() => console.log('Existed link'))
        .catch(() => {
            this.newTab(browser, subLink)
        })
        
        
        // // scroll
        // const scrollable_section = '#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div'
        // await page.evaluate(selector => {
        //     const scrollableSection = document.querySelector(selector);
        //     scrollableSection.scrollTop = scrollableSection.scrollTop + 1000;
        //   }, scrollable_section);
        // await browser.close();
        // await page.evaluate(() => {
        //     const table = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div > div')
        //     console.log(table.querySelector('div:nth-child(1)'))
      
        // });
    }
    async newTab(browser, subLink) {
        const newOfferTab = await browser.newPage();
        await newOfferTab.goto(subLink);

        const offerDetails = await newOfferTab.evaluate(() => {
            // main
            const mainTab = document.querySelector("#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-1pc9k2p > div.css-vuh3mm > div.css-1jqmyqn > div")
                const name = mainTab.querySelector('div.css-1id4k1').textContent.trim()
                const salary = mainTab.querySelector("div.css-1wla3xl").textContent.trim()
            // info
            const infoTab = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-1pc9k2p > div.css-vuh3mm > div.css-1kgdb8a')
                const offerCompany = infoTab.querySelector('div:nth-child(1) > a').textContent.trim()
                const expLvl = infoTab.querySelector('div:nth-child(3) > div.css-1ji7bvd').textContent.trim()
            // tech stack
            const techStackTab = document.querySelectorAll("#root > div > div.css-1xh23hj > div > div.css-1pc9k2p > div:nth-child(2) > div:nth-child(2) > div.css-1xc9aks > div > div")
            const techStack = [{}];
            techStackTab.forEach(elem => {
                const key = elem.querySelector('div.css-1eroaug').textContent.trim()
                const value = elem.querySelector('div.css-19mz16e').textContent.trim()
                techStack[key] = value
                // techStack.push({[key]: value})
            });
            const offerDetails = {
                name,
                offerCompany,
                salary,
                expLvl,
                techStack
            }
            console.log(offerDetails)
            return offerDetails
        })
        offerDetails.link = subLink
        console.log(offerDetails)

            // return offerDetails
    }
    
    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }
}
