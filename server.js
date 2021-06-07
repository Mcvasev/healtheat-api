const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Recipe = require('./recipe')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Slam:1234@cluster.txjoy.mongodb.net/healtheat?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log('Connection to db established');
});

app.get('/api/recipe', (req, res) => {
    if (!req.query.search) {
        Recipe.find().then((recipe) => {
            res.json(recipe);
        })
    } else {
        Recipe.find({ title: new RegExp(req.query.search)}).then((recipe) => {
            res.json(recipe);
        })
    }
})

app.get('/api/recipe/:id', (req, res) => {

    Recipe.findOne({ _id: req.params.id })
        .then((item) => {
            if (!item) {
                res.status(404).send('error');
            }
            console.log(item)
            res.status(200).json(item);
        })
        .catch(() => {
            res.status(404).send('error');
        })
})


app.listen(3001, () => {
    console.log("server is on port 3001")
})