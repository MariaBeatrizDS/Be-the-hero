const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection'); //conecção com o banco

describe('ONG', () => {
    beforeEach(async () => { //executa cada coisa antes do teste.
        await connection.migrate.rollback(); //desfaz todas as migrations, antes de executar denovo. pois pode ficar cheio o banco de dados, ou, por já estar populado, pode influenciar em outros testes.
        await connection.migrate.latest(); //executa as migrations, ai executar pelo código não pela linha de comando
    });

    afterAll(async () => {
        await connection.destroy(); //depois de tudo vai desfazer a conecção com o banco de dados.
    });

    it('should  be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@apad.com.br",
                whatsapp: "4700085000",
                city: "Rio do Sul",
                uf: "SC"
            });

        expect(response.body).toHaveProperty('id'); //eu espero que receba uma propriedade chamada id.
        expect(response.body.id).toHaveLength(8); // esperamos ter 8 caracteres.
    });
});

//a id que retorna só está no banco do teste