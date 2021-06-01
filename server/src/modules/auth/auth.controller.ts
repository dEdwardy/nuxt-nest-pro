import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto, TokenDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService:AuthService
  ){}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() data:AuthDto){
    const { username,password } = data
    return await this.authService.validateUser(username,password)
  }
  @Get('test')
  @UseGuards(AuthGuard())
  authTest() {
    return {
      data:'ok'
    }
  }
}
