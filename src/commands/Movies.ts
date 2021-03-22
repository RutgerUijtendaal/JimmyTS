import { Command, CommandMessage, Description } from '@typeit/discord';
import { CommandBase } from './CommandBase';
import * as imdb from 'imdb-api';

export abstract class Movies extends CommandBase {
  private client = new imdb.Client({apiKey: process.env.MOVIE_TOKEN})

  @Command('imdb')
  @Description('Get Movie Data')
  async magic(command: CommandMessage) {
    this.client.search({name: this.sanitizeContent(command.commandContent)})
      .then((search) => {
        if(search.totalresults > 0) {
          this.handleSearchResult(search.results[0])
            .then(url => {
              command.channel.send(url);
            })
        } else {
          command.channel.send('Got empty search results');
        }
      })
      .catch((error) => {
        command.channel.send('Failed to find movies');
      })
  }

  private handleSearchResult(fuzzyResult: imdb.SearchResult): Promise<String> {
    return this.client.get({id: fuzzyResult.imdbid})
      .then((result) => {
        return this.buildResponse(result);
      })
      .catch((error) => {
        return 'Failed to find movie'
      })
  }

  private buildResponse(movie: imdb.Movie): string {
    return ':star:  ' + movie.rating.valueOf() + '/10' +
      '\n' +  
      movie.imdburl 
  }
}