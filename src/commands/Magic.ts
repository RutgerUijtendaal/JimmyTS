import { Command, CommandMessage } from '@typeit/discord';
import { CommandBase } from './CommandBase';

export abstract class Magic extends CommandBase {
  private mtgSearchUrl = 'https://api.scryfall.com/cards/named?fuzzy=';

  @Command('mtg')
  async magic(command: CommandMessage) {
    this.get(this.mtgSearchUrl + this.sanitizeContent(command.commandContent))
      .then((response) => command.channel.send(response.data.image_uris.normal))
      .catch((error) => command.channel.send(error.response.data.details));
  }
}
