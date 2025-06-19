
const mongoose = require('../Repository/MongoConnection');

const controleGlicemiaSchema = new mongoose.Schema({
    valorGlicemia:{
        type: Number,
        required: true
    },
    dataHora:{
        type: Date,
        default: Date.now()
    },
    insulinaAplicada:{
        type: Number,
        required: true
    }
});

const ControleGlicemia = mongoose.model('ControleGlicemia', controleGlicemiaSchema);

module.exports = ControleGlicemia;
