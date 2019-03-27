exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(table){
        table.increments('id').primary().unsigned();
        table.text('name').notNullable();
        table.integer('cohort_id').references('id').inTable('cohorts').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};