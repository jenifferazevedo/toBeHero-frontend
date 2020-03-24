
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table) {
    table.string('id').primary();
    table.string('name').notNullable(); //notNullable exige que não seja um valor null
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); //o segundo parametro coloca que são só 2 caracteres
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
