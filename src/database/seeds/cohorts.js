function makeCohort(i){
    return {
        id: i,
        name: `Cohort ${i}`
    };
}

const cohorts = [];

for(let i=0; i<20; i++){
    cohorts.push(makeCohort(i));
}

exports.seed = function(knex, Promise) {
    return knex('cohorts').del()
        .then(function (){
            return knex('cohorts').insert(cohorts);
        });
};