const express = require ('express');
const {engine} = require('express-handlebars');
const expressSession = require('express-session');
const fileUpload = require('express-fileupload');
const dotenv = require ('dotenv');
const path = require('path');
const dbs = require(path.join(__dirname, 'dbs.js'));
const time = 1000*60*30;
const crypto = require('crypto');
const { register } = require('module');
const SECRET_VALUE = process.env.SECRET_VALUE;
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || 'http://127.0.0.1:3000'




//Connect Alanı
dbs();

//Başlangıç ayarları
dotenv.config();
const app = express();

//Değişkenler


//Şablon motoru
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


//middleWare(Ara yazılım)
app.use(express.json());
app.use(fileUpload());
app.use(expressSession({
    secret:SECRET_VALUE,
    resave:false,
    saveUninitialized:true,
    cookie:{path:'/', httpOnly:true, secure:false, maxAge:time}
}));
app.use(express.static(path.join(__dirname, 'public')));


const indexPage = require(path.join(__dirname, 'router', 'indexPage.js'))
const aboutPage = require(path.join(__dirname, 'router', 'aboutPage.js'))
const blogAddPage = require(path.join(__dirname, 'router', 'blogAddPage.js'))
const videoAddPage = require(path.join(__dirname, 'router', 'videoAddPage.js'))
const adminPanelPage = require(path.join(__dirname, 'router', 'adminPanelPage.js'))
const eventAddPage = require(path.join(__dirname, 'router', 'eventAddPage.js'))
const adminLoginPage = require(path.join(__dirname, 'router', 'adminLoginPage.js'))
const blogPage = require(path.join(__dirname, 'router', 'blogPage.js'))
const blogPagePage = require(path.join(__dirname, 'router', 'blogPagePage.js'))
const errorPage = require(path.join(__dirname, 'router', 'errorPage.js'))
const videoPage = require(path.join(__dirname, 'router', 'videoPage.js'))
const registerPage = require(path.join(__dirname, 'router', 'registerPage.js'))
const logoutPage = require(path.join(__dirname, 'router', 'logoutPage.js'))
const blogEditPage = require(path.join(__dirname, 'router', 'blogEditPage.js'))

app.use('/', (req, res, next)=>{
    const {userID} = req.session
    if(userID){
        res.locals.user = true;
    }
    else{
        res.locals.user = false;
    }
    next();
})

app.use('/',indexPage)
app.use('/about',aboutPage)
app.use('/videoAdd',videoAddPage)
app.use('/blogAdd',blogAddPage)
app.use('/eventAdd',eventAddPage)
app.use('/adminPanel',adminPanelPage)
app.use('/adminLogin',adminLoginPage)
app.use('/blog',blogPage)
app.use('/blogPage',blogPagePage)
app.use('/video',videoPage)
app.use('/register',registerPage)
app.use('/blogEdit',blogEditPage)
app.use('/logout',logoutPage)
app.use('*', (req,res,next)=>{
    res.render('site/error')
})



app.listen(PORT, ()=>{
    console.log(`Server İs Runing ${API_URL}`)
});
