import { Processor, Process, OnQueueCompleted, OnGlobalQueueCompleted, OnQueueFailed } from '@nestjs/bull';
import { UsersService } from '@src/user/user.service';
import { Job } from 'bull';
import { generateJwtForPasswordReset } from '../utils/generateJwt';
import { EmailService } from './email.service';

@Processor('send-email')
export class SendEmailConsumer {
  constructor(
    private userService: UsersService,
    private emailService: EmailService
  ) {}

  @Process('send-email-job')
  async sendEmail(job: Job) {
    const users = job.data;
    console.log('Sending email queue started');

    users?.users.forEach(async (user) => {
      const resetToken = await generateJwtForPasswordReset(
        user.email,
        user.id,
        process.env.JWT_EXPIRES_INITIAL_EMAIL
      );

      await this.userService.update(user.id, {
        passwordResetToken: resetToken,
      });

      try {
        await this.emailService.sendMail(
          user,
          'initialEmail',
          'Verification Email',
          resetToken
        );
      } catch (error) {
        console.log('Error', error);
      }
    });
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    console.log(
      `Processor:@OnQueueCompleted - Completed job ${job.id} of type ${job.name}.`,
    );
  }

  @OnQueueFailed()
  onError(job: Job<any>, error) {
    console.log(
      `Processor:@OnQueueFailed - Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }
}
