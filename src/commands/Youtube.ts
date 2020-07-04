import { Command, CommandMessage } from '@typeit/discord';
import { CommandBase } from './CommandBase';

export abstract class Youtube extends CommandBase {
  private ytSearchUrl = 'https://www.youtube.com/results?search_query=';
  private ytResponseurl = 'http://www.youtube.com/watch?v=';
  private urlRegex = /\"url\":\"\/watch\?v=(.{11})\"/g;

  @Command('yt')
  async youtube(command: CommandMessage) {
    const url = this.buildUrlFromCommand(this.stripPrefix(command.commandContent));
    this.get(url)
      .then((data) => this.filterMatches(data.data, this.urlRegex, null))
      .then((result) => command.channel.send(this.ytResponseurl + result[0]));
  }

  buildUrlFromCommand(commandContent: string): string {
    commandContent = this.stripPrefix(commandContent).replace(/ /g, '+');
    return this.ytSearchUrl + commandContent;
  }
}
