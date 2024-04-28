const express = require('express');
const path = require('path');
const router = express.Router()
const { join } = require('path');
const { title } = require('process');
const Blog = require(join(__dirname, '..', 'model', 'blogModel.js'));

router.get('/:id', async(req,res)=>{
    try {
        if (!res.locals.user) {
            return res.redirect('/error');
        }
        const { id } = req.params;
        const data = await Blog.findById(id).exec();
        
        return res.render('site/blogEdit',{
            data:data.toJSON()
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
})

router.post('/', async(req,res)=>{
    try {
        if (!res.locals.user) {
            return res.json({
                case:false,
                message:'Yetkisiz erişim'
            })
        }
        console.log(req.body)
        
        const{blogTitle, blogContent, id} =req.body
        const{file} = req.files

        if(!blogTitle || !blogContent || !id || !file){
            return res.json({
                case:false,
                message:'Veri eksik! blogEdit'
            })
        }

        const extension = file.mimetype.split('/')[1];
        const uniqName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
        const pathName = join(__dirname, '..', 'public', 'img', uniqName);

        file.mv(pathName, (err)=>{
            if(err !== undefined){
                return res.json({
                    case:false,
                    message:'farklı bir hata oluştu'
                })
            }
            Blog.findByIdAndUpdate(id, {$set:{
                'title':blogTitle,
                'content':blogContent,
                path:`/img/${uniqName}`}
            
            }).then(()=>{
                return res.json({
                    case:true,
                    message:'İçerik başarılı bir şekilde güncellendi'
                })

            }).catch((err)=>{
                console.log(err)
                return res.json({
                    case:false,
                    message:'farklı bir hata oluştu'
                })
            })
        })


    } catch (error) {
        console.log(error)
        return res.json({
            case:false,
            message:'Beklenilmeyen bir hata oluştu'
        })
    }
})

module.exports = router