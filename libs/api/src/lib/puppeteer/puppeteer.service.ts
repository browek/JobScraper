import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer'

@Injectable()
export class PuppeteerService {

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
        await page.evaluate(() => {
            const table = document.querySelector('#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div > div')
            console.log(table.querySelector('div:nth-child(1)'))
      
        });
        // await browser.close();
        const scrollable_section = '#root > div.css-1smbjja > div.css-1xh23hj > div > div.css-110u7ph > div:nth-child(1) > div'
        await page.evaluate(selector => {
            const scrollableSection = document.querySelector(selector);
            scrollableSection.scrollTop = scrollableSection.scrollTop + 1000;
          }, scrollable_section);
        
    }

}
