const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = new express();
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(4000, () => {
    console.log('Express runninggggg yiiihaaaa')
});

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/about', (req,res) => {
    res.render('about');
});

app.get('/post', (req,res) => {
    res.render('post');
});

app.get('/contact', (req,res) => {
    res.render('contact');
});