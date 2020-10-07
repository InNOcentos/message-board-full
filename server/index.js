'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const messages = require('./db/messages'); 

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/',(req,res)=> {
    res.json({message: 'qweqr'})
});

app.get('/messages',(req,res)=> {
    messages.getAll().then((messages)=> {
        res.json(messages);
    })
})

app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body).then((message) => {
      res.json(message);
    }).catch((error) => {
        console.log(error.message)
      res.status(500);
      res.json(error);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=> {

    console.log(`Listening on ${PORT}`)
});