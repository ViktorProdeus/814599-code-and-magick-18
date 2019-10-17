'use strict';
(function () {
  var coatColor;
  var eyesColor;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onSuccessLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var createElement = function (string, errorMessage) {
    var node = document.createElement('div');
    node.style = string;
    node.style.position = 'absolute';
    node.style.width = '600px';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onErrorLoad = function (errorMessage) {
    createElement('z-index: 100;  margin: 15% auto; padding: 50px; text-align: center; background-color: red; border: 5px solid yellow;', errorMessage);
  };

  var onFormErrorLoad = function (errorMessage) {
    createElement('z-index: 100;  margin: 55% auto; padding: 25px 50px; text-align: center; background-color: red; border: 5px solid yellow;', errorMessage);
  };

  window.backend.load(onSuccessLoad, onErrorLoad);

  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    var dataForm = new FormData(form);

    var closeForm = function () {
      document.classList.add('hidden');
    };

    window.backend.upload(dataForm, closeForm, onFormErrorLoad);
    evt.preventDefault();
  });
})();
