
//METADATA
exports.cmdtype = () => {
    return "utility";
}
const desc = "Create a poll which can be voted in using reactions."; //Short description of what the command does.
const usage = "[poll message]"; //Any parameters required for command.
exports.run = (config, client, message, argsArr, args, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    msg = "**Poll**\r\n\r\n"
    + args +
    "\r\n\r\nProposed by: " + message.author.username +

    "\r\n\r\n Vote <:yes:393952580411064320> <:no:393952542964580353> <:neutral:393952502724427777>";
message.channel.send(msg).then(function (msge) {
    msge.react(bot.emojis.get("393952580411064320"));
    msge.react(bot.emojis.get("393952542964580353"));
    msge.react(bot.emojis.get("393952502724427777"));
});



    //--------------------------------------------------------------------
    //m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    m.log(config, client, message, msg); //Alternative will log msg without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}
