const { Scenes } = require('telegraf');

const glicemiaScene = new Scenes.BaseScene('glicemiaScene');

glicemiaScene.enter((ctx) => {
  ctx.reply('Qual o valor da sua glicemia agora?');
});

glicemiaScene.on('text', async (ctx) => {
  const glicemia = ctx.message.text;
  if (isNaN(glicemia)) {
    return ctx.reply('Por favor, envie um número válido para a glicemia.');
  }

  ctx.session.glicemia = glicemia;
  ctx.scene.enter('carboidratosScene');
});



module.exports = glicemiaScene;