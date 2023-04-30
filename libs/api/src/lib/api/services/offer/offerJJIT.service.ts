import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferJJIT } from '../../../entities/OfferJJIT';

@Injectable()
export class OfferJJITService {

    constructor(
        @InjectRepository(OfferJJIT) 
        private readonly offerRepository: Repository<OfferJJIT>
    ) {}

    createOffer(offerDetails) {

        this.findOneOffer(offerDetails.link)
        .then(() => {
            console.log('This item is alredy exist')
        })
        .catch(() => {
            const newOffer = this.offerRepository.create(offerDetails)
            return this.offerRepository.save(newOffer)
        })
    }

    async findAllOffers() {
        return await this.offerRepository.find({
            order: {
                id: "DESC"
            }
        })
    }

    async findOneOffer(offerLink) {
        return await this.offerRepository.findOneByOrFail({link: offerLink})
    }

    async changeOffer(body) {
        return await this.offerRepository.save(body)
    }
}
