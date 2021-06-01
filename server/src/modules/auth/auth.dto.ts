import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthDto {
  @ApiProperty({title:'用户名',example:''})
  @IsNotEmpty()
  readonly username:string;
  @ApiProperty({title:'密码',example:''})
  @IsNotEmpty()
  readonly password:string;
}
export class TokenDto {
  @ApiProperty({title:'Token',example:''})
  readonly token?:string;
}