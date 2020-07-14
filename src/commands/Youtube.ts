import { Command, CommandMessage, Description } from '@typeit/discord';
import { CommandBase } from './CommandBase';
import log from '../util/Logger';

export abstract class Youtube extends CommandBase {
  private ytSearchUrl = 'https://www.youtube.com/results?search_query=';
  private ytResponseurl = 'http://www.youtube.com/watch?v=';
  private urlRegex = /\"url\":\"\/watch\?v=(.{11})\"/g;

  @Command('yt')
  @Description('First Youtube result')
  async youtube(command: CommandMessage) {
    this.get(this.ytSearchUrl + this.sanitizeContent(command.commandContent))
      .then((response) => this.filterMatches(response.data, this.urlRegex))
      .then((result) => command.channel.send(this.ytResponseurl + result[0]))
      .catch((error) => log.error(error));
  }

  @Command('ryt')
  @Description('Random Youtube result')
  async randomYoutube(command: CommandMessage) {
    this.get(this.ytSearchUrl + this.sanitizeContent(command.commandContent))
      .then((response) => this.filterMatches(response.data, this.urlRegex))
      .then((result) => command.channel.send(this.ytResponseurl + result[this.random(1, 5)]))
      .catch((error) => log.error(error));
  }
}
