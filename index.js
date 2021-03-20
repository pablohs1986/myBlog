////// Variables and requires //////

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const fileUpload = require('express-fileupload');
const validateMiddleWare = (req,res,next) => {
    if(req.files == null || req.body.title == null) {
        console.log('>>> Validation not pass');
        return res.redirect('/posts/new');
    }
    next();
};
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
// Renderiza el index y carga los blogs
app.get('/', async (req,res) => { 
    console.log('>>> Home starting...')
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
    console.log(blogposts);
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/post/:id', async (req,res) => {
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', {
        blogpost
    });
});

app.get('/posts/new', (req,res) => {
    res.render('create');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});

////// Posts //////

// Handle new posts
// app.post('/posts/store', (req,res) => {
//     console.log(req.body);
//     res.redirect('/');
// });

// Store new post with browser data
app.post('/posts/store', async (req,res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async(error)=>{ // Almacena la imagen en el directorio indicado y procede a crear el post
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/');
    });
});



