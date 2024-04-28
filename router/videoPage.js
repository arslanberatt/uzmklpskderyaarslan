const express = require('express');
const router = express.Router();
const { join } = require('path');
const Video = require(join(__dirname, '..', 'model', 'videoModel.js'));

router.get('/', async (req,res)=>{
    try {
        const video = await Video.find().exec()
        const videos = video.reverse()
        console.log(videos)
        return res.render('site/video', {
            allData2: videos.map(item=>item.toJSON())
        })

    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
})

module.exports = router;