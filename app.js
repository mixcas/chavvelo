// Create the configuratio
var config = {
  channels: ["#test"],
  server: "irc.xchannel.org",
  botName: "chavvelo"
};

// Get the lib
var irc = require("irc");
var get = require('get-json-plz');
var fs = require('fs')
var request = require('request');
var cheerio = require('cheerio');

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels,
  password: process.env.CHAVVELO_PASS
});

// Listen for joins
bot.addListener("join", function(channel, who) {
  // Welcome them in!
  if ( who == config.botName )
    bot.say(channel, "que paso cuates 0/");
  else
    bot.say(channel, "que pedo " + who );
});

bot.addListener("message", function(from, to, message) {

  // Responose to 
  // chavvelo + no
  if( message.indexOf('chavvelo') > -1 && /\bno\b/.test(message) ) {
    bot.say(to, 'no que?');
  }

  // Response to
  // chavvelo + ando horny    
  if( message.indexOf('chavvelo') > -1 && /.(ando horny)/.test(message) ) {
    // Read PornMD feed
    get('http://www.pornmd.com/getliveterms', function (err, data) {
      var keywords = data[0].keyword;
      keywords = keywords.split(' ').join('+');
      
      // Return porn link  
      bot.say(to, 'date http://www.pornmd.com/straight/' + keywords); 
    });
  }

  var urlRegexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;

  var matchUrl = urlRegexp.exec(message);

  if( matchUrl[0] ) {
  request(matchUrl[0], function (error, response, html) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(html);
      bot.say(to, 'Link: ' + $('title').text() );
      console.log($('title').text() );
    }
  });
    console.log('a');
  }

  // Log chat ****
  
  var d = new Date();
  var chatlog_name = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + '.log';
  var chatlog_msg = d + ' ' + from + ': ' + message + '\n';

  var chatlog = fs.appendFile('./chatlogs/' + chatlog_name, chatlog_msg, encoding='utf8', function(err) {
    if(err)
      console.log(err);
  });

});

bot.addListener('error', function(message) {
  bot.say('error: ', message);
});

