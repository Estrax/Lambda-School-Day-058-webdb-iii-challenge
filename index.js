require('dotenv').config();
const app = require('express')();
const initServerMiddleware = require('./src/serverMiddleware');
const router = require('./src/routes');

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || 'localhost';

initServerMiddleware(app);
app.use('/api', router);

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server running on ${hostname}:${port}`);
});