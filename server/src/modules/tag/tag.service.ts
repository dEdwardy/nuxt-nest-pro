import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { TagDto } from './tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly tagRepository:Repository<Tag>,
    private readonly categoryService: CategoryService
  ){ }

  createOne(data){
    return this.tagRepository.save(data)
  }

  async updateOne(data:TagDto){
    const { id,name,category } = data;
    const entity = await this.tagRepository.findOne({ id });
    if(entity){
        const categoryEntity = await this.categoryService.findOne(category)
        if(!categoryEntity)return { error:'该类目不存在！' }
        entity.name = name
        entity.category = categoryEntity
        return await this.tagRepository.save(entity)
    }else{
      return { error:'该标签不存在！' }
    }
  }

  findOne(options = {}) {
    return this.tagRepository.findOne(options)
  }

  find(options = {}) {
    return this.tagRepository.find()
  }

  deleteOne (id) {
    return this.tagRepository.delete({id});
  }

  getListAndCount() {
    return this.tagRepository.findAndCount({ relations:['category'] })
  }
}
