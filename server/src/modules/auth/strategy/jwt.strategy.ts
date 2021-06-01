import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserService } from '../../user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    })
  }

  async validate(payload, done: VerifiedCallback) {
    const { username } = payload
    //通过帐号密码登录 pc
    const entity = await this.userService.findOneByUsername(username)
    if (!entity) {
      //通过电话 邮箱 验证码登录 app h5
      // const info = await this.cacheService.get(payload.email)
      //只验证email 因为 code 会过期
      // if(payload.email)done(null, payload.email)
      done(new UnauthorizedException('未找到用户'))
    }
    //相当于  return entity
    done(null, entity)
  }
}
