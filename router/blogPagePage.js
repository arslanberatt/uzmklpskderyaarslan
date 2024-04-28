const express = require('express');
const router = express.Router();
const { join } = require('path');
const Blog = require(join(__dirname, '..', 'model', 'blogModel.js'));
const fs = require('fs');

router.get('/:id', async (req,res)=>{
    try {
        const {id} = req.params
        if(id.length !== 24){
            
        }
        const data = await Blog.findById(id).exec()

        console.log(data)
        return res.render('site/blogPage', {
            blogPageData:data.toJSON()
        })
    } catch (error) {
        console.log(error)
        return res.render('site/error')
    }
})


router.delete('/:id', async (req, res) => {
    try {
        if (!res.locals.user) {
            return res.json({
                case: false,
                message: 'Yetkisiz erişim!'
            });
        }
        const { id } = req.params;
        const data = await Blog.findById(id).exec();
        if (!data) {
            return res.json({
                case: false,
                message: 'Belge bulunamadı'
            });
        }
        let fileName = data.path;
        let pathName = join(__dirname, '..', 'public', fileName);
        console.log(pathName);

        // Belgeyi sil
        await Blog.findByIdAndDelete(id);

        // Dosyayı diskten sil
        fs.unlinkSync(pathName);

        return res.json({
            case: true,
            message: 'Belge silindi'
        });
    } catch (error) {
        console.log(error);
        return res.json({
            case: false,
            message: 'Bir hata oluştu'
        });
    }
});

 

module.exports = router;