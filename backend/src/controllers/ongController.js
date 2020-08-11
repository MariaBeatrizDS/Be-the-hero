const generateUniqueId = require('../utils/generateUniqueId');
//const crypto = require('crypto'); // importar uma biblioteca de criptografia
const connection = require('../database/connection'); //importanto a conexão com o banco de dados 

module.exports = {
    async index(request, response) { //async - mostra que tem uma unção que stá fora de sincronia, e o await é para esperar essa função primeira.
        const ongs = await connection('ongs').select('*'); // selecionar todos os campos de todos os registros da tabela ongs

        return response.json(ongs); //retorna o array com o que foi salvo no banco de dados
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();
        //const id = crypto.randomBytes(4).toString('HEX'); // gera um id de 4 caracteres hexadecimais

        await connection('ongs').insert({ // await - vai esperar esse código, até o uf, finalizar para então continuar
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id }); //o que vai ser devolvido de resposta para o cliente na rota, vai devolver o id para ela se conectar.
    }
};