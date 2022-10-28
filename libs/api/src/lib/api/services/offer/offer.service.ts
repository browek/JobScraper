import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../../../entities/Offer';

@Injectable()
export class OfferService {

    constructor(
        @InjectRepository(Offer) 
        private readonly offerRepository: Repository<Offer>
    ) {}

    createOffer(offerDetails) {

        this.findOneOffer(offerDetails)
        .then(() => {
            console.log('This item is alredy exist')
        })
        .catch(() => {
            const newOffer = this.offerRepository.create(offerDetails)
            return this.offerRepository.save(newOffer)
        })
    }

    async findAllOffers() {
        return await this.offerRepository.find()
    }

    async findOneOffer(offerDetails) {
        return await this.offerRepository.findOneByOrFail({link: offerDetails.link})
    }
}
