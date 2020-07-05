import { Client } from '@typeit/discord';
import * as dotenv from 'dotenv';

export class Main {
  private static client: Client;

  static get Client(): Client {
    return this.client;
  }

  static start() {
    console.log('starting');
    this.client = new Client();
    this.client.login(process.env.BOT_TOKEN, `${__dirname}/Jimmy.js`);

    console.log(Client.getCommands());
  }
}

dotenv.config();
Main.start();
