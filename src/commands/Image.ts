import { CommandBase } from './CommandBase';
import { Command, CommandMessage, Description, CommandNotFound } from '@typeit/discord';
import { image_search } from 'duckduckgo-images-api';
import logger from '../util/Logger';

export abstract class Image extends CommandBase {
  @CommandNotFound()
  @Description('Unknown command')
  async notFound(command: CommandMessage) {
    this.getImageArray(command.content.substr(1))
      .then((result) => command.channel.send(result[0].image))
      .catch((error) => logger.error(error));
  }

  @Command('i')
  @Description('First image result')
  async image(command: CommandMessage) {
    this.getImageArray(this.sanitizeContent(command.commandContent, ' '))
      .then((result) => command.channel.send(result[0].image))
      .catch((error) => logger.error(error));
  }

  @Command('ri')
  @Description('Random image result')
  async randomImage(command: CommandMessage) {
    this.getImageArray(this.sanitizeContent(command.commandContent, ' '))
      .then((result) => command.channel.send(result[this.random(1, 5)].image))
      .catch((error) => logger.error(error));
  }

  getImageArray(searchTerm: string) {
    const request = {
      query: searchTerm,
      moderate: false,   
      iterations: 1,
      retries: 2
    }

    return image_search(request);
  }
}
