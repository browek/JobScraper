import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { PuppeteerService } from './puppeteer/puppeteer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'job_scraper',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, PuppeteerService],
  exports: [],
})
export class ApiModule {}
