'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');
var axios = require('axios');

var TrumpBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'therealdonald';
    this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'trumpbot.db');

    this.user = null;
    this.db = null;
};

// inherits methods and properties from the Bot constructor
util.inherits(TrumpBot, Bot);

module.exports = TrumpBot;

TrumpBot.prototype.run = function() {
  TrumpBot.super_.call(this, this.settings);

  this.on('start', this._onStart);
  this.on('message', this._onMessage);
}

// bot onStart stuff

TrumpBot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

TrumpBot.prototype._connectDb = function () {
    if (!fs.existsSync(this.dbPath)) {
        console.error('Database path ' + '"' + this.dbPath + '" does not exists or it\'s not readable.');
        process.exit(1);
    }

    this.db = new SQLite.Database(this.dbPath);
};

TrumpBot.prototype._firstRunCheck = function () {
    var self = this;
    self.db.get('SELECT val FROM info WHERE name = "lastrun" LIMIT 1', function (err, record) {
        if (err) {
            return console.error('DATABASE ERROR:', err);
        }

        var currentTime = (new Date()).toJSON();

        // this is a first run
        if (!record) {
            self._welcomeMessage();
            return self.db.run('INSERT INTO info(name, val) VALUES("lastrun", ?)', currentTime);
            console.log("This is the first time I'm talking to you!");
        }
        console.log("You know, we've talked before.");
        // updates with new last running time
        self.db.run('UPDATE info SET val = ? WHERE name = "lastrun"', currentTime);
    });
};

TrumpBot.prototype._welcomeMessage = function () {
    this.postMessageToChannel(this.channels[0].name, 'This is gonna be HUGE!' +
        '\n I`m not a bot but you can`t tell the difference. Just say `Donald Trump` or `' + this.name + '` to invoke me!',
        {as_user: true});
};
//end onStart stuff

//bot onMessage stuff
TrumpBot.prototype._getChannelById = function (channelId) {
    return this.channels.filter(function (item) {
        return item.id === channelId;
    })[0];
};

TrumpBot.prototype._isChatMessage = function (message) {
    return message.type === 'message' && Boolean(message.text);
    console.log("this is a chat message");
};

TrumpBot.prototype._isChannelConversation = function (message) {
    return typeof message.channel === 'string' &&
        message.channel[0] === 'C';
};

TrumpBot.prototype._isFromTrumpBot = function (message) {
    return message.user === this.user.id;
};

TrumpBot.prototype._isMentioningTrumpBot = function (message) {
    return message.text.toLowerCase().indexOf('donald trump') > -1 ||
        message.text.toLowerCase().indexOf(this.name) > -1 ||
        message.text.indexOf(this.user.id) > -1;
        console.log("Message is mentioning this bot ", this.name);
};

TrumpBot.prototype._replyWithTrumpQuote = function (originalMessage) {
  console.log("originalMessage is ", originalMessage);
  var self = this;
  axios({
    method: 'get',
    url: 'quotes/random',
    baseURL: 'https://api.whatdoestrumpthink.com/api/v1/',
  }).then(function (response) {
    console.log(response);
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel(channel.name, response, {as_user: true});
  })
  .catch(function (error) {
    console.log(error);
  });
  //  self.db.get('SELECT id, joke FROM jokes ORDER BY used ASC, RANDOM() LIMIT 1', function (err, record) {
  //      if (err) {
  //          return console.error('DATABASE ERROR:', err);
  //      }
   //
  //      var channel = self._getChannelById(originalMessage.channel);
  //      self.postMessageToChannel(channel.name, record.joke, {as_user: true});
  //      self.db.run('UPDATE jokes SET used = used + 1 WHERE id = ?', record.id);
  //  });
};
//end onMessage stuff

//begin onStart function
TrumpBot.prototype._onStart = function () {
    console.log("Lemme tell you something..");
    this._loadBotUser();
    this._connectDb();
    this._firstRunCheck();
    console.log("this bot is gonna be huge!");
};

//begin onMessage function
TrumpBot.prototype._onMessage = function (message) {
  console.log("message is", message);
  console.log("bot user id is", this.user.id);
  console.log("bot name is", this.name);
  console.log("incoming user id is", message.user);
    if (this._isChatMessage(message) &&
        this._isMentioningTrumpBot(message)
    ) {
        this._replyWithTrumpQuote(message);
    }
};
