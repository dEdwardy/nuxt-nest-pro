import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdModule } from '../ad/ad.module';
import { CategoryModule } from '../category/category.module';
import { TagModule } from '../tag/tag.module';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    CategoryModule,
    TagModule,
    AdModule
  ],
  exports:[
    UserService
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
