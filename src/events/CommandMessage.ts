import { On, ArgsOf } from '@typeit/discord';
import { Client, Message } from 'discord.js';
import { prefix } from '../Jimmy';
import { CommandEvent } from '../rabbitmq/CommandEvent';
import { Rabbit } from '../rabbitmq/RabbitMQ';

export abstract class CommandMessage {
  @On('message')
  async onCommandMessage([message]: ArgsOf<'message'>) {
    if (message.content.startsWith(prefix)) {
      this.sendCommandMessage(message);
    }
  }

  public sendCommandMessage(message: Message) {
    let content: CommandEvent = {
      id: message.id,
      userId: message.author.id,
      username: message.author.username,
      serverId: message.guild.id,
      serverName: message.guild.name,
      content: message.content,
    };

    Rabbit.sendCommandMessage(JSON.stringify(content));
  }
}
