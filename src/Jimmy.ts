import * as Path from 'path';
import { Discord, CommandNotFound, CommandMessage, On, ArgsOf, Client } from '@typeit/discord';

@Discord('$', {
  import: [Path.join(__dirname, 'commands', '*.js')],
})
export class Jimmy {
  @On('message')
  onMessage([message]: ArgsOf<'message'>, client: Client) {}

  @CommandNotFound()
  notFound(command: CommandMessage) {
    command.reply('Unknown command');
  }
}
