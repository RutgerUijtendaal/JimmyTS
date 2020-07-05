import { Command, CommandMessage, Description } from '@typeit/discord';
import { CommandBase } from './CommandBase';
import wiki from 'wikijs';

export abstract class Wikipedia extends CommandBase {
  @Command('wiki')
  @Description('Wikipedia article')
  async wiki(command: CommandMessage) {
    const query = this.stripPrefix(command.commandContent);
    wiki()
      .find(query)
      .then((page) => command.channel.send(page.url()));
  }
}
