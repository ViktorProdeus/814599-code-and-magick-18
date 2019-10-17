'use strict';
(function () {
  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var wizard = {
    onEyesChange: function (thisElement, color) {
      thisElement = color;
    },
    onCoatChange: function (thisElement, color) {
      thisElement = color;
    }
  };

  var wizardPlayer = document.querySelector('.setup-player');
  var fireball = document.querySelector('.setup-fireball-wrap');

  wizardPlayer.addEventListener('click', function (evt) {
    var target = evt.target;


    if (target.classList.contains('wizard-coat')) {
      var newColor = window.util.getRandomElement(COAT_COLORS);
      target.style.fill = newColor;
      wizard.onCoatChange(newColor);
    }

    if (target.classList.contains('wizard-eyes')) {
      newColor = window.util.getRandomElement(EYES_COLORS);
      target.style.fill = newColor;
      wizard.onEyesChange(newColor);
    }

    if (target.classList.contains('setup-fireball')) {
      newColor = window.util.getRandomElement(FIREBALL_COLORS);
      fireball.style.background = newColor;
    }
  });

  window.wizard = wizard;
})();
