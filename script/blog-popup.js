function showPopup(popupClassName){
    document.querySelector('.' + popupClassName)?.classList.add('popup-show');
        setTimeout(() => {
            document.querySelector('.' + popupClassName)?.classList.add('popup-visible');
        }, 100);
}
function closePopup(popupClassName){
    document.querySelectorAll('.' + popupClassName).forEach(el => {
        el.classList.remove('popup-visible');
        setTimeout(() => {
            el.classList.remove('popup-show');
        }, 300);
    })
}
async function postData(url = '', data = {}) {
    return await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

document.addEventListener('DOMContentLoaded', () => {
    //popup
    document.getElementById('subscribe').addEventListener('click', () => {showPopup('subscribe-popup'); });

    document.querySelectorAll('.blog-form__close').forEach(el => {
        el.addEventListener('click', () => { closePopup('blog-popup'); })
    });
    document.querySelectorAll('.blog-popup').forEach(el => {
        el.addEventListener('click', () => { closePopup('blog-popup'); })
    });
    document.getElementById('blog-popup-form').addEventListener('click', (e) => { e.stopPropagation(); });

    //submit
    document.querySelector('.blog-popup__submit')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (document.getElementById('hidden-input').value != '')
            return;

        const email = document.querySelector('.blog-popup__email')?.value;

        document.querySelector('.blog-popup__email')?.classList.remove('error');

        if (email.length < 6 || !email.includes('@') || !email.includes('.')){
            document.querySelector(`.blog-popup__email`)?.classList.add('error');
            return
        };

        closePopup('subscribe-popup');

        showPopup('thanks-popup');
        
        // postData('https://k095pa95.ru/getnumbers/webhook.php', { name: name, phone: phone })
        //     .then((data) => {
        //         showPopup('thanks-popup');
        //         console.log(data);
        //     });
    })

});