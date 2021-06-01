import { IsNotEmpty, IsEmail, IsMobilePhone } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
import { UserState } from '../../core/interfaces/enums/user-state.enum';

export class UserDto {
    @ApiProperty({ description:'用户名', example: 'Rose'})
    @IsNotEmpty({ message: '请填写用户姓名' })
    readonly username: string;

    @ApiProperty({ description:'密码', example: 'Rose'})
    @IsNotEmpty({ message: '请填写密码' })
    readonly password: string;

    @ApiProperty({ description:'邮箱', example: 'Rose@qq.com'})
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description:'电话', example: '13896330350'})
    @IsMobilePhone()
    readonly phone: string;

    @ApiProperty({ description:'公司', example: '13896330350'})
    readonly company: string;

    @ApiProperty({ description:'职位', example: '13896330350'})
    readonly position: string;

    @ApiProperty({ description:'简介', example: '13896330350'})
    readonly desc: string;

}
export class UpdateUserDto {

  @ApiProperty({ description:'用户名', example: 'Rose'})
  readonly username: string;

  // @ApiProperty({ description:'密码', example: 'Rose'})
  // @IsNotEmpty({ message: '请填写密码' })
  // readonly password: string;

  @ApiProperty({ description:'状态', example:1})
  readonly status:UserState;

  @ApiProperty({ description:'邮箱', example: 'Rose@qq.com'})
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description:'电话', example: '13896330350'})
  @IsMobilePhone()
  readonly phone: string;

  @ApiProperty({ description:'公司', example: '阿里巴巴'})
  readonly company: string;

  @ApiProperty({ description:'职位', example: 'web前端'})
  readonly position: string;

  @ApiProperty({ description:'简介', example: '...'})
  readonly desc: string;

}
