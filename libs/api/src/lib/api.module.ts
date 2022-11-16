import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api/api.controller';
import { Company } from './entities/Company';
import { Offer } from './entities/Offer';
import { ScrapperService } from './api/services/scrapper/scrapper.service';
import { OfferService } from './api/services/offer/offer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'scrapper_database',
      entities: [Offer, Company],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Offer])
  ],
  controllers: [ApiController],
  providers: [ScrapperService, OfferService],
  exports: [OfferService],
})
export class ApiModule {}
