const { error } = require('console');
const express = require('express');
const router = express.Router();
const {join} = require('path')
const User = require(join(__dirname, '..', 'model', 'userModel.js'))

router.get('/', (req,res)=>{
    res.render('site/register')
})

router.get('/', (req,res)=>{
    if(res.locals.user){
        return res.redirect('/error')
    }
    res.render('site/register')
})

router.post('/', async(req,res)=>{
    try {
        if(!req.body){
            return res.json({
                case:false,
                message:'Veri iletilmedi. Req.body'
            })
        }


        const{email,username,password} = req.body
        
        if (!email || !username || !password){
            return res.json({
                case:false,
                message: 'Veri iletilmedi. single data'
            })
        }

        const gmailRGX = new RegExp(/@hotmail.com/,'g')
        if(!gmailRGX.test(email)){
            return res.json({
                case:false,
                message:'Hatalı Giriş'
        })
        }

        const userControl = await User.find({'email':email}).exec()

        if(userControl.length != 0){
            return res.json({
                case: true,
                message:'İşleme devam ediyoruz'
            })
            
        }
        const user = new User({
            'email': email,
            'username': username,
            'password': password
        })
        
        user.save().then((data)=>{
            let ID=data._id
            ID=String(ID)
            console.log(ID)
            req.session.userID = ID
            return res.json({
                case:true,
                message:'Kayıt Başarılı!' 
            })
        }).catch((err)=>{
            console.log(err)
            return res.json({
                case:false,
                message:'Zaten Kayıtlı'
            })
        })

        
    } catch (error) {
        console.log(error)
        return res.json({
            case:false,
            message:'Hatalı Giriş'
        })
        
    } 
})


module.exports = router
