const express = require('express');
const router = express.Router();
const { join } = require('path');
const Video = require(join(__dirname, '..', 'model', 'videoModel.js'));

router.get('/', (req, res) => {
    if (!res.locals.user) {
        return res.redirect('/error');
    }
    return res.render('site/videoAdd');
});

router.post('/', async (req, res) => {
    try {
        if (!res.locals.user) {
            return res.json({
                case: false,
                message: 'Yetkisiz erişim'
            });
        }

        const {videoTitle, ifreamUrl } = req.body;

        if (!videoTitle ||  !ifreamUrl) {
            return res.json({
                case: false,
                message: 'Veri eksik video'
            });
        }

        const video = new Video({
            'title': videoTitle,
            'ifreamUrl': ifreamUrl
        });

        await video.save();

        return res.json({
            case: true,
            message: 'Veri başarıyla eklendi'
        });

    } catch (err) {
        console.log(err);
        return res.json({
            case: false,
            message: 'hata'
        });
    }
});




module.exports = router;
