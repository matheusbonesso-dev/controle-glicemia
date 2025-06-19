const Postgres = require('postgres');
const dotenv = require('dotenv').config();

const postgresSql = Postgres({
    host                 : process.env.POSTGRES_HOST,            
    port                 : process.env.POSTGRES_PORT,         
    database             : process.env.POSTGRES_DB,            
    username             : process.env.POSTGRES_USERNAME,            
    password             : process.env.POSTGRES_PASS,  
    ssl                  : true
});

salvarDados = async (glicemia, totalInsulina) =>{
    try{ 
        let status = '';
     if(glicemia > 200 && glicemia < 300){
        status = 'Alta';
     } else if (glicemia > 300 ){
        status = 'Muito Alta';
     } else if (glicemia < 70 && glicemia > 60){
        status = 'Baixa';
     } else if (glicemia < 60){
        status = 'Muito baixa';
     } else {
        status = 'Boa';
     }
     const now = new Date();

     const hours = now.getHours();
     
     const minutes = now.getMinutes();
     
     const seconds = now.getSeconds();
     const formattedHours = String(hours).padStart(2, '0');
     const formattedMinutes = String(minutes).padStart(2, '0');
     const formattedSeconds = String(seconds).padStart(2, '0');
     
     // Combine the formatted components into the desired HH:mm:ss string
     const localTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
     
     await postgresSql `INSERT INTO public.tb_info_glicemia
    (valor_glicemia, status, data_registro, hora_registro, unidades_insulina)
        VALUES(${glicemia}, ${status}, CURRENT_DATE, ${localTime}, ${parseInt( Math.ceil(totalInsulina))});`;
    return true;  
} catch (ex)   {
    return false;
}

}

module.exports = {salvarDados}