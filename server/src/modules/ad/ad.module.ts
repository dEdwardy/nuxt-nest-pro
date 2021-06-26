import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileModule } from '../file/file.module';
import { AdController } from './ad.controller';
import { Ad } from './ad.entity';
import { AdService } from './ad.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Ad]),
    FileModule
  ],
  exports:[AdService],
  controllers: [AdController],
  providers: [AdService]
})
export class AdModule {}
