'use strict';

(function () {
  var ESC = 27;
  var ENTER = 13;

  window.util = {
    ESC: ESC,
    ENTER: ENTER,

    // Метод, возвращающающий случайный элемемент массива
    getRandomElement: function (array) {
      var randomIndex = Math.floor(Math.random() * array.length);
      var randomElement = array[randomIndex];

      return randomElement;
    }
  };
})();
