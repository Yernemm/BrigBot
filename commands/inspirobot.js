//METADATA
const desc = "Returns an inspirobot image"; //Short description of what the command does.
const usage = "[xmas]"; //Any parameters required for command.
const cmdtype = "fun"; //Type of command
const Discord = require("discord.js");
//Command
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "hmm"; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    var http = require('http');

    var apiLink = "http://inspirobot.me/api?generate=true";
    if(argsArr[0] == "xmas")
    apiLink += "&season=xmas";
  
    var request = require('request');
request(apiLink, function (error, response, body) {
  const embed = new Discord.RichEmbed()
  .setTitle("Get inspired...")
  .setColor(0x229c18)
  .setImage(body);

  message.channel.send({embed});
  m.log(config, client, message, body);
});


    //--------------------------------------------------------------------
    //m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    //m.log(config, client, message, msg); //Alternative will log msg without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}
exports.cmdtype = () => {
    return cmdtype;
}