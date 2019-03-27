require('dotenv').config();
const app = require('express')();
const initServerMiddleware = require('./src/serverMiddleware');

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || 'localhost';

initServerMiddleware(app);

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server running on ${hostname}:${port}`);
});