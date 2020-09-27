const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const session = require('express-session');
const port = process.env.APP_PORT || 8000;
const router  = require('./router');

app.use(bodyParser.urlencoded({extended:false}))
app.use(morgan())
app.use(session({secret:'my-secret', resave: false, saveUninitialized: false}))

app.use('/api', router);

app.use((req, res, next)=> {
    res.status(404).json({
        message:'path not found',
        status: 404
    })
})

app.use((err, req, res, next) => {
    if(!err.status) {
        res.status(500).json({
            message:err.message ? err.message :'error from server',
            status: 500
        })
    } else {
        res.status(500).json({
            message:err.message ? err.message :'error from server',
            status: 500
        })
    }
})

app.listen(port, () => {
    console.log('app run at', process.env.APP_PORT)
})