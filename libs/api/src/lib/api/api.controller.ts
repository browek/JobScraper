import { Body, Controller, Get, Put } from '@nestjs/common';
import { JJITService } from './services/scrapper/JJIT.service';
import { OfferJJITService } from './services/offer/offerJJIT.service';
import { PracujService } from './services/scrapper/pracuj.service';

@Controller('api')
export class ApiController {
    constructor(
        private jjitService: JJITService,
        private pracujService: PracujService,
        private offerService: OfferJJITService
        ) { }

    @Get('records')
    async getUsers() {
        return this.offerService.findAllOffers()
    }
    
    @Put('records')
    async changeOffer(@Body() body) {
        return this.offerService.changeOffer(body)
    }

    @Get('scrapJJIT')
    async scrapJJIT() {
        this.jjitService.getData()
        return 'scraping'
    }

    @Get('scrapPracuj')
    async scrapPracuj() {
        this.pracujService.getData()
        return 'scraping'
    }

}
