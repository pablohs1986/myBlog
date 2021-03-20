module.exports = (req,res,next) => {
    if(req.files == null || req.body.title == null) {
        console.log('>>> Validation not pass');
        return res.redirect('/posts/new');
    }
    next();
};