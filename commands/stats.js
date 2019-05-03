
//METADATA
exports.cmdtype = () => {
    return "core";
}
const desc = "Displays stats for YerBot"; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
exports.run = (config, client, message, argsArr, argsTxt, extraData) => {
    const bot = client;
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    var dn = new Date();
    var time = bot.uptime;
    var ftime = m.msToTime(time);

    bot.syncGuilds();

    var svnum = bot.guilds.array().length;
    var chnum = bot.channels.array().length;
    var usnum = 0;
    bot.guilds.array().forEach(element => {
        usnum += element.memberCount;
    });

    //TO-DO: finish current server stats.
    //var currserv = author.guild.name;



    var msg = "I have been online for:\r\n" + ftime + "\r\n\r\nServing:\r\n" + svnum + " servers,\r\n" + chnum + " channels, and\r\n" + usnum + " users!";
   


    //--------------------------------------------------------------------
    m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    //m.log(config, client, message, msg); //Alternative will log msg without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}