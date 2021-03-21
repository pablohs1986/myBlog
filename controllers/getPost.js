const BlogPost = require('../models/BlogPost');

module.exports = async (req,res) => {
    const blogpost = await (await BlogPost.findById(req.params.id)).populated('userid');
    res.render('post', {
        blogpost
    });
};