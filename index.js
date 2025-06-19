const { Telegraf} = require('telegraf');
const {message} = require('telegraf/filters')
const dotenv = require('dotenv').config();
const repository = require('./Repository/ControleGlicemiaRepository');


const bot = new Telegraf(process.env.BOT_TOKEN);


const userStates = {};

bot.command('start', (ctx) => {
  ctx.reply('Olá! Use /registrar para iniciar um novo registro de glicemia.');
});

bot.command('registrar', (ctx) => {
  const userId = ctx.from.id;
  userStates[userId] = { step: 'awaiting_glicemia' };
  ctx.reply('Informe o valor da glicemia (mg/dL):');
});

bot.on('text', async (ctx) => {
  try
  {const userId = ctx.from.id;
  const text = ctx.message.text;

  if (!userStates[userId]) {
    ctx.reply('Use o comando /registrar para começar.');
    return;
  }

  const userState = userStates[userId];

  if (userState.step === 'awaiting_glicemia') {
    const glicemia = parseFloat(text);
    if (isNaN(glicemia)) {
      ctx.reply('Valor inválido. Por favor, insira a glicemia em mg/dL:');
      return;
    }
    userState.glicemia = glicemia;
    userState.step = 'awaiting_carboidratos';
    ctx.reply('Agora informe a quantidade de carboidratos ingeridos (em gramas):');
  } else if (userState.step === 'awaiting_carboidratos') {
    const carbo = parseFloat(text);
    if (isNaN(carbo)) {
      ctx.reply('Quantidade inválida. Informe os carboidratos em gramas:');
      return;
    }
    userState.carboidratos = carbo;

    // === Cálculo (você pode personalizar aqui)
    const { glicemia, carboidratos } = userState;

    
    const fatorCorrecao = 30;
    const fatorCarbo = 5;

    let correcao = glicemia  / fatorCorrecao;
    let cobertura = carboidratos / fatorCarbo;
    let totalInsulina = correcao + cobertura;
    console.log('Tipo de totalInsulina:', typeof totalInsulina);
    let res = await repository.salvarDados(glicemia, correcao + cobertura);
    console.log('Tipo de totalInsulina:', typeof totalInsulina);
console.log('Valor de totalInsulina:', totalInsulina);
    ctx.reply(
        `📋 Registro:\n` +
        `Glicemia: ${glicemia} mg/dL\n` +
        `Carboidratos: ${carboidratos} g\n\n` +
        `💉 Dose sugerida:\n` +
        `Correção: ${correcao.toFixed(1)} U\n` +
        `Cobertura: ${cobertura.toFixed(1)} U\n` +
        `🔢 Total: ${totalInsulina.toFixed(1)} unidades de insulina \n` +
        `Dados ${res ? 'salvos com sucesso!' : 'não foram salvos'}`
      );
    
    // Limpa o estado
    delete userStates[userId];}
}catch (ex){
    ctx.reply(`Erro: ${ex.message}`)
    }
  
});
      
console.log("Bot Iniciado!");
bot.launch();