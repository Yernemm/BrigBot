
//METADATA
exports.cmdtype = () => {
    return "core";
}

const desc = "Tell Yerbot that it's good."; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
exports.run = (config, client, message, args) => {
    const m = require("./../shared/methods.js");

    //--------------------------------------------------------------------
    var msg = "Thank you! <:yHappy:398973907576553472>"; //Put response message to be logged here.
    //--------------------------------------------------------------------

    //COMMAND LOGIC HERE:




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