import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { Category } from "../category/category.entity";

export class TagDto {

  readonly id?;

  @ApiProperty({ description:'标签名称' })
  @IsNotEmpty({ message:'请输入标签名称' })
  readonly name:string;

  @ApiProperty({ description:'类目名称' })
  @IsNotEmpty({ message:'请输入类目名称' })
  readonly category:number
}
