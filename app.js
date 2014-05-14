// Create the configuratio
var config = {
  channels: ["#chavvos"],
  server: "irc.rizon.net",
  botName: "chavvelo"
};

// Get the lib
var irc = require("irc");
var get = require('get-json-plz');
var fs = require('fs')

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
  channels: config.channels,
  password: process.env.CHAVVELO_PASS
});

// Listen for joins
bot.addListener("join", function(channel, who) {
  // Welcome them in!
  if ( who == config.botName )
    bot.say(channel, "what farto #chavvos! 0/");
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

  // Log chat ****
  
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();  
  var chatlog_name = curr_date + "-" + curr_month + "-" + curr_year + '.log';
  var chatllog_msg = d + ' ' + from + ': ' + message + '\n';
  var chatlog = fs.appendFile('./chatlogs/' + chatlog_name, chatllog_msg, encoding='utf8', function(err) {
    if(err)
      console.log(err);
  });

});

bot.addListener('error', function(message) {
  bot.say('error: ', message);
});
