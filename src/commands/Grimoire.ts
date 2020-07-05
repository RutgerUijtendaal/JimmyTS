import { Command, CommandMessage, Description } from '@typeit/discord';
import { CommandBase } from './CommandBase';
import JSSoup from 'jssoup';
import logger from '../util/Logger';

export abstract class Grimoire extends CommandBase {
  private grimSearchUrl = 'https://thegrimoire.xyz/spells/';

  @Command('grim')
  @Description('Grimoire spell')
  async grimoire(command: CommandMessage) {
    this.get(this.grimSearchUrl + this.sanitizeContent(command.commandContent.toLowerCase(), '-'))
      .then((response) => this.buildSpellFromPage(response.data))
      .then((message) => command.channel.send(message))
      .catch((error) => logger.error(error));
  }

  buildSpellFromPage(data) {
    let message = [];
    let soup = new JSSoup(data);

    message.push(this.spellName(soup));
    message.push(this.seperator());
    message.push(...this.spellDetails(soup));
    message.push(this.seperator());
    message.push(...this.spellDescription(soup));

    return '```md\n' + message.join('\n\n').substr(0, 1980) + '```';
  }

  spellName(soup: JSSoup): string {
    const spellName = soup.find('h2');
    return '#' + spellName.text;
  }

  spellDetails(soup: JSSoup): string[] {
    let result = [];
    const spellDetailsRaw = soup.find('div', 'four');
    const spellDetails = spellDetailsRaw.findAll('p');

    spellDetails.slice(0, spellDetails.length - 1).forEach((details) => {
      details.findAll('strong').forEach((strongTag) => {
        result.push('[' + strongTag.text + ']' + '(' + strongTag.nextSibling.toString().substr(2) + ')');
      });
    });

    return result;
  }

  spellDescription(soup: JSSoup): string[] {
    let result = [];

    const article = soup.find('article');
    const spellDescription = article.findAll(['p', 'ul']);

    spellDescription.forEach((section) => {
      result.push(section.text);
    });

    return result;
  }

  seperator(): string {
    return '< ' + '-'.repeat(40) + ' >';
  }
}
