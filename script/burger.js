const headerBurger = document.querySelector('.header__burger');
if (headerBurger)
    document.querySelector('.header__burger').addEventListener('click', () => {
        document.querySelector('.header__burger').classList.toggle('burger-opened');
        document.querySelector('.burger-menu').classList.toggle('opened');
        document.querySelector('body').classList.toggle('overflow-hidden');

        postData('http://test.web-gen.ru/login.php', {
            // 'email': "nightfuriya@yandex.ru"
            "login": "kek0l",
            "password": "password"
        })
            .then((data) => {
                console.log(data);
            });
    })

const blogHeaderBurger = document.querySelector('.blog-header__burger');
if (blogHeaderBurger)
    document.querySelector('.blog-header__burger').addEventListener('click', () => {
        document.querySelector('.blog-header__burger').classList.toggle('burger-opened');
        document.querySelector('.burger-menu').classList.toggle('opened');
        document.querySelector('body').classList.toggle('overflow-hidden');
    })

async function postData(url = '', data = {}) {
    return await fetch(url, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    }