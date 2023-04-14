import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'
import { OfferService } from '../offer/offer.service';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Injectable()
export class PracujService {
    constructor(private offerService: OfferService) { }

    async getData() {
        const sites = [
            { name: 'Pracuj.pl Rzeszów', link: 'https://www.pracuj.pl/praca/rzeszow;wp?rd=30&cc=5016%2C5015&et=1%2C17' },
        ]
        sites.forEach(site => {
            this.scrap(site)
        });
    }

    async scrap({name, link}) {
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
        
          console.log(links); 

        const selectText = await page.evaluate(() => {
            const offersTable = []
            const offers = document.querySelectorAll('.b19e46yp')
            const offersArray =  Array.from(offers)
            for(const offer of offersArray) {
                const title = offer.querySelector('h2[data-test="offer-title"]').textContent.trim();
                const companyName = offer.querySelector('h4[data-test="text-company-name"]').textContent.trim();
                // const logoLink = offer.querySelector('img').getAttribute('src');

                const field = {
                    title,
                    companyName,
                    // logoLink
                }
                offersTable.push(field)
            }
            return offersTable
          });
        //   console.log(selectText);
    }

    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }
}