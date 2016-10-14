# TrumpBot
### Because to make a bot more stupid is to make it more Trump

Okay so this project started as a challenge to learn how to build a slack chat bot in under an hour. It is very simple and only responds when it's being called out by name.

## Source

"He knows it, I know it, everybody knows it."

## Why Slack?

So this is actually a coding challenge too and the criteria to pass is to build a simple slack chat bot.

## Configuration

### Obtain slack bot app token

Follow the instructions on https://api.slack.com/bot-users
Obtain an app token

### Setup

```
$ git clone git@github.com:bitbyt/trumpbot.git

$ cd trumpbot

$ npm i

```

## Starting with Node.js

For mac users, in your terminal, type: BOT_API_KEY=your_slack_api_key node bin/bot.js

## Possible Next Steps

- Add tests.

## Tech Stack

* Node.js
* SQLite3 for some very basic database stuff
* [Slackbots](https://www.npmjs.com/package/slackbots)
* Axios to talk to the API

## API

[What Does Trump Think](https://whatdoestrumpthink.com/) a free api with some hilarious responses. Do check it out.

## Special Thanks

[This awesome tutorial](https://scotch.io/tutorials/building-a-slack-bot-with-node-js-and-chuck-norris-super-powers)
