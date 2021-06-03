import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArticleState } from 'server/src/core/interfaces/enums/article-state.enum';
import { ArticleService } from './article.service';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(
    private readonly articleService:ArticleService
  ){ }

  @Post('save')
  @HttpCode(HttpStatus.OK)
  save(@Body() data) {
    return this.articleService.saveArticle(data)
  }

  @Post('publish')
  @HttpCode(HttpStatus.OK)
  publish(@Body() data) {
    return this.articleService.publishArticle(data)
  }
  
  @Get()
  async getAllAndCount(){
    const [list,total] = await this.articleService.queryAndCount()
    return {
      list,
      total
    } 
  }
}
