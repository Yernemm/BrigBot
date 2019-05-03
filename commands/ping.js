
//METADATA
exports.cmdtype = () => {
    return "core";
}
const desc = "Check the ping and response time of the bot."; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = "Calculating"; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    message.channel.send(msg)
    .then(msge =>{
        msg = `**Pong!**\r\nAverage websocket ping:  ${Math.round(bot.ping)}ms\r\nCalculated response time: ${(msge.createdTimestamp - message.createdTimestamp)}ms`;
        msge.edit(msg);
        m.log(config, client, message, msg);
    })
    .catch(err =>{
        m.log(config, client, message, err);
        m.logSend(config, client, message, msg);
    });



    //--------------------------------------------------------------------
    //m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
     //Alternative will log msg without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}