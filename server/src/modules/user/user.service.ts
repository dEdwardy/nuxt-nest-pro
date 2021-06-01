import { Injectable, BadRequestException, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository, getRepository, DeleteResult, UpdateResult } from 'typeorm'
import { UserDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userReposity: Repository<User>
  ) {}
  private readonly logger = new Logger()
  async isExist(data) {
    return await this.userReposity.findOne(data)
  }
  async addUser(user: UserDto) {
    const { username, phone, email } = user
    // if (phone) {
    //   const res = await this.isExist({ phone })
    //   if (res) {
    //     return {
    //       error: '电话号码已被使用',
    //     }
    //   }
    // }
    // if (email) {
    //   const res2 = await this.isExist({ email })
    //   if (res2) {
    //     return {
    //       error: '邮箱',
    //     }
    //   }
    // }
    return this.userReposity.save(user)
  }
  async updateUser(user: UpdateUserDto) {
    const { username, email, company, position, desc } = user
    const entity = await this.userReposity.findOne({ username })
    if (entity) {
      if (company) entity.company = company
      if (position) entity.position = position
      if (desc) entity.desc = desc
      return this.userReposity.save(entity)
    }else{
      return {
        error:'用户不存在'
      }
    }
  }

  async findAllUser() {
    return this.userReposity.findAndCount()
  }
  async findOneByUsername(username,password = false) {
    // return this.userReposity.findOne({ username})
    const queryBuilder = await this.userReposity.createQueryBuilder('user')
    queryBuilder.where('user.username = :username',{ username })
    if(password) {
      queryBuilder.addSelect('user.password')
    }
    const entity = await queryBuilder.getOne()
    return entity
  }
}
