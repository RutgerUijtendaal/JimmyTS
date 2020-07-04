import { Client } from '@typeit/discord';

export class Main {
  private static _client: Client;

  static get Client(): Client {
    return this._client;
  }

  static start() {
    console.log('starting');
    this._client = new Client();

    // In the login method, you must specify the glob string to load your classes (for the framework).
    // In this case that's not necessary because the entry point of your application is this file.
    this._client.login(
      'MzMyMjgzNjA5MDI3MTgyNTky.XwCa6g.GoQptueHf_TdtkcTAw5TZG1YoAw',
      `${__dirname}/Jimmy.js`, // If you compile your bot, the file extension will be .js
    );

    console.log(Client.getCommands());
  }
}

Main.start();
