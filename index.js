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
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const expressSession = require(`express-session`)
const authMiddleware = require('./middleware/authMiddleWare');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const { allowedNodeEnvironmentFlags } = require('process');
global.loggedIn = null;
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
app.use(expressSession({secret: 'keyboard cat'}));
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next();
});

app.listen(4000, () => {
    console.log('Express RRRUUUUNNNIIIIINNNNGGGG!!!!!!');
});

////// Gets & Posts //////
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController);
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.post('/posts/store', authMiddleware, storePostController);
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController);
app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController);

// Not found
app.use((req,res) => res.render('notfound'));



