const faker = require('faker');

function makeStudent(i){
    return {
        id: i,
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        cohort_id: Math.floor(Math.random()*20)
    };
}

const students = [];

for(let i=0; i<300; i++){
    students.push(makeStudent(i));
}

exports.seed = function(knex, Promise) {
    return knex('students').del()
        .then(function () {
            return knex('students').insert(students);
        });
};