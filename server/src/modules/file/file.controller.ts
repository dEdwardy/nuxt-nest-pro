import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  saveFile(@UploadedFiles() files:Express.Multer.File[]) {
    const data = files.map(({ filename, mimetype, size,path }) => ({
      filename,
      mimetype,
      size,
      url:path,
    }))
    return this.fileService.saveFiles(data)
  }
}
