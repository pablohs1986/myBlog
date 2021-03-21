const BlogPost = require('../models/BlogPost');

module.exports = async (req,res) => { 
    console.log('>>> Home starting...')
    const blogposts = await BlogPost.find({}).populate('userid');
    console.log('>>> ' + req.session.userId);
    res.render('index', {
        blogposts
    });
    console.log(blogposts);
};