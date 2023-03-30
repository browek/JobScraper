import { Body, Controller, Get, Put } from '@nestjs/common';
import { ScrapperService } from './services/scrapper/scrapper.service';
import { OfferService } from './services/offer/offer.service';

@Controller('api')
export class ApiController {
    constructor(
        private scrapperService: ScrapperService,
        private offerService: OfferService
        ) { }

    @Get('records')
    async getUsers() {
        return this.offerService.findAllOffers()
    }
    
    @Get('scrap')
    async scrap() {
        this.scrapperService.getData()
        return 'scraping'
    }

    @Put('records')
    async changeOffer(@Body() body) {
        return this.offerService.changeOffer(body)
    }
}
