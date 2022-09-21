import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(private apiService: ApiService) { }

    @Get('records')
    getUsers() {
        return this.apiService.getRecords()
    }
}
