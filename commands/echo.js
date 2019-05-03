
//METADATA
exports.cmdtype = () => {
    return "testing";
}


const desc = "Repeats the message that YerBot sees."; //Short description of what the command does.
const usage = "[message]"; //Any parameters required for command.
exports.run = (config, client, message, a, args ) => {
    const m = require("./../shared/methods.js");
    //--------------------------------------------------------------------
    //Uncomment for protected owner-only command.
    //if(message.author.id !== config.ownerID) return; 
    //--------------------------------------------------------------------
    var msg = ""; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:

    msg = "|" + args + "|";


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