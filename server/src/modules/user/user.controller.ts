import { Body, Controller, Get, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateUserDto, UserDto } from './user.dto'
import { UserService } from './user.service'

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(public userService: UserService) {}
  @Post()
  @ApiOperation({ description: '添加用户' })
  createUser(@Body() user: UserDto) {
    return this.userService.addUser(user)
  }

  @Put()
  @ApiOperation({ description: '修改用户' })
  updateUser(@Body() user: UpdateUserDto) {
    return this.userService.updateUser(user)
  }

  @Get()
  @ApiOperation({ description: '查询用户' })
  async findAllUser(){
    const [ list,total ] = await this.userService.findAllUser()
    return {
      list,
      total
    }
  }
}
