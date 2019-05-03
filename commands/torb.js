
//METADATA
exports.cmdtype = () => {
    return "fun";
}
const desc = "TOrbrbrbrbBrbrbrBrBrBRBBRBRBRBRbRBRBRbRB"; //Short description of what the command does.
const usage = ""; //Any parameters required for command.
exports.run = (config, client, message, args) => {
    const m = require("./../shared/methods.js");
    var name = message.guild.member(message.author).displayName;
               // if (name === null) name = message.author.username;
                var msg = "TOrbrbrbrbBrbrbrBrBrBRBBRBRBRBRbRBRBRbRB";
                m.logSend(config, client, message, msg);
                //logMsg += msg;
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}