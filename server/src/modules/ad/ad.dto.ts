import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class AdDto {
  readonly id?: string

  @ApiProperty({title:'Banner地址',example:''})
  readonly url?: string

  @ApiProperty({title:'排序',example:0})
  readonly sort?: number
}
