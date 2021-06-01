import { ApiProperty } from "@nestjs/swagger";

export class CategoryDto {
  @ApiProperty({ description:'类目名称' })
  readonly name:string;
}
