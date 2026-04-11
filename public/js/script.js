
(() => {
  'use strict'


  const forms = document.querySelectorAll('.needs-validation')

 
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

const menuButton = document.querySelector('.menu-btn');
const menuDropdown = document.querySelector('.menu-dropdown');

if (menuButton && menuDropdown) {
  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    menuDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    if (!menuDropdown.contains(event.target) && !menuButton.contains(event.target)) {
      menuDropdown.classList.remove('show');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menuDropdown.classList.remove('show');
    }
  });
}


