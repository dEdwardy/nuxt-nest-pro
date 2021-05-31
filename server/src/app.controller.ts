import { Controller, Get, Post, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }
  private readonly logger = new Logger()
  @Get()
  getHello () {

    this.logger.debug(process.env)
    return this.appService.getHello();
  }

  @Post('login')
  testPost (): string {
    return 'ok'
  }
}
