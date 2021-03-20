const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const app = new express();

mongoose.connect('mongodb://localhost/myblog_database', {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(4000, () => {
    console.log('Express RRRUUUUNNNIIIIINNNNGGGG!!!!!!');
});

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


// Handle new posts
// app.post('/posts/store', (req,res) => {
//     console.log(req.body);
//     res.redirect('/');
// });

// Store new post with browser data
app.post('/posts/store', async (req,res) => {
    await BlogPost.create(req.body);
    res.redirect('/');
});

