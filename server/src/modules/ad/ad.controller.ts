import { Body,Get, Controller, Delete, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { AdDto } from './ad.dto';
import { AdService } from './ad.service';

@Controller('ad')
@ApiTags('广告')
export class AdController {
  constructor(private readonly adService: AdService) {}
  @Post()
  @ApiProperty({ title: '添加广告' })
  @HttpCode(HttpStatus.OK)
  addOne(@Body() ad: AdDto) {
    return this.adService.add(ad)
  }
  @Put('id')
  @ApiProperty({ title: '修改广告' })
  UpdateOne(@Param() id: string, @Body() ad: AdDto) {
    return this.adService.update(id, ad)
  }
  @Delete()
  @ApiProperty({ title: '删除广告' })
  DeleteOne(id: string) {
    return this.adService.remove(id)
  }
  @Get()
  getAll() {
    return this.adService.getAll()
  }
}
