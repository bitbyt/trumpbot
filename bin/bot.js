'use strict';

var TrumpBot = require('../lib/trumpbot');
var http = require('http');

var token = process.env.BOT_API_KEY;
var dbPath = process.env.BOT_DB_PATH;
var name = process.env.BOT_NAME;

var trumpbot = new TrumpBot({
    token: token,
    dbPath: dbPath,
    name: name
});

trumpbot.run();

http.createServer(function (req, res) {

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.send('it is running\n');

}).listen(process.env.PORT || 5000);
