const Discord = require("discord.js");
const newLine = require('os').EOL;

module.exports =
    {
        isNSFW: function (bot, channelID) {
            return bot.channels.get(channelID).nsfw;
        },
        getPerms: function (bot, serverID, userID) {
            getPerms(bot, serverID, userID);
        }
    };

function getPermsArray(bot, serverID, userID) {
    //TO-DO
};

function checkPerm(bot, serverID, userID) {
    //TO-DO
};

function getPermList() {
    return [
        "pin",
        "kick",
        "ban"
    ];
};

function getPresets() {
    
}

function addRolePerm(bot, serverID, roleID, permission) {
    if (getPermList().includes(permission)) {
        //TO-DO
    } else {
        return [false, "Permission not found."];
    }
}

function getRolePerms(bot, serverID, roleID) {
    //TO-DO
}