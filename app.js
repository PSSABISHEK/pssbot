'use strict';

var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
    res.send("pssBot");
});

app.listen(port, function () {
    console.log('app is running on port:' + port);
});

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config')

var isReady = true;

console.log("Ready");

client.login(config.token);

client.on('message', async message => {
    // Voice only works in guilds, if the message does not come from a guild,
    // we ignore it
    if (!message.guild) return;

    if (isReady && message.content === '!pss') {
        isReady = false;
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voiceChannel) {
            message.reply('BHAHAHAHA...');
            const connection = await message.member.voiceChannel.join().then(connection => {
                const dispatcher = connection.playFile('./Audio/clip.mp3');
                dispatcher.on("end", end => {
                    message.member.voiceChannel.leave();
                });
            }).catch(err => console.log(err));
            isReady = true;
        } else {
            message.reply('You need to join a voice channel first!');
            isReady = true;
        }
    }
});
