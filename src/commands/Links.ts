import { CommandBase } from './CommandBase';
import { Command, Description, CommandMessage } from '@typeit/discord';

export abstract class Magic extends CommandBase {
  private inviteLink = 'https://discord.com/oauth2/authorize?client_id=331454231955505153&scope=bot';
  private githubLink = 'https://github.com/RutgerUijtendaal/JimmyTS';
  private message = `\`\`\`Invite link: \n    ${this.inviteLink}\n\nGithub: \n    ${this.githubLink}\n\n\`\`\``;

  @Command('links')
  @Description('Useful links')
  async magic(command: CommandMessage) {
    command.channel.send(this.message);
  }
}
