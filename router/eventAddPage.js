const express = require('express');
const router = express.Router();
const { join } = require('path');
const Event = require(join(__dirname, '..', 'model', 'eventModel.js'));

router.get('/', (req, res) => {
    if (!res.locals.user) {
        return res.redirect('/error');
    }
    return res.render('site/eventAdd');
});

router.post('/', async (req, res) => {
    try {
        if (!res.locals.user) {
            return res.json({
                case: false,
                message: 'Yetkisiz erişim'
            });
        }

        const eventPhoto = req.files.eventPhoto;

        if (!eventPhoto || eventPhoto.size > (1024 * 1024 * 5) ||
            !(eventPhoto.mimetype == 'image/jpeg' || eventPhoto.mimetype == 'image/png' || eventPhoto.mimetype == 'image/jpg')) {
            return res.json({
                case: false,
                message: 'Geçersiz dosya'
            });
        }

        const extension2 = eventPhoto.mimetype.split('/')[1];
        const uniqName2 = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension2}`;
        const pathName2 = join(__dirname, '..', 'public', 'img', uniqName2);
        console.log(uniqName2)

        await eventPhoto.mv(pathName2);

        const event = new Event({
            'path2': `/img/${uniqName2}`
        });

        await event.save();

        return res.json({
            case: true,
            message: 'Veri başarıyla eklendi'
        });


    } catch (err) {
        console.log(err);
        return res.json({
            case: false, 
            message: 'Beklenmeyen bir hata oluştu event'
        });
    }
});

module.exports = router;
