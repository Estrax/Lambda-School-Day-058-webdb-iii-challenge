const router = require('express').Router();
const knex = require('knex');
const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

router.route('/')
    .get(async (req, res) => {
        await db('students')
            .then(students => res.status(200).json(students))
            .catch(err => res.status(500).json({ error: "Students could not be retrieved."}));
    })
    .post(async (req, res) => {
        if(!req.body.name || !req.body.cohort_id) return res.status(400).json({ error: "Please provide the name and cohort ID for the student." });
        await db('students')
            .insert(req.body)
            .then(statusCode => res.status(201).json(statusCode))
            .catch(err => res.status(500).json({ error: "There was an error while saving the student to the database."}));
    });

router.route('/:id')
    .get(async (req, res) => {
        await db
            .select('students.id as id', 'students.name as name', 'cohorts.name as cohort')
            .from('students')
            .innerJoin('cohorts', 'students.cohort_id', 'cohorts.id')
            .where('students.id', req.params.id)
            .then(
                student => student.length === 0
                ? res.status(404).json({ message: "The student with the specified ID does not exist." })
                : res.status(200).json(student)
            )
            .catch(err => res.status(500).json({ error: "Student could not be retrieved."}));
    })
    .put(async (req, res) => {
        if(!req.body.name || !req.body.cohort_id) return res.status(400).json({ error: "Please provide the name and cohort ID for the student." });
        await db('students')
            .where('id', req.params.id)
            .update(req.body)
            .then(
                student => student.length === 0
                ? res.status(404).json({ message: "The student with the specified ID does not exist." })
                : res.status(200).json(student)
            )
            .catch(err => res.status(500).json({ error: "Student could not be updated."}));
    })
    .delete(async (req, res) => {
        await db('students')
            .where('id', req.params.id)
            .del()
            .then(
                student => student.length === 0
                ? res.status(404).json({ message: "The student with the specified ID does not exist." })
                : res.status(200).json(student))
            .catch(err => res.status(500).json({ error: "Student could not be deleted." }));
    });

module.exports = router;