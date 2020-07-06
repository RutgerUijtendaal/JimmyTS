# JimmyBotTS


JimmyBot is a Discord bot that provides utility to a server. It uses the ```!``` as a prefix for commands.

## Commands

Jimmy provides the following utility commands:

Command | Function 
 --- | --- 
!help| Returns a list of all available commands
!yt  | Return the first Youtube video based on query
!ryt | Returns a random Youtube video based on query. Selection is based on first 5 videos after the first
!i   | Return the first image result based on query
!ri  | Return a random image based on query. Selection is based on first 5 videos after the first
!mtg | Return the image of a Magic the Gatering card
!wiki| Return the link to a Wikipedia article
!grim| Return a spell description from the Dungeons and Dragons Grimoire
!8ball| Ask the Magic 8-ball a question

If a message comes through that starts with a ```!``` but the command following it is not recognized the bot defaults to ```!i``` and an image is returned based on the text following the ```!```.

## Usage

The newest version of the bot gets build into a Docker image and hosted as a package on this repo.

A ```$BOT_TOKEN``` environmental variable is required on the server for the bot to connect.
