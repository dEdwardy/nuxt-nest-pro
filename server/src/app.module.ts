import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './modules/user/user.module'
import { ArticleModule } from './modules/article/article.module'
import { CategoryModule } from './modules/category/category.module'
import { TagModule } from './modules/tag/tag.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { CommentModule } from './modules/comment/comment.module'
import { AuthModule } from './modules/auth/auth.module'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './core/interceptors/transform.interceptor'
import { FileModule } from './modules/file/file.module';
import { StatusMonitorModule } from 'nest-status-monitor'
import { TaskModule } from './modules/task/task.module';
import MonitorConfig from './config/status-monitor'
import { ScheduleModule } from '@nestjs/schedule';
import { AdModule } from './modules/ad/ad.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.REMOTE_HOST,
      port: parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: ['.nest/**/*.entity{.ts,.js}'],
      synchronize: false,
      debug: false,
    }),
    //定时任务
    ScheduleModule.forRoot(),
    // api 节流
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 300,
    // }),
    //服务监控模块
    StatusMonitorModule.setUp(MonitorConfig),
    UserModule,
    ArticleModule,
    CategoryModule,
    TagModule,
    CommentModule,
    AuthModule,
    FileModule,
    TaskModule,
    AdModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule {}
