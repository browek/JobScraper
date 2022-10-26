import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';
import { ScrapperService } from './scrapper/scrapper.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'scrapper_database',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [ApiController],
  providers: [ApiService, ScrapperService],
  exports: [],
})
export class ApiModule {}
