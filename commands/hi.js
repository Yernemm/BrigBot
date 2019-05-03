
//METADATA
exports.cmdtype = () => {
    return "core";
}
const desc = "Says 'Hello' back to you!";
const usage = "";
exports.run = (config, client, message, args) => {
    const m = require("./../shared/methods.js");
    var name = message.guild.member(message.author).displayName;
               // if (name === null) name = message.author.username;
                var msg = "Hello " + name + "!";

                m.logSend(config, client, message, msg);
                //logMsg += msg;
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}
exports.desc = () =>{
    return desc;
}
exports.use = () =>{
    return usage;
}
