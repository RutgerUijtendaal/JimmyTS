import * as Path from 'path';
import { Discord, CommandMessage, On, Client, Command, Description, ArgsOf } from '@typeit/discord';

export const prefix = '$';

@Discord(prefix, {
  import: [Path.join(__dirname, 'commands', '*.js'), Path.join(__dirname, 'events', '*.js')],
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
