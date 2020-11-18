import { Controller, Get, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private readonly appService: AppService) {}

  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.text);
  }

  @MessagePattern('add')
  async accumulate(data: number[]) {
    this.logger.log('Adding : ' + data.toString());
    return this.appService.accumulate(data);
  }
}
