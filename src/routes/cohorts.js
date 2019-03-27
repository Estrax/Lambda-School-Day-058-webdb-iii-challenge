const router = require('express').Router();
const knex = require('knex');
const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

router.route('/')
    .get(async (req, res) => {
        await db('cohorts')
            .then(cohorts => res.status(200).json(cohorts))
            .catch(err => res.status(500).json({ error: "Cohorts could not be retrieved."}));
    })
    .post(async (req, res) => {
        if(!req.body.name) return res.status(400).json({ error: "Please provide the name for the cohort." });
        await db('cohorts')
            .insert(req.body)
            .then(statusCode => res.status(201).json(statusCode))
            .catch(err => res.status(500).json({ error: "There was an error while saving the cohort to the database."}));
    });

router.route('/:id')
    .get(async (req, res) => {
        await db('cohorts')
            .where('id', req.params.id)
            .then(
                cohort => cohort.length === 0
                ? res.status(404).json({ message: "The cohort with the specified ID does not exist." })
                : res.status(200).json(cohort))
            .catch(err => res.status(500).json({ error: "Cohort could not be retrieved."}));
    })
    .put(async (req, res) => {
        if(!req.body.name) return res.status(400).json({ error: "Please provide the name for the cohort." });
        await db('cohorts')
            .where('id', req.params.id)
            .update(req.body)
            .then(
                cohort => cohort.length === 0
                ? res.status(404).json({ message: "The cohort with the specified ID does not exist." })
                : res.status(200).json(cohort)
            )
            .catch(err => res.status(500).json({ error: "Cohort could not be updated."}));
    })
    .delete(async (req, res) => {
        await db('cohorts')
            .where('id', req.params.id)
            .del()
            .then(
                cohort => cohort.length === 0
                ? res.status(404).json({ message: "The cohort with the specified ID does not exist." })
                : res.status(200).json(cohort))
            .catch(err => res.status(500).json({ error: "Cohort could not be deleted." }));
    });

router.route('/:id/students')
    .get(async (req, res) => {
        await db('cohorts')
            .where('id', req.params.id)
            .then(
                cohort => cohort.length === 0
                ? res.status(404).json({ message: "The cohort with the specified ID does not exist." })
                : db('students')
                    .where('cohort_id', req.params.id)
                    .then(students =>
                        students.length === 0
                        ? res.status(404).json({ message: "The students with the specified cohort ID does not exist." })
                        : res.status(200).json(students))
                    .catch(err => res.status(500).json({ error: "Students could not be retrieved" }))
            )
            .catch(err => res.status(500).json({ error: "Cohort could not be retrieved." }));
    });

module.exports = router;