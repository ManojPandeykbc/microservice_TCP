import { Message } from './message.events';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('HELLO_SERVICE') private readonly client: ClientProxy,
    private appService: AppService,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello(): string {
    this.client.emit<any>('message_printed', new Message('Hello World'));
    return 'Hello World printed';
  }

  @Post('add')
  async accumulate() {
    return this.appService.accumulate();
  }
}
