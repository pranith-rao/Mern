var mongoose = require('mongoose');
var dotenv = require('dotenv');

dotenv.config({
    path : './config.env'
});
var db = process.env.DATABASE;

mongoose.connect(db)
.then(() => { console.log('Connected to DB'); })
.catch((err) => { console.log(err); })