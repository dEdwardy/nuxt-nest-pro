import { BadRequestException, Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'
import { diskStorage } from 'multer'
import { FileController } from './file.controller'
import { File } from './file.entity'
import { FileService } from './file.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    MulterModule.register({
      // dest: './uploads',
      limits: {
        fieldSize: 1024 * 1024 * 20,
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads')
        },
        filename: (req, file, cb) => {
          const time = Date.now()
          cb(null, time+'-'+file.originalname)
        },
      }),
      fileFilter: (req, file, callback) => {
        const mimetypes = ['image/png', 'image/jpg', 'image/jpeg','image/webp']
        const allowed = mimetypes.some((type) => type === file.mimetype)
        if (allowed) {
          callback(null, true)
        } else {
          callback(new BadRequestException('仅支持jpg jpeg png webp格式的图片 '), false)
        }
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
