// Create the configuratio
var config = {
    channels: ["#chavvos"],
    server: "irc.rizon.net",
    botName: "chavvelo"
};

// Get the lib
var irc = require("irc");
var get = require('get-json-plz');

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels,
    password: process.env.CHAVVELO_PASS
});

// Listen for joins
bot.addListener("join", function(channel, who) {
    // Welcome them in!
    if ( who == config.botName )
        bot.say(channel, "quiuvole #chavvos! 0/");
    else
        bot.say(channel, "que pedo " + who );
});

bot.addListener("message", function(from, to, message) {
    if( message.indexOf('chavvelo') > -1 && /\bno\b/.test(message) ) {
        bot.say(to, 'no que?');
    }
    
    if( message.indexOf('chavvelo') > -1 && /.(ando horny)/.test(message) ) {
        // Read PornMD feed
        get('http://www.pornmd.com/getliveterms', function (err, data) {
            var keywords = data[0].keyword;
            keywords = keywords.split(' ').join('+');
            
            // Return porn link  
            bot.say(to, 'date http://www.pornmd.com/straight/' + keywords); 
        });
    }
});
