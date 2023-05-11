import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferPracuj } from '../../../entities/OfferPracuj';


@Injectable()
export class OfferPracujService {

    constructor(
        @InjectRepository(OfferPracuj) 
        private readonly offerRepository: Repository<OfferPracuj>
    ) {}

    createOffer(offerDetails) {
        this.findOneOffer(offerDetails.link)
        // this.findOneOfferBy({
        //     name: offerDetails.name, 
        //     company: offerDetails.company
        // })
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
    async findOneOfferBy(offer) {
        return await this.offerRepository.findOneByOrFail(offer)
    }

    async changeOffer(body) {
        return await this.offerRepository.save(body)
    }
}
