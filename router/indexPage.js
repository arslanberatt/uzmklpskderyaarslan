const express = require('express');
const router = express.Router();
const { join } = require('path');
const Event = require(join(__dirname, '..', 'model', 'eventModel.js'));

router.get('/', async (req,res)=>{
    try {
        const event = await Event.find().exec()
        console.log(event)
        return res.render('site/index', {
            allData3: event.map(item=>item.toJSON())
        })

    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
})




module.exports = router;