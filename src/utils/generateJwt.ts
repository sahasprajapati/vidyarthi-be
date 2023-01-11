import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export const generateJwtForPasswordReset = async (
  email: string,
  id: number,
  expiresIn: string
) => {
  const payload = { email, id };
  const configService = new ConfigService();
  return await new JwtService({
    secret: configService.get<string>('JWT_ACCESS_SECRET'),
  }).sign(payload, { expiresIn: expiresIn });
};
