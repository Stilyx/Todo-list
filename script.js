const createTodo = document.querySelector('#todoCreate');
const ul = document.querySelector('ul');
const li = document.createElement('li');
const remaining = document.querySelector('#remaining');
const options = document.getElementsByName('options');
const icon = document.querySelector('.icon-theme');
const clear = document.querySelector('.clear');

// functions

createTodoList();
checkList();
checkedOptions();
changeTheme();
removeCompleted();

// Dark and Light Mode

function changeTheme() {
  icon.addEventListener('click', e => {
    const bodyClass = document.body.classList[0];
    if (bodyClass === 'theme-light') {
      document.body.setAttribute('class', 'theme-dark');
      icon.src = 'images/sun.png';
    } else {
      document.body.setAttribute('class', 'theme-light');
      icon.src = 'images/moon.png';
    }
  });
}

// Todo List creator

function createTodoList() {
  createTodo.addEventListener('keypress', e => {
    if (e.key === 'Enter' && createTodo.value.length !== 0) {
      const li = document.createElement('li');
      li.innerHTML = `${createTodo.value} <img = src="images/delete-light.svg">`;
      ul.prepend(li);
      createTodo.value = '';
      remaining.textContent = ul.childNodes.length;
    }
  });
}

// Click Li event mark

function checkList() {
  ul.addEventListener('click', e => {
    const liClicked = e.target;
    if (e.target.tagName === 'LI') {
      liClicked.classList.toggle('lichecked');
    }

    if (e.target.tagName === 'IMG') {
      e.target.parentElement.remove();
      remaining.textContent = ul.childNodes.length;
    }
  });
}

// All, Active, Completed interactions config

function checkedOptions() {
  options.forEach(e => {
    e.addEventListener('click', item => {
      let idClicked = '';
      const lis = document.querySelectorAll('li');
      const arrayClicked = ['all', 'active', 'completed'];

      idClicked = item.target.id;
      lis.forEach(li => {
        switch (idClicked) {
          case arrayClicked[0]:
            li.style.display = 'flex';
            break;

          case arrayClicked[1]:
            if (li.classList[0] === 'lichecked') {
              li.style.display = 'none';
            } else {
              li.style.display = 'flex';
              remaining.textContent = ul.childNodes.length;
            }
            break;

          case arrayClicked[2]:
            if (li.classList[0] === 'lichecked') {
              li.style.display = 'flex';
            } else {
              li.style.display = 'none';
              remaining.textContent = ul.childNodes.length;
            }
            break;
        }
      });
    });
  });
}

// Remove completed List

function removeCompleted() {
  clear.addEventListener('click', e => {
    const lis = document.querySelectorAll('li');
    lis.forEach(li => {
      if (li.classList[0] === 'lichecked') {
        li.remove();
        remaining.textContent = ul.childNodes.length;
      }
    });
  });
}
