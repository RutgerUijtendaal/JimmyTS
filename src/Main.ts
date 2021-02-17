import { Client } from '@typeit/discord';
import * as dotenv from 'dotenv';
import logger from './util/Logger';

export class Main {
  private static client: Client;

  static get Client(): Client {
    return this.client;
  }

  static start() {
    logger.info('starting');
    this.client = new Client();
    this.client.login(process.env.BOT_TOKEN, `${__dirname}/Jimmy.js`).then(() => {
      this.client.user.setActivity('!help', { type: 'PLAYING' });
    });
    // logger.info(Client.getCommands());
  }
}

dotenv.config();
Main.start();
