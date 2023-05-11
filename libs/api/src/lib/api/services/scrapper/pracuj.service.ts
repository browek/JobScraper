import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'
import { OfferPracujService } from '../offer/offerPracuj.service';


export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

@Injectable()
export class PracujService {
    constructor(private offerService: OfferPracujService) { }

    async getData() {
        const sites = [
            { name: 'Pracuj.pl: js Rzeszów / remote', link: 'https://www.pracuj.pl/praca/rzeszow;wp?rd=30&cc=5016%2C5015&et=1%2C17' },
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
        await this.getLinks(browser, page, name)
        await sleep(30000)
        await browser.close()
        console.log('\x1b[36m%s\x1b[0m', name, '- End scraping')
    }

    async getLinks(browser, page, name) {
        await page.waitForSelector('.cookies_cvyuaxh')
        await page.$eval('.cookies_cvyuaxh', el => el.remove());
        const links = await page.$$eval(('div.listing_c1dc6in8 > a[data-test="link-offer"]'), links => {
            return links.map(link => (link as HTMLAnchorElement).href);
        });
        let s = 10
        // eslint-disable-next-line prefer-const
        for (let i = 0; i < links.length; i++) {
            const offerLink = this.cutLink(links[i])
            this.offerService.findOneOffer(offerLink)
                .then(() => {
                    console.log('\x1b[34m%s\x1b[0m', name, '- Checking', i + 1, '/', links.length, '\x1b[2m', 'Existed link')
                    s = 10
                })
                .catch(async () => {
                    s = 1000
                    console.log('\x1b[34m%s\x1b[0m', name, '- Checking', i + 1, '/', links.length, '\x1b[32m', 'Getting data')
                    await this.newTab(browser, offerLink)
                })
            await sleep(s)
        }
        try {
            const path = 'button[data-test="top-pagination-next-button"]'
            const clickable = await page.evaluate(()=> {
                const hidden = document.querySelector('button.hidden[data-test="top-pagination-next-button"]')
                if(hidden) {
                    return false
                } else {
                    return true
                }
            }, path)
            if(clickable) {
                await page.click(path)
                await this.getLinks(browser, page, name)
            } else {
                await sleep(3000)
                page.close()
            }

            } catch (error) {
            console.log(error);
        }
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
            let location
            let remote

            try {
                name = await page.$eval('h1[data-test="text-positionName"]', elem => elem.textContent.trim());
            } catch (e) {
                // console.log(e);
            }
            try {
                location = await page.evaluate(() => {
                    return document.querySelector('div[data-test="sections-benefit-workplaces"] > div > div').textContent.trim()
                })
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
                remote = await page.$eval('div[data-test="sections-benefit-work-modes-text"]', elem => elem.textContent.trim());
            } catch (e) {
                // console.log(e);
            }
            try {
                techStack = await page.evaluate(() => {
                    const stackSection = document.querySelectorAll('div[data-test="section-technologies"] > .offer-viewfjH4z3');
                    console.log(stackSection);
                    const table = []
                    for (let i = 0; i < stackSection.length; i++) {
                        const name = stackSection[i].querySelector('h3').textContent

                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        const items = [...stackSection[i].querySelector('ul').querySelectorAll('li')].map(e => e ? e.textContent : 'inne')

                        const stack = {
                            name,
                            items
                        }
                        table.push(stack)
                    }
                    return table
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
                link,
                location,
                remote
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