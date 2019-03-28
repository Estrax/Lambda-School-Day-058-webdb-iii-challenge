const router = require('express').Router();
const cohorts = require('./cohorts');
const students = require('./students');

router.use('/cohorts', cohorts);
router.use('/students', students);

module.exports = router;