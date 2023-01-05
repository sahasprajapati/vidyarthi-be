import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { Public } from '@src/auth/decorator/public.decorator';
import { Request, Response } from 'express';
import { FacebookOauthGuard } from './facebook-oauth.guard';

@Controller('facebook')
export class FacebookOauthController {
  constructor(private jwtAuthService: AuthService) {}

  @Public()
  @Get()
  @UseGuards(FacebookOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Public()
  @Get('redirect')
  @UseGuards(FacebookOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // For now, we'll just show the user object
    return req.user;
  }
}