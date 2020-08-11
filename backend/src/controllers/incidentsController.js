const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query; // esquema de paginação

        const [count] = await connection('incidents').count(); //contagem do número de casos

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']); // contagem no header da resposta da requisição

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization; //precisamos saber se a ong ralemente criou o id foi realmente criado, para deletar, se não precisamos vetar o pedido

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id') // seleciona apenas a coluna ong_id
            .first(); //retorna apenas 1 resultado

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' }); //altera o status para negado
        }
        await connection('incidents').where('id', id).delete();

        return response.status(204).send();//retorna para o front que não tem conteúdo para retornar
    }
};