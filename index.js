// Подключение необходимых модулей
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Создание приложения Express
const app = express();

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/musicApp', { useNewUrlParser: true, useUnifiedTopology: true });

// Создание схемы для альбома
const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  reviews: [{ user: String, rating: Number, review: String }]
});

// Создание модели для альбома
const Album = mongoose.model('Album', albumSchema);

// Использование body-parser для обработки POST-запросов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршруты
app.get('/', (req, res) => {
    // Получение данных из базы данных (это просто пример, вам нужно будет заменить это на реальный код)
    Album.find({}, (err, albums) => {
      if (err) {
        console.log(err);
      } else {
        // Отправка данных на главную страницу
        res.render('index', { albums: albums });
      }
    });
  });
  

// Маршрут для отображения детальной страницы альбома
app.get('/album/:id', (req, res) => {
    // Используем параметр id из URL для поиска альбома в базе данных
    Album.findById(req.params.id, (err, album) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        // Отправляем данные альбома на страницу детального просмотра
        res.render('album', { album: album });
      }
    });
  });
  
  // Маршрут для добавления отзыва к альбому
  app.post('/album/:id/review', (req, res) => {
    // Используем параметр id из URL для поиска альбома в базе данных
    Album.findById(req.params.id, (err, album) => {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        // Добавляем новый отзыв в массив обзоров альбома
        album.reviews.push(req.body.review);
        // Сохраняем альбом с новым отзывом в базе данных
        album.save((err, album) => {
          if (err) {
            console.log(err);
          } else {
            // Перенаправляем пользователя обратно на страницу детального просмотра альбома
            res.redirect('/album/' + req.params.id);
          }
        });
      }
    });
  });
  

// Запуск сервера
app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
