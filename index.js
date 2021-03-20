////// Variables and requires //////

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const validateMiddleWare = require('./middleware/validationMiddleware')
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const app = new express();

////// Mongo connection //////
mongoose.connect('mongodb://localhost/myblog_database', {useNewUrlParser: true});

////// Middlewares //////
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use('/posts/store', validateMiddleWare);

app.listen(4000, () => {
    console.log('Express RRRUUUUNNNIIIIINNNNGGGG!!!!!!');
});

////// Gets //////
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', newPostController);
app.post('/posts/store', storePostController);



