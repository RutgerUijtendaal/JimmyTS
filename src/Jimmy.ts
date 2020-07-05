import * as Path from 'path';
import { Discord, CommandNotFound, CommandMessage, On, ArgsOf, Client, Command, Description } from '@typeit/discord';
import logger from './util/Logger';
import { Image } from './commands/Image';

@Discord('!', {
  import: [Path.join(__dirname, 'commands', '*.js')],
})
export class Jimmy {
  @Command('help')
  @Description('List all available commands')
  help(command: CommandMessage) {
    command.channel.send(this.buildHelpMessage());
  }

  buildHelpMessage() {
    let reply = '```';

    Client.getCommands().forEach((command) => {
      reply +=
        command.prefix.toString().substr(1, 1) + command.commandName.toString() + ': ' + command.description + '\n';
    });

    return reply + '```';
  }
}
