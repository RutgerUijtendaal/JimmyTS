import axios from 'axios';

export abstract class CommandBase {
  stripPrefix(commandContent: string): string {
    return commandContent.substr(commandContent.indexOf(' ') + 1);
  }

  async get(url: string) {
    try {
      return await axios.get(url);
    } catch (error) {
      console.log(error);
    }
  }

  filterMatches(string, regex, index): string[] {
    index || (index = 1);
    let matches = [];
    let match;
    while ((match = regex.exec(string))) {
      matches.push(match[index]);
    }
    return matches;
  }
}
