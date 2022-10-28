import { Controller, Get } from '@nestjs/common';
import { ScrapperService } from './services/scrapper/scrapper.service';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(
        private apiService: ApiService,
        private scrapperService: ScrapperService,

        ) { }

    @Get('records')
    async getUsers() {
        this.scrapperService.getData()

        return this.apiService.getRecords()
    }
}
