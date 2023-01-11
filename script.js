const createTodo = document.querySelector('#todoCreate');
const ul = document.querySelector('ul');
const li = document.createElement('li');
const remaining = document.querySelector('#remaining');
const options = document.getElementsByName('options');
const icon = document.querySelector('.icon-theme');
const clear = document.querySelector('.clear');
const classification = document.querySelector('.classification');

// Objects

const lightMode = {
  className: 'theme-light',
  imageSearch: 'images/moon.png'
};

const darkMode = {
  className: 'theme-dark',
  imageSearch: 'images/sun.png'
};

// Functions

const isDisplayFlex = item => (item.style.display = 'flex');
const isDisplayNone = item => (item.style.display = 'none');
const insertRemainingLength = item => (item.textContent = ul.childNodes.length);
const setThemeClass = ({className, imageSearch}) => {
  icon.src = imageSearch;
  document.body.setAttribute('class', className);
};

const changeTheme = () => {
  const bodyClass = document.body.classList[0];
  bodyClass === 'theme-light' ? setThemeClass(darkMode) : setThemeClass(lightMode);
};

const createTodoList = e => {
  const li = document.createElement('li');
  const inputValue = createTodo.value.trim();
  const isValidInput = e.key === 'Enter' && inputValue.length;

  if (isValidInput) {
    li.innerHTML = `${inputValue} <img = src="images/delete-light.svg">`;
    ul.prepend(li);
    createTodo.value = '';
    insertRemainingLength(remaining);
  }
};

// Click Li event mark

const checkList = e => {
  const liClicked = e.target.tagName;
  const isLiClicked = liClicked === 'LI';
  const isDeleteImageClicked = liClicked === 'IMG';

  if (isLiClicked) {
    e.target.classList.toggle('lichecked');
  }

  if (isDeleteImageClicked) {
    e.target.parentElement.remove();
    insertRemainingLength(remaining);
  }
};

// All, Active, Completed interactions config

const checkedOptions = e => {
  const lis = document.querySelectorAll('li');
  const idClicked = e.target.id;
  const arrayClicked = ['all', 'active', 'completed'];

  lis.forEach(li => {
    const isLiChecked = li.classList[0] === 'lichecked';

    switch (idClicked) {
      case arrayClicked[0]:
        isDisplayFlex(li);
        break;
      case arrayClicked[1]:
        if (isLiChecked) {
          isDisplayNone(li);
        } else {
          isDisplayFlex(li);
          insertRemainingLength(remaining);
        }
        break;

      case arrayClicked[2]:
        if (isLiChecked) {
          isDisplayFlex(li);
        } else {
          isDisplayNone(li);
          insertRemainingLength(remaining);
        }
        break;
    }
  });
};

// Remove completed List

const isLiChecked = li => {
  const liClassChecked = li.classList[0] === 'lichecked';

  if (liClassChecked) {
    li.remove();
    insertRemainingLength(remaining);
  }
};

const removeCompletedLiChecked = () => {
  const lis = document.querySelectorAll('li');
  lis.forEach(isLiChecked);
};

// Event Listeners

icon.addEventListener('click', changeTheme);
ul.addEventListener('click', checkList);
options.forEach(item => item.addEventListener('click', checkedOptions));
clear.addEventListener('click', removeCompletedLiChecked);
createTodo.addEventListener('keypress', createTodoList);
