// Create the configuratio
var config = {
    channels: ["#chavvos"],
    server: "irc.rizon.net",
    botName: "chavvelo"
};

// Get the lib
var irc = require("irc");

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels,
    password: "pachecoloco666"
});

// Listen for joins
bot.addListener("join", function(channel, who) {
    // Welcome them in!
    if ( who == config.botName )
        bot.say(channel, "quiuvole #chavvos! 0/");
    else
        bot.say(channel, "que pedo " + who );
});
