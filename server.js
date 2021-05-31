const express = require('express');
const mongoose = require('mongoose');

const Recipe = require('./recipe')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Slam:1234@cluster.txjoy.mongodb.net/healtheat?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log('Connection to db established');
});

app.get('/api/recipe', (req,res) =>{
    Recipe.find().then((recipe)=>{
        res.json(recipe);
    })
})

app.get('/api/recipe/:id', (req,res) =>{
   
    Recipe.find({_id : req.params.id})
    .then((item) =>{
      if (!item) {
          res.status(404).send('error');
      }
      res.status(200).json(item);
    })
    .catch(()=>{
        res.status(404).send('error');
    })
})


app.listen(3001,()=>{
    console.log("server is on port 3001")
})