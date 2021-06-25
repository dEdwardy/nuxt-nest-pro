import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdDto } from './ad.dto';
import { Ad } from './ad.entity';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad)
    private readonly adRepository: Repository<Ad>,
  ) { }
  add(ad:AdDto){
    return this.adRepository.save(ad)
  }
  async update(id:string, ad:AdDto){
    const { url, sort } = ad
    const entity = await this.adRepository.findOne(id)
    if (url) entity.url = url
    if (sort) entity.sort = sort
    return this.adRepository.save(entity)
  }
  remove(id) {
    return this.adRepository.delete({ id })
  }
  getAll() {
    return this.adRepository.find()
  }
}
