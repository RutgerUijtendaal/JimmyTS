import { CommandBase } from './CommandBase';
import { Command, CommandMessage } from '@typeit/discord';

export abstract class Image extends CommandBase {
  private imagineSearchUrl = 'http://results.dogpile.com/serp?qc=images&q=';
  private urlRegex = /<a class="link" href="([A-Za-z0-9/:.%]+)"/g;

  @Command('i')
  async image(command: CommandMessage) {
    const url = this.buildUrlFromCommand(command.commandContent);
    this.get(url)
      .then((data) => this.filterMatches(data.data, this.urlRegex, null))
      .then((result) => command.channel.send(result[0]));
  }

  buildUrlFromCommand(commandContent: string): string {
    commandContent = this.stripPrefix(commandContent).replace(/ /g, '%20');
    return this.imagineSearchUrl + commandContent;
  }
}
