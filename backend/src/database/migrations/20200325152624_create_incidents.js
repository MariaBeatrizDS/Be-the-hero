
exports.up = function (knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); //chave primaria
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable(); // coluna que armazena a ong que criou o caso

        table.foreign('ong_id').references('id').inTable('ongs');// toda vez que id estiver preenchido, o id tem que estar cadastrado na 'ongs'
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidents');
};
