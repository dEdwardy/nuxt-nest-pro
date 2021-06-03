import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDto } from './category.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
  ) { }
  createCategory (data: CategoryDto) {
    return this.categoryRepository.save(data)
  }
  async updateCategory (id,data:CategoryDto) {
    const entity = await this.categoryRepository.findOne(id)
    if(entity){
      entity.name = data.name
    } else{
      return {
        error:'不存在该类目'
      }
    }
  }

  deleteById(id) {
    return this.categoryRepository.delete({id})
  }
  findAllAndCount () {
    return this.categoryRepository.findAndCount()
  }
  findAll() {
    return this.categoryRepository.find({ relations:['tag'] })
  }
  findOne(id) {
    return this.categoryRepository.findOne(id)
  }
}
