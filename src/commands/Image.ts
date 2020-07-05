import { CommandBase } from './CommandBase';
import { Command, CommandMessage } from '@typeit/discord';

export abstract class Image extends CommandBase {
  private imagineSearchUrl = 'http://results.dogpile.com/serp?qc=images&q=';
  private urlRegex = /<a class="link" href="([A-Za-z0-9/:.%]+)"/g;

  @Command('i')
  async image(command: CommandMessage) {
    this.get(this.imagineSearchUrl + this.sanitizeContent(command.commandContent, '%20'))
      .then((response) => this.filterMatches(response.data, this.urlRegex))
      .then((result) => command.channel.send(result[0]))
      .catch((error) => console.log(error));
  }
}
