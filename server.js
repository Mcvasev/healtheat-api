const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const SavedList = require('./savedList')
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
        Recipe.find({ title: new RegExp(req.query.search) }).then((recipe) => {
            res.json(recipe);
        })
    }
})

app.get('/api/post/savedList/:id', (req, res) => {
    SavedList.findOne({ _id: req.params.id })
    .then((list) => {
        if (!list){
            res.status(404).send('error');
        }
        Recipe.find({_id: {$in: [list.breakfast, list.lounch, list.dinner]}})
        .then((recipeList) => {
            res.status(200).json(recipeList);
        })
    })
    .catch(() => {
        res.status(404).send('error');
    })
    
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

app.post('/api/post/savedList', async function (req, res) {
    const response = await SavedList.insertMany({ breakfast: req.body.breakfastId, lounch: req.body.lounchId, dinner: req.body.dinnerId });
    res.json(response[0]);
})

app.listen(process.env.PORT || 3001, () => {
    console.log("server is on port 3001")
})