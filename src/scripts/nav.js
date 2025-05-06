const $menuButton = document.querySelector('.button--menu');
const $nav = document.querySelector('.nav');

const $burger = document.querySelector('.button__burger');
const $close = document.querySelector('.button__close');

$menuButton.addEventListener('click', () => {
    $nav.classList.toggle('nav--hidden')
    $close.classList.toggle('button--hidden');
    $burger.classList.toggle('button--hidden');
})

window.addEventListener("load", () => {
    $nav.classList.add('nav--hidden');
    $close.classList.add('button--hidden');
});