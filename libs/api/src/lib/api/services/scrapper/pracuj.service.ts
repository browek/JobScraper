import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'
import { OfferPracujService } from '../offer/offerPracuj.service';


export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Injectable()
export class PracujService {
    constructor(private offerService: OfferPracujService) { }

    async getData() {
        const sites = [
            { name: 'Pracuj.pl Rzeszów', link: 'https://www.pracuj.pl/praca/rzeszow;wp?rd=30&cc=5016%2C5015&et=1%2C17' },
        ]
        sites.forEach(site => {
            this.scrap(site)
        });
    }

    async scrap({ name, link }) {
        const browser = await puppeteer.launch({
            headless: false,
            // devtools: true,
            slowMo: 10,
        });
        const page = await browser.newPage();
        await page.goto(link, { timeout: 0 });
        await page.setViewport({
            width: 1000,
            height: 1800
        });


        const links = await page.$$eval(('a[data-test="link-offer"]'), links => {
            return links.map(link => (link as HTMLAnchorElement).href);
        });

        for (const link of links) {
            this.offerService.findOneOffer(link)
                .then(() => console.log('\x1b[2m%s\x1b[0m', 'Existed link'))
                .catch(async () => {
                    console.log('\x1b[32m%s\x1b[0m', 'Getting data')
                    await this.newTab(browser, link)
                })
        }
    }

    async newTab(browser, link) {
        const page = await browser.newPage();
        await page.goto(link, { timeout: 0 });
        await page.setViewport({
            width: 1000,
            height: 1800
        });
        const offerDetails = await page.evaluate(() => {
            const title = document.querySelector('h1[data-test="text-positionName"]').textContent.trim();
            let companyName = document.querySelector('h2[data-test="text-employerName"]').textContent.trim();
            const companyNameButton = document.querySelector('button[title="Dowiedz się więcej o pracodawcy"]').textContent.trim();
            companyName = companyName.replace(companyNameButton, '')
            const logoLink = document.querySelector('img[data-test="section-company-logo"]').getAttribute('src');
            const stackSection = document.querySelectorAll('div[data-test="section-technologies"] > .offer-viewfjH4z3');
            // const techStack = [stackSection].map(div => div.querySelectorAll(''));

            const offer = {
                title,
                companyName,
                logoLink,
                // techStack
            }


            return offer
        });
        offerDetails.link = link
        // this.createOffer(offerDetails)
    }

    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }
}