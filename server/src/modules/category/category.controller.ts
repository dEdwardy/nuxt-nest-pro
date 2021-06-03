import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('分类')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ){}

  @Post()
  @HttpCode(HttpStatus.OK)
  addCategory(@Body() data:CategoryDto){
    return this.categoryService.createCategory(data)
  }

  @Put(':id')
  updateCategory(@Param('id')id,@Body() data:CategoryDto) {
    return this.categoryService.updateCategory(id,data)
  }

  @Delete()
  deleteOne(@Body('id') id) {
    return this.categoryService.deleteById(id)
  }

  @Get('list')
  async getAllCategoryAndCount() {
    const [list,total] = await this.categoryService.findAllAndCount()
    return {
      list,
      total
    }
  }
  @Get()
  getAllCategory() {
    return this.categoryService.findAll()
  }
}
