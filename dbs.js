const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const conn=()=>{
    mongoose.connect(process.env.DB_URL, {
        dbName:'deryaArslanPage'
    }).then(()=>{
        console.log('db connected')
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = conn;