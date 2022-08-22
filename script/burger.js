const headerBurger = document.querySelector('.header__burger');
if (headerBurger)
    document.querySelector('.header__burger').addEventListener('click', () => {
        document.querySelector('.header__burger').classList.toggle('burger-opened');
        document.querySelector('.burger-menu').classList.toggle('opened');
        document.querySelector('body').classList.toggle('overflow-hidden');
    })

const blogHeaderBurger = document.querySelector('.blog-header__burger');
if (blogHeaderBurger)
    document.querySelector('.blog-header__burger').addEventListener('click', () => {
        document.querySelector('.blog-header__burger').classList.toggle('burger-opened');
        document.querySelector('.burger-menu').classList.toggle('opened');
        document.querySelector('body').classList.toggle('overflow-hidden');
    })