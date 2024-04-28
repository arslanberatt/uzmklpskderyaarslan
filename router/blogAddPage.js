const express = require('express');
const router = express.Router();
const { join } = require('path');
const Blog = require(join(__dirname, '..', 'model', 'blogModel.js'));
const nowTime = ()=>{
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const allName = `${day}.${month+1}.${year}`
    return allName;
}


router.get('/', (req, res) => {
    if (!res.locals.user) {
        return res.redirect('/error');
    }
    return res.render('site/blogAdd');
});

router.post('/', async (req, res) => {
    try {
        if (!res.locals.user) {
            return res.json({
                case: false,
                message: 'Yetkisiz erişim'
            });
        }

        const { blogTitle, blogContent} = req.body;
        const { file } = req.files;

        if (!blogTitle || !blogContent) {
            return res.json({
                case: false,
                message: 'Veri eksik blog'
            });
        }

        if (!file || file.size > (1024 * 1024 * 5) ||
            !(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg')) {
            return res.json({
                case: false,
                message: 'Geçersiz dosya'
            });
        }

        const extension = file.mimetype.split('/')[1];
        const uniqName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
        const pathName = join(__dirname, '..', 'public', 'img', uniqName);

        await file.mv(pathName);

        const blog = new Blog({
            'title': blogTitle,
            'content': blogContent,
            'path': `/img/${uniqName}`,
            'date': nowTime()
        });

        await blog.save();

        return res.json({
            case: true,
            message: 'Veri başarıyla eklendi'
        });

    } catch (error) {
        console.error(error);
        return res.json({
            case: false,
            message: 'Beklenmeyen bir hata oluştu'
        });
    }
});

module.exports = router;
