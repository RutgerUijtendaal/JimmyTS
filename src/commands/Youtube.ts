import { Command, CommandMessage } from '@typeit/discord';
import { CommandBase } from './CommandBase';

export abstract class Youtube extends CommandBase {
  private ytSearchUrl = 'https://www.youtube.com/results?search_query=';
  private ytResponseurl = 'http://www.youtube.com/watch?v=';
  private urlRegex = /\"url\":\"\/watch\?v=(.{11})\"/g;

  @Command('yt')
  async youtube(command: CommandMessage) {
    this.get(this.ytSearchUrl + this.sanitizeContent(command.commandContent))
      .then((response) => this.filterMatches(response.data, this.urlRegex))
      .then((result) => command.channel.send(this.ytResponseurl + result[0]));
  }
}
