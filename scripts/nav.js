const $menuButton = document.querySelector('.button--menu');
const $nav = document.querySelector('.nav');
$menuButton.addEventListener('click', () => {
    $nav.classList.toggle('nav--hidden')
})