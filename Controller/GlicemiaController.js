const { Telegraf, session, Scenes } = require('telegraf');
const glicemiaScene = require('../Scenes/GlicemiaScene');
const carboidratosScene = require('../Scenes/CarboidratoScene');

// Função que inicializa o bot
const iniciarBot = (token) => {
  const bot = new Telegraf(token);

  // Criar o stage e adicionar as cenas
  const stage = new Scenes.Stage([glicemiaScene, carboidratosScene]);

  // Configuração do middleware do stage
  bot.use(session());
  bot.use(stage.middleware());

  // Comando para iniciar o processo de registro
  bot.command('registrarglicemia', (ctx) => {
    ctx.scene.enter('glicemiaScene'); // Inicia a cena de glicemia
  });

  return bot;
};

module.exports = { iniciarBot };