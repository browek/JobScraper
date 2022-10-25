import { Controller, Get } from '@nestjs/common';
import { PuppeteerService } from '../scrapper/scrapper.service';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(
        private apiService: ApiService,
        private puppeteerService: PuppeteerService,

        ) { }

    @Get('records')
    async getUsers() {
        this.puppeteerService.getData()

        return this.apiService.getRecords()
    }
}
