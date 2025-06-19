const ControleGlicemia = require('../Schemas/ControleGlicemia');
const TabelaNutricional = require('../Schemas/TabelaNutricional');


const registrarGlicemia = async (glicemia, totalInsulina) =>{
    try{
        const glicemiaDB = new ControleGlicemia({
            valorGlicemia: glicemia,
            insulinaAplicada: totalInsulina
        });

        await glicemiaDB.save();
        return true;

    }catch(ex){
        console.log(`Erro ${ex.message}`);
        return false;
    }
}




module.exports = {registrarGlicemia}