const express = require('express');
const router = express.Router();
const {join} = require('path')
const User = require(join(__dirname, '..', 'model', 'userModel.js'))


router.get('/', (req,res)=>{
    res.render('site/adminLogin')
})


router.get('/', (req,res)=>{
    if(res.locals.user){
        return res.redirect('/error')
    }
    res.render('site/adminLogin')
})

router.post('/', async(req,res)=>{
    try {
        if(res.locals.user){
            return res.json({
                case:false,
                message:'Kullanıcı zaten online'
            })
        }
        let{username,password} = req.body
        const userControl = await User.find({
            'username': username, 'password': password
        }).exec()
                
        

        if(userControl.length!==1){
            return res.json({
                case:false,
                message:'Hatalı Giriş'
            })
        }

        let ID = userControl[0]._id;
        ID = String(ID)
        req.session.userID = ID

        return res.json({
            case:true,
            message: 'İşlem devam ediyor...'
        })

    } catch (error) {
        console.log(error)
        return res.json({
            case:false,
            message:'Hatalı Giriş'
        })
        
    } 
})

module.exports = router;