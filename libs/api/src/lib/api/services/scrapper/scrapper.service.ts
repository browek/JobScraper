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
        const data = await page.evaluate(() => {
            const table = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div > div')
            const offer = table.querySelector('div:nth-child(1)') 

            const offerName = offer.querySelector('.jss247').textContent.trim() //name

            // const offerCompany = offer.querySelector('.jss253').textContent //company
            const offerLink = offer.querySelector('a').href.trim() //link
            const offerSalary = offer.querySelector('.jss264').textContent.trim() //salary

            const offerDetails = {
                name: offerName,
                // offerCompany,
                link: offerLink,
                salary: offerSalary
            }
            return offerDetails
        });
        this.createOffer(data)
        
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
    createOffer(offerDetails) {
        return this.offerService.createOffer(offerDetails)
    }
}
