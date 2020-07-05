import axios from 'axios';
import logger from '../util/Logger';

export abstract class CommandBase {
  stripPrefix(commandContent: string): string {
    return commandContent.substr(commandContent.indexOf(' ') + 1);
  }

  async get(url: string) {
    try {
      return await axios.get(url);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  filterMatches(string, regex, index = 1): string[] {
    let matches = [];
    let match;
    while ((match = regex.exec(string))) {
      matches.push(match[index]);
    }
    return matches;
  }

  sanitizeContent(content: string, spaceReplacement = '+') {
    return this.stripPrefix(content).replace(/ /g, spaceReplacement);
  }

  random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
