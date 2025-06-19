const {iniciarBot} = require('./Controller/GlicemiaController')
require('dotenv').config()
const bot = iniciarBot(process.env.BOT_TOKEN);

// Iniciar o bot
bot.launch();