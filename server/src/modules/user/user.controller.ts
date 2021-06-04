import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { ArticleState } from '../../core/interfaces/enums/article-state.enum'
import { UserState } from '../../core/interfaces/enums/user-state.enum'
import { CategoryService } from '../category/category.service'
import { UpdateUserDto, UserDto } from './user.dto'
import { UserService } from './user.service'

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    public userService: UserService,
    public ctegoryService: CategoryService
  ) {}
  @Post()
  @HttpCode(HttpStatus.OK)
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
  async findAllUser() {
    const [list, total] = await this.userService.findAllUser()
    return {
      list,
      total,
    }
  }

  @Get('/dict')
  @ApiOperation({ description: '获取字典' })
  async getDictList() {
    const category = await this.ctegoryService.findAll()
    const articleState= {}
    articleState[ArticleState.DRAFT] =  'draft'
    articleState[ArticleState.PUBLISHED] = 'published'
    articleState[ArticleState.HIDDEN] = 'hidden'
    const userState = {}
    userState[UserState.ENABLED] =  'enable'
    userState[UserState.DISABLED] =  'disabled'
    return {
      category,
      articleState,
      userState
    }
  }
}
