import { Body, Controller, Get, Put } from '@nestjs/common';
import { PracujService } from './services/scrapper/pracuj.service';
import { OfferPracujService } from './services/offer/offerPracuj.service';

@Controller('api')
export class PracujController {
    constructor(
        private pracujOfferService: OfferPracujService,
        private pracujService: PracujService,
        ) { }

    @Get('pracuj')
    async getUsers() {
        return this.pracujOfferService.findAllOffers()
    }
    
    @Put('pracuj')
    async changeOffer(@Body() body) {
        return this.pracujOfferService.changeOffer(body)
    }

    @Get('scrapPracuj')
    async scrapPracuj() {
        this.pracujService.getData()
        return 'scraping'
    }

}
