window.onload = function() {
    // Получение элементов формы
    var reviewForm = document.getElementById('review-form');
    var reviewInput = document.getElementById('review-input');
  
    // Добавление обработчика событий для формы
    reviewForm.addEventListener('submit', function(event) {
      // Предотвращение отправки формы по умолчанию
      event.preventDefault();
  
      // Получение текста отзыва
      var reviewText = reviewInput.value;
  
      // Проверка, что текст отзыва не пуст
      if (reviewText) {
        // Отправка запроса на сервер
        fetch('/album/' + albumId + '/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ review: reviewText })
        })
        .then(function(response) {
          // Обновление страницы после успешной отправки отзыва
          if (response.ok) {
            location.reload();
          }
        });
      }
    });
  };
  