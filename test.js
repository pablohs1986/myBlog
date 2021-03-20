const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/myblog_database', {useNewUrlParser: true});

// BlogPost.create({
//     title: 'Title 1',
//     body: 'lore ipsum blabalba'
// }, (error, blogpost) => {
//     console.log(error,blogpost);
// });

// BlogPost.find({},(error,blogpost) => {
//     console.log(error, blogpost);
// });

let id = '60537ef37dbd5b1ec880ef14';

BlogPost.findById(id,(error,blogpost) => {
    console.log(error, blogpost);
});

BlogPost.findByIdAndUpdate(id, {
    title: 'I like Mongo!'
}, (error,blogpost) => {
    console.log(error, blogpost);
});

BlogPost.findByIdAndDelete(id,(error,blogpost) => {
    console.log(error, blogpost);
});