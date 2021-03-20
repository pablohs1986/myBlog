const BlogPost = require('../models/BlogPost');
const path = require('path');

module.exports = (req,res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async(error)=>{ // Almacena la imagen en el directorio indicado y procede a crear el post
        await BlogPost.create({
            ...req.body,
            image: '/img/' + image.name
        });
        res.redirect('/');
    });
};