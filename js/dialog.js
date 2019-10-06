'use strict';

(function () {
  var ENTER = window.util.ENTER;
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLORS = window.setup.COAT_COLORS;
  var EYES_COLORS = window.setup.EYES_COLORS;

  var userDialog = window.setup.userDialog;
  var openDialog = document.querySelector('.setup-open');
  var closeDialog = window.setup.userDialog.querySelector('.setup-close');

  var onEscPopupPress = function (evt) {
    if (evt.keyCode === window.util.ESC) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onEscPopupPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onEscPopupPress);
  };

  openDialog.addEventListener('click', function () {
    openPopup();
  });

  openDialog.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      openPopup();
    }
  });


  closeDialog.addEventListener('click', function () {
    closePopup();
  });

  closeDialog.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      closePopup();
    }
  });

  var form = document.querySelector('.setup-wizard-form');
  var userName = form.querySelector('.setup-user-name');
  var submitForm = form.querySelector('.setup-submit');

  userName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      evt.preventDefault();
      userName.blur();
      submitForm.focus();
    }
  });

  userName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscPopupPress);
  });

  userName.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscPopupPress);
  });

  var wizardPlayer = document.querySelector('.setup-player');
  var fireball = document.querySelector('.setup-fireball-wrap');


  wizardPlayer.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.classList.contains('wizard-coat')) {
      target.style.fill = window.util.getRandomElement(COAT_COLORS);
      wizardPlayer.querySelector('input[name="coat-color"]').value = target.style.fill;
    }

    if (target.classList.contains('wizard-eyes')) {
      target.style.fill = window.util.getRandomElement(EYES_COLORS);
      wizardPlayer.querySelector('input[name="eyes-color"]').value = target.style.fill;
    }

    if (target.classList.contains('setup-fireball')) {
      wizardPlayer.querySelector('input[name="fireball-color"]').value = window.util.getRandomElement(FIREBALL_COLORS);
      fireball.style.background = wizardPlayer.querySelector('input[name="fireball-color"]').value;
    }
  });
})();
