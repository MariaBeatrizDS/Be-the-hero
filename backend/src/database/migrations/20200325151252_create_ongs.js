
exports.up = function (knex) { // metodo up, é responsável pela criação da tabela
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary(); //coluna priamaria
        table.string('name').notNullable(); //não pode criar um nome nulo
        table.string('email').notNullable(); //
        table.string('whatsapp').notNullable(); //
        table.string('city').notNullable(); //
        table.string('uf', 2).notNullable(); // o 2 representa o tamanho fixo de caractéres
    });
};

exports.down = function (knex) { // e se der algum problema e eu precisar deletar
    knex.schema.dropTable('ongs');
};
