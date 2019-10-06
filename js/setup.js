'use strict';
(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Вальц', 'Онопко', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARDS_COUNTER = 4;

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

  var createDataArray = function () {
    var wizards = [];
    for (var i = 0; i < WIZARDS_COUNTER; i++) {

      wizards.push({
        name: window.util.getRandomElement(NAMES) + '\n ' + window.util.getRandomElement(SURNAMES),
        coatColor: window.util.getRandomElement(COAT_COLORS),
        eyesColor: window.util.getRandomElement(EYES_COLORS)
      });
    }

    return wizards;
  };

  var dataWizards = createDataArray();

  // Генерируем шаблон волшебника
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < dataWizards.length; i++) {
    fragment.appendChild(renderWizard(dataWizards[i]));
  }
  similarListElement.appendChild(fragment);

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

})();
