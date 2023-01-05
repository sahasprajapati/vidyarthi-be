import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '@src/auth/auth.service';
import { Public } from '@src/auth/decorator/public.decorator';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';

@Controller('google')
export class GoogleOauthController {
  constructor(private jwtAuthService: AuthService) {}

  @Public()
  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Public()
  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // For now, we'll just show the user object
    return req.user;
  }
}