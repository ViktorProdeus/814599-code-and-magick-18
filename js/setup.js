'use strict';

var ESC = 27;
var ENTER = 13;

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Вальц', 'Онопко', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNTER = 4;

var userDialog = document.querySelector('.setup');
var openDialog = document.querySelector('.setup-open');
var closeDialog = userDialog.querySelector('.setup-close');

var onEscPopupPress = function (evt) {
  if (evt.keyCode === ESC) {
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
    target.style.fill = getRandomElement(COAT_COLORS);
    wizardPlayer.querySelector('input[name="coat-color"]').value = target.style.fill;
  }

  if (target.classList.contains('wizard-eyes')) {
    target.style.fill = getRandomElement(EYES_COLORS);
    wizardPlayer.querySelector('input[name="eyes-color"]').value = target.style.fill;
  }

  if (target.classList.contains('setup-fireball')) {
    fireball.style.background = getRandomElement(FIREBALL_COLORS);
    wizardPlayer.querySelector('input[name="fireball-color"]').value = fireball.style.background;
  }
});


// Работа с DOM

var similarListElement = userDialog.querySelector('.setup-similar-list');

// Нашли шаблон и контент внутри него
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];

  return randomElement;
}

function createDataArray() {
  var wizards = [];
  for (var i = 0; i < WIZARDS_COUNTER; i++) {

    wizards.push({
      name: getRandomElement(NAMES) + '\n ' + getRandomElement(SURNAMES),
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLORS)
    });
  }

  return wizards;
}

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
