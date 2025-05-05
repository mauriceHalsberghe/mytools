const $menuButton = document.querySelector('.button--menu');
const $nav = document.querySelector('.nav');
$menuButton.addEventListener('click', () => {
    $nav.classList.toggle('nav--hidden')
})

window.addEventListener("load", (event) => {
    $nav.classList.add('nav--hidden');
});