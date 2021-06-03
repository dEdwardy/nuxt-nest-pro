import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tag]),
    CategoryModule
  ],
  exports:[TagService],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
