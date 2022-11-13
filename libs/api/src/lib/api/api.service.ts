import { Injectable } from '@nestjs/common';
import { OfferService } from './services/offer/offer.service';

@Injectable()
export class ApiService {
    constructor(private offerService: OfferService) {}

    getRecords() {
        return this.offerService.findAllOffers()
    }
}
