import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api/api.controller';
import { OfferJJIT } from './entities/OfferJJIT';
import { JJITService } from './api/services/scrapper/JJIT.service';
import { OfferJJITService } from './api/services/offer/offerJJIT.service';
import { OnApplicationBootstrap } from '@nestjs/common';
import { PracujService } from './api/services/scrapper/pracuj.service';
import { OfferPracuj } from './entities/OfferPracuj';
import { OfferPracujService } from './api/services/offer/offerPracuj.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'scrapper_database',
      entities: [OfferJJIT, OfferPracuj],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([OfferJJIT, OfferPracuj])
  ],
  controllers: [ApiController],
  providers: [JJITService, PracujService, OfferJJITService, OfferPracujService],
  exports: [OfferJJITService],
})

export class ApiModule implements OnApplicationBootstrap{
  private readonly logger = new Logger(ApiModule.name, { timestamp: true });

  constructor(public jjitService: JJITService) {}

  onApplicationBootstrap() {

    // this.logger.verbose('Start scraping')
    // this.jjitService.getData()
  }
}
