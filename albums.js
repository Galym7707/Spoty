const express = require('express');
const router = express.Router();
const Album = require('../models/album');

// Маршрут для отображения детальной страницы альбома
router.get('/:id', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('album', { album: album });
    }
  });
});

// Маршрут для добавления отзыва к альбому
router.post('/:id/review', (req, res) => {
  Album.findById(req.params.id, (err, album) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      album.reviews.push(req.body.review);
      album.save((err, album) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/album/' + req.params.id);
        }
      });
    }
  });
});

module.exports = router;
