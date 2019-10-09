'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  // Работа с DOM
  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  window.setup = {
    userDialog: userDialog,
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS
  };

  // Нашли шаблон и контент внутри него
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  // Генерируем шаблон волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onLoad = function (wizards) {
    var fragment = document.createDocumentFragment();
    var wizardsCount = wizards.length > 4 ? 4 : wizards.length;

    for (var i = 0; i < wizardsCount; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
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

  var onError = function (errorMessage) {
    createElement('z-index: 100;  margin: 15% auto; padding: 50px; text-align: center; background-color: red; border: 5px solid yellow;', errorMessage);
  };

  var onFormError = function (errorMessage) {
    createElement('z-index: 100;  margin: 55% auto; padding: 25px 50px; text-align: center; background-color: red; border: 5px solid yellow;', errorMessage);
  };

  window.backend.load(onLoad, onError);

  var form = userDialog.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    var dataForm = new FormData(form);

    var closeForm = function () {
      userDialog.classList.add('hidden');
    };

    window.backend.upload(dataForm, closeForm, onFormError);
    evt.preventDefault();
  });
})();
