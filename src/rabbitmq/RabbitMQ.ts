import * as dotenv from 'dotenv';
import * as amqp from 'amqplib';
import log from '../util/Logger';

class RabbitMQ {
  channel: amqp.Channel;
  url =
    'amqp://' +
    process.env.AMQP_USERNAME +
    ':' +
    process.env.AMQP_PASSWORD +
    '@' +
    process.env.AMQP_HOST +
    ':' +
    process.env.AMQP_PORT;

  constructor() {
    this.initialize();
  }

  public sendCommandMessage(content: string) {
    this.sendMessage(content, process.env.AMQP_COMMAND_KEY);
  }

  private initialize() {
    amqp.connect(this.url).then((conn) =>
      conn.createChannel().then((channel) => {
        channel.assertExchange(process.env.AMQP_EXCHANGE, 'topic', { durable: false });
        log.info(`Created exchange ${process.env.AMQP_EXCHANGE}`);
        this.channel = channel;
      }),
    );
  }

  private sendMessage(content: string, routingKey: string) {
    log.info(`Publishing message "${content}" to key "${routingKey}"`);
    this.channel.publish(process.env.AMQP_EXCHANGE, routingKey, Buffer.from(content, 'utf-8'));
  }
}

dotenv.config();
export let Rabbit = new RabbitMQ();
