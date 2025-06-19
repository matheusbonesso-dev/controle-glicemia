const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/ControleGlicemia';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Conectado ao MongoDB!');
})
.catch(err => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

module.exports = mongoose;