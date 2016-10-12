'use strict';

var TrumpBot = require('../lib/trumpbot');

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var trumpbot = new TrumpBot({
    token: token,
    dbPath: dbPath,
    name: name
});

trumpbot.run();
