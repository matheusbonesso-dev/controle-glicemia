const { Scenes } = require('telegraf');
const { calculoInsulina } = require('../Service/ControleGlicemiaService');

const carboidratosScene = new Scenes.BaseScene('carboidratosScene');

carboidratosScene.enter((ctx) => {
  ctx.reply('Agora, quantos carboidratos você vai consumir?');
});

carboidratosScene.on('text', async (ctx) => {
  const carboidratos = ctx.message.text;
  if (isNaN(carboidratos)) {
    return ctx.reply('Por favor, envie um número válido para a quantidade de carboidratos.');
  }
  ctx.reply(`Vou fazer os cálculos e salvar na base.`);
 let res =  await calculoInsulina(ctx.session.glicemia, carboidratos);
  if(!res){
    ctx.reply(`Opa algo deu errado.`);
  } else {
    ctx.reply(  
      `📋 Registro:\n` +
      `Glicemia: ${res.glicemia} mg/dL\n` +
      `Carboidratos: ${res.carboidratos} g\n\n` +
      `💉 Dose sugerida:\n` +
      `Correção: ${res.correcao.toFixed(1)} U\n` +
      `Cobertura: ${res.cobertura.toFixed(1)} U\n` +
      `🔢 Total: ${res.totalInsulina.toFixed(1)} unidades de insulina \n`)
  }

  ctx.scene.leave();
});

module.exports = carboidratosScene;