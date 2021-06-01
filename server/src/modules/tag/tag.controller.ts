import { Body, Controller, Delete, Get,Put, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../category/category.service';
import { TagDto } from './tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
@ApiTags('标签')
export class TagController {
  constructor(
    private readonly tagService:TagService,
    private readonly categoryService:CategoryService
  ) {
  }
  readonly logger = new Logger()

  @Post()
  @HttpCode(HttpStatus.OK)
  async addTag(@Body() data:TagDto ){
    const { name,category } = data
    const isExist = await this.tagService.findOne({name })
    this.logger.debug(isExist)
    if(isExist)return { error: '当前标签已存在' }
    // if(!category || )
    this.logger.debug(category)
    const entity = await this.categoryService.findOne(category)
    this.logger.debug(JSON.stringify(entity))
    console.log(entity)
    if(!entity){
      return {
        error:'不存在当前类目'
      }
    }
    return this.tagService.createOne({
      name,
      category:entity
    })
  }

  @Put()
  async updateTag(@Body() data:TagDto) {
    return await this.tagService.updateOne(data)
  }
  @Get('list')
  async getTagListAndCount(){
    const [list,total] = await this.tagService.getListAndCount()
    return {
      list,
      total
    }
  }
  @Delete()
  removeById(@Body('id') id:number) {
    return this.tagService.deleteOne(id)
  }
}
