import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'
import { OfferJJITService } from '../offer/offerJJIT.service';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Injectable()
export class JJITService {
    constructor(private offerService: OfferJJITService) { }

    async getData() {
        const linksTab = [
            { name: 'JustJoinIt: js remote', link: 'https://justjoin.it/remote/javascript/junior' },
            { name: 'JustJoinIt: tester remote', link: 'https://justjoin.it/remote/testing/junior' },
            { name: 'JustJoinIt: js Rzeszów', link: 'https://justjoin.it/rzeszow/javascript/junior' },
            { name: 'JustJoinIt: tester Rzeszów', link: 'https://justjoin.it/rzeszow/testing/junior' }
        ]
        linksTab.forEach(offers => {
            this.scrap(offers)
        });
    }

    async scrap({ name, link }) {
        const browser = await puppeteer.launch({
            headless: true,
            devtools: true,
            slowMo: 10,
        });
        const page = await browser.newPage();
        await page.goto(link, { timeout: 0 });
        await page.setViewport({
            width: 1000,
            height: 1800
        });
        try {
            const allOffers = await page.evaluate(() => {
                const allOffers = document.querySelector("#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-13jvhmn > div.css-1x7tcfa > a.css-agbnxz > div > div > span").textContent.trim()
                document.querySelector("#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div > div > div:nth-child(4) > div > a")
                return parseInt(allOffers)
            });

            let offerNumber = 0;
            do {
                const subLink = await page.evaluate((offerN) => {
                    // console.log(offerN)
                    const table = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div > div')
                    const offerLink = table.querySelectorAll('a')[offerN].href.trim()

                    const visibleOffers = (table.childElementCount)

                    return { offerLink, visibleOffers }
                }, offerNumber);

                this.offerService.findOneOffer(subLink.offerLink)
                    .then(() => console.log('\x1b[34m%s\x1b[0m', name, '- Checking', offerNumber, '/', allOffers, '\x1b[2m', 'Existed link'))
                    .catch(async () => {
                        console.log('\x1b[34m%s\x1b[0m', name, '- Checking', offerNumber, '/', allOffers, '\x1b[32m', 'Getting data')
                        await this.newTab(browser, subLink.offerLink)
                    })

                if (offerNumber > subLink.visibleOffers) {
                    this.scroll(page)
                }
                offerNumber++
            } while (offerNumber < allOffers)
            page.close()
            setTimeout(() => {
                browser.close()
                console.log('\x1b[36m%s\x1b[0m', name, '- End scraping')
            }, 60000)
        } catch (error) {
            browser.close()
            // console.log(error);
        }
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
        await newOfferTab.goto(subLink, { timeout: 0 });

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
            // console.log(offerDetails)
            return offerDetails
        })
        offerDetails.link = subLink

        this.createOffer(offerDetails)
        newOfferTab.close()
        console.log('\x1b[32m%s\x1b[0m', 'Added offer', `${offerDetails.company} - ${offerDetails.name}`)
    }

    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }
}