const repository = require('../Repository/MongoRepository');


const calculoInsulina = async (glicemia, carboidratos) => {

    const fatorCorrecao = 30;
    const fatorCarbo = 5;
    const glicemiaAlvo = 100;

    let correcao = (glicemia - glicemiaAlvo) / fatorCorrecao;
    let cobertura = carboidratos / fatorCarbo;
    let totalInsulina = correcao + cobertura;

    let res = await repository.registrarGlicemia(glicemia, Math.round(totalInsulina));

    if(res){
        return {
            glicemia: glicemia, 
            carboidratos: 
            carboidratos, 
            correcao: correcao, 
            cobertura: cobertura, 
            totalInsulina: totalInsulina}
    } else {
        return null;
    }


}


module.exports = {calculoInsulina}