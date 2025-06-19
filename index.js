const { Telegraf} = require('telegraf');
const dotenv = require('dotenv').config();



const bot = new Telegraf(process.env.BOT_TOKEN);


bot.on('message', (msg) => {
    const message = msg.text;
    const chatId = msg.chat.id;

    bot.telegram.sendMessage(chatId, `Hello seu chatId = ${chatId}`);

});

bot.launch()