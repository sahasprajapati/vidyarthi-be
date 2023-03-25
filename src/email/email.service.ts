import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { generateJwtForPasswordReset } from '../utils/generateJwt';
// import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { User } from '@prisma/client';
import { UsersService } from '@src/user/user.service';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
    private userService: UsersService, // @InjectQueue('send-email') private readonly sendEmailQueue: Queue
  ) {}

  async sendMail(
    user: any,
    emailTemplate: string,
    emailSubject: string,
    token: string,
  ) {
    const link = `http://localhost:3000/reset-password?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: emailSubject,
        template: `./${emailTemplate}`,
        context: {
          name: user.name,
          email: user.email,
          password: user.password,
          link: link,
        },
      });
      return `Mail Sent Successfully to ${user.email}`;
    } catch (error) {
      return '500 Error';
    }
  }

  async sendInitialEmail(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('No user found');
    }

    if (user.isVerified) {
      throw new BadRequestException('User already verified');
    }

    const resetToken = await generateJwtForPasswordReset(
      user.email,
      user.id,
      process.env.JWT_EXPIRES_INITIAL_EMAIL,
    );

    await this.userService.update(user.id, {
      passwordResetToken: resetToken,
    });

    return this.sendMail(
      user,
      'initialEmail',
      'Verification Email',
      resetToken,
    );
  }

  // async sendBulkInitialEmail(emails: string[]) {
  //   // let users = { usersFoundList: [], usersNotFoundList: [] };
  //   // emails.forEach(async (email) => {
  //   //   const user = await this.userService.findByEmail(email);
  //   //   if (user) {
  //   //     users.usersFoundList.push(user);
  //   //   } else {
  //   //     users.usersNotFoundList.push(user);
  //   //   }
  //   // });

  //   const users = await this.userService.findManyByEmail(emails);
  //   await this.sendEmailQueue.add('send-email-job', {
  //     users,
  //   });

  // }
}
