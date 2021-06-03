import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileDto } from './file.dto';
import { File } from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File) private readonly fileRepository:Repository<File>
  ){ }
  saveFiles(files:FileDto[]) {
    console.log(files)
    return this.fileRepository.save(files)
  }
}
