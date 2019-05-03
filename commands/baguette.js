
//METADATA
exports.cmdtype = () => {
    return "fun";
}
const desc = "Baguette."; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
exports.run = (config, client, message, args) => {
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:
    const fs = require('fs');
    var lines = fs.readFileSync('./yerFiles/baguette.txt', 'utf8').split(m.nl());

    msg = lines[Math.floor(Math.random() * lines.length)];
    message.channel.send(msg);

    //--------------------------------------------------------------------
    //m.logSend(config, client, message, msg); //Method will send msg to user, and also log it in both console AND log channel.
    m.log(config, client, message, "<" + msg + ">"); //Alternative will log msg without sending msg.
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}