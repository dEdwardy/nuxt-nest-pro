import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService:JwtService,
    ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username,true)
    if (user && user.password === password) {
      const { password, ...result } = user
      const token = await this.signToken(result)
      return {
        ...result,
        token
      }
    }
    return {
      error:'用户名或密码错误'
    }
  }
  async signToken(data) {
    return await this.jwtService.sign(data);
  }
}
