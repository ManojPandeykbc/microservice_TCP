import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class AppService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3000,
      },
    });
  }

  public accumulate() {
    return this.client.send<number, number[]>('add', [1, 2, 2]);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
