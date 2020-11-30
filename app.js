const express= require('express');
const path=require('path');
const app=express();
const mongoose=require('mongoose');
const bodyParser= require("body-parser");
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});//Connecting with thw database
const port=8080;

//Defining Mongoose Schema:=
var contactSchema= new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
});

//finalizing the Schema
var Contact= mongoose.model('Contact', contactSchema);


//express specific stuffs:-
app.use('/static',express.static('static'));//for serving static files
app.use(express.urlencoded());

//Pug specific stuffs:-
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//Endpoints:-
app.get('/', (req, res)=>{

    res.status(200).render('home.pug');
})

app.get('/contact', (req, res)=>{
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });

    // res.status(200).render('index.pug');
})

//starting th server:-
app.listen(port, ()=>{
    console.log(`the application is starting at port ${port}`);
})