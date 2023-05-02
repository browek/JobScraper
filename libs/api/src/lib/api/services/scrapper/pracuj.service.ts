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
            await sleep(1000)
        }
        await sleep(10000)
        await browser.close()
    }

    async newTab(browser, link) {
        const page = await browser.newPage();
        await page.goto(link, { timeout: 0 });
        await page.setViewport({
            width: 1000,
            height: 1800
        });
        try {
            const offerDetails = await page.evaluate(() => {
                const name = document.querySelector('h1[data-test="text-positionName"]').textContent.trim();
                const companyName = document.querySelector('h2[data-test="text-employerName"]').textContent.trim();
                const companyNameButton = document.querySelector('button[title="Dowiedz się więcej o pracodawcy"]').textContent.trim();
                const company = companyName.replace(companyNameButton, '')
                const img = document.querySelector('img[data-test="section-company-logo"]').getAttribute('src');
                const stackSection = document.querySelectorAll('div[data-test="section-technologies"] > .offer-viewfjH4z3');
                const expLvl = document.querySelector('div[data-test="sections-benefit-employment-type-name-text"]').textContent.trim() || 'Brak';
                const salary = document.querySelector('strong[data-test="text-earningAmount"]').textContent.trim() || 'Brak';
                const techStack = [];
                
                for(let i=0; i<stackSection.length; i++) {
                    const name = stackSection[i].querySelector('h3').textContent
    
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const items = [...stackSection[i].querySelector('ul').querySelectorAll('li')].map(e => e ? e.textContent : 'inne')
    
                    const stack = {
                        name,
                        items
                    }
                    techStack.push(stack)
                }
                const offer = {
                    name,
                    company,
                    img,
                    techStack,
                    expLvl,
                    salary
                }
    
    
                return offer
            });
            offerDetails.link = link
            console.log(offerDetails);
            this.createOffer(offerDetails)
        }catch(error){
            console.log('Brak elementów na stronie');
        }
        await page.close()
    }

    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }
}