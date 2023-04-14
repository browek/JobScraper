import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api/api.controller';
import { Offer } from './entities/Offer';
import { JJITService } from './api/services/scrapper/JJIT.service';
import { OfferService } from './api/services/offer/offer.service';
import { OnApplicationBootstrap } from '@nestjs/common';
import { PracujService } from './api/services/scrapper/pracuj.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'scrapper_database',
      entities: [Offer],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Offer])
  ],
  controllers: [ApiController],
  providers: [JJITService, PracujService, OfferService],
  exports: [OfferService],
})

export class ApiModule implements OnApplicationBootstrap{
  private readonly logger = new Logger(ApiModule.name, { timestamp: true });

  constructor(public jjitService: JJITService) {}

  onApplicationBootstrap() {

    this.logger.verbose('Start scraping')
    // this.jjitService.getData()
  }
}
