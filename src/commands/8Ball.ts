import { CommandBase } from './CommandBase';
import { Command, CommandMessage, Description } from '@typeit/discord';

export abstract class Ball extends CommandBase {
  answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes – definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    "Don't count on it.",
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
  ];

  @Command('8ball')
  @Description('Ask the Magic 8-ball a question')
  async ball(command: CommandMessage) {
    command.channel.send(':8ball: ' + this.answers[this.random(0, this.answers.length - 1)] + ' :8ball:');
  }
}
