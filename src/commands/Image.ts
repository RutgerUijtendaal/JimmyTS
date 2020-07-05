import { CommandBase } from './CommandBase';
import { Command, CommandMessage, Description, CommandNotFound } from '@typeit/discord';
import logger from '../util/Logger';

export abstract class Image extends CommandBase {
  private imageSearchUrl = 'http://results.dogpile.com/serp?qc=images&q=';
  private urlRegex = /<a class="link" href="([A-Za-z0-9/:.-_%]+)"/g;

  @CommandNotFound()
  @Description('Unknown command')
  async notFound(command: CommandMessage) {
    this.get(this.imageSearchUrl + command.content.substr(1).replace(/ /g, '%20'))
      .then((response) => this.filterMatches(response.data, this.urlRegex))
      .then((result) => command.channel.send(result[0]))
      .catch((error) => logger.error(error));
  }

  @Command('i')
  @Description('First image result')
  async image(command: CommandMessage) {
    this.get(this.imageSearchUrl + this.sanitizeContent(command.commandContent, '%20'))
      .then((response) => this.filterMatches(response.data, this.urlRegex))
      .then((result) => command.channel.send(result[0]))
      .catch((error) => logger.error(error));
  }

  @Command('ri')
  @Description('Random image result')
  async randomImage(command: CommandMessage) {
    this.get(this.imageSearchUrl + this.sanitizeContent(command.commandContent))
      .then((response) => this.filterMatches(response.data, this.urlRegex))
      .then((result) => command.channel.send(result[this.random(1, 5)]))
      .catch((error) => logger.error(error));
  }
}
