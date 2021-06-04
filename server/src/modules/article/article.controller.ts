import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ArticleState } from 'server/src/core/interfaces/enums/article-state.enum';
import { ArticleService } from './article.service';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(
    private readonly articleService:ArticleService
  ){ }

  @ApiProperty({ title:'保存文章为草稿'})
  @Post('save')
  @HttpCode(HttpStatus.OK)
  save(@Body() data) {
    return this.articleService.saveArticle(data)
  }

  @ApiProperty({ title:'发布文章'})
  @Post('publish')
  @HttpCode(HttpStatus.OK)
  publish(@Body() data) {
    return this.articleService.publishArticle(data)
  }

  @ApiProperty({ title:'获取文章详情'})
  @Get(':id')
  getArticleById(@Param('id') id:string) {
    return this.articleService.getOneById(id)
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
