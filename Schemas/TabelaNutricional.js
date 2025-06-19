
const mongoose = require('../Repository/MongoConnection');

const tabelaNutricionalSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    gramasDefault:{
        type: Number,
        default: 100
    },
    carboidratos:{
        type: Number,
        required: true
    }
});

const TabelaNutricional = mongoose.model('TabelaNutricional', tabelaNutricionalSchema);

module.exports = TabelaNutricional;
