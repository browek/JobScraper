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
            headless: true,
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

        for (let link of links) {
            link = this.cutLink(link)
            this.offerService.findOneOffer(link)
                .then(() => console.log('\x1b[2m%s\x1b[0m', 'Existed link'))
                .catch(async () => {
                    console.log('\x1b[32m%s\x1b[0m', 'Getting data')
                    await this.newTab(browser, link)
                })
            await sleep(100)
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
        link = this.cutLink(link)
        await sleep(5000)
        try {
            let name
            let company
            let img
            let techStack
            let expLvl
            let salary
            try {
                name = await page.$eval('h1[data-test="text-positionName"]', elem => elem.textContent.trim());
            } catch (e) {
                // console.log(e);
            }
            try {
                await page.waitForSelector('h2[data-test="text-employerName"]')
                const companyName = await page.$eval('h2[data-test="text-employerName"]', elem => elem.textContent.trim());
                const companyNameButton = await page.$eval('button.offer-viewzmDI89', elem => elem.textContent.trim());
                company = companyName.replace(companyNameButton, '')
            } catch (e) {
                // console.log(e);
            }
            try {
                await page.waitForSelector('img[data-test="section-company-logo"]')
                img = await page.$eval('img[data-test="section-company-logo"]', elem => elem.getAttribute('src'));
            } catch (e) {
                // console.log(e);
            }
            try {
                expLvl = await page.$eval('div[data-test="sections-benefit-employment-type-name-text"]', elem => elem.textContent.trim());
            } catch (e) {
                // console.log(e);
            }
            try {
                salary = await page.$eval('strong[data-test="text-earningAmount"]', elem => elem.textContent.trim());
            } catch (e) {
                // console.log(e);
            }
            try {
                techStack = await page.evaluate(() => {
                    const stackSection = document.querySelectorAll('div[data-test="section-technologies"] > .offer-viewfjH4z3');
                    console.log(stackSection);
                    for (let i = 0; i < stackSection.length; i++) {
                        const name = stackSection[i].querySelector('h3').textContent

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const items = [...stackSection[i].querySelector('ul').querySelectorAll('li')].map(e => e ? e.textContent : 'inne')

                        const stack = {
                            name,
                            items
                        }
                        const table = []
                        table.push(stack)
                        return table
                    }
                })
            } catch (e) {
                // console.log(e);
            }

            const offer = {
                name,
                company,
                img,
                expLvl,
                salary,
                techStack,
                link
            }
            // console.log(offer);
            this.createOffer(offer)
        } catch (error) {
            console.log('Brak elementów na stronie');
        }
        await page.close()
    }

    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }

    cutLink(link) {
        link = new URL(link);
        const params = new URLSearchParams(link.search);
        params.delete('searchId');
        link.search = params.toString();

        return link.href
    }
}