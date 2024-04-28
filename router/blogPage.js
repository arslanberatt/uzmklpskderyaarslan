const express = require('express');
const router = express.Router();
const { join } = require('path');
const Blog = require(join(__dirname, '..', 'model', 'blogModel.js'));

router.get('/', async (req,res)=>{
    try {
        const blog = await Blog.find().exec()
        const blogs = blog.reverse()
        console.log(blogs)
        return res.render('site/blog', {
            allData1: blogs.map(item=>item.toJSON())
        })

    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
})

module.exports = router;