'use strict';

(function () {
  var ENTER = window.util.ENTER;

  var userDialog = document.querySelector('.setup');
  var openDialog = document.querySelector('.setup-open');
  var closeDialog = userDialog.querySelector('.setup-close');

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
})();
