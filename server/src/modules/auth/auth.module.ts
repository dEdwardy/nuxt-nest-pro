import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    UserModule,
    // JwtModule.register({
    //   secretOrPrivateKey: process.env.JWT_SECRET_KEY,
    //   signOptions: {
    //     expiresIn: process.env.JWT_SECRET_EXPIRES,
    //   },
    // }),
    JwtModule.registerAsync({
      useFactory:(config:ConfigService) => ({
          secret:config.get('JWT_SECRET_KEY'),
          signOptions:{
            expiresIn: config.get('JWT_SECRET_EXPIRES')
          }
      }),
      inject:[ConfigService]
    }),
    // PassportModule.register({
    //   defaultStrategy: process.env.Auth_Default_Strategy,
    // }),
    PassportModule.registerAsync({
      useFactory:(config:ConfigService) => ({
        defaultStrategy: config.get('Auth_Default_Strategy')
    }),
    inject:[ConfigService]
    })
  ],
  exports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
