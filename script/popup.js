function showPopup(popupClassName){
    document.getElementsByClassName(popupClassName)[0].classList.add('popup-show');
        setTimeout(() => {
            document.getElementsByClassName(popupClassName)[0].classList.add('popup-visible');
        }, 100);
}
function closePopup(popupClassName){
    document.getElementsByClassName(popupClassName)[0].classList.remove('popup-visible');
    setTimeout(() => {
        document.getElementsByClassName(popupClassName)[0].classList.remove('popup-show');
    }, 300);
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
    [...document.getElementsByClassName('call-popup')].forEach((el) => { 
        el.addEventListener('click', () => { showPopup('popup'); })
     });

    document.getElementsByClassName('form__close')[0].addEventListener('click', () => { closePopup('popup'); });
    document.getElementsByClassName('popup')[0].addEventListener('click', () => { closePopup('popup'); });
    document.getElementById('popup-form').addEventListener('click', (e) => { e.stopPropagation(); });

    //thanks popup
    document.getElementsByClassName('thanks-popup__close')[0].addEventListener('click', () => { closePopup('thanks-popup'); });
    document.getElementsByClassName('thanks-popup')[0].addEventListener('click', () => { closePopup('thanks-popup'); });
    document.getElementsByClassName('thanks-popup__content')[0].addEventListener('click', (e) => { e.stopPropagation(); });

    //input
    for (const el of document.querySelectorAll("[data-placeholder][data-slots]")) {
        const pattern = el.getAttribute("data-placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    };

    //submit
    ['popup'].forEach((form) => {
        document.getElementsByClassName(`${form}__submit`)[0].addEventListener('click', (e) => {
            e.preventDefault();

            if (document.getElementById('hidden-input').value != '')
                return;
                
            const name = document.getElementsByClassName(`${form}__name`)[0].value;
            const phone = document.getElementsByClassName(`${form}__tel`)[0].value;

            document.getElementsByClassName(`${form}__name`)[0].classList.remove('error');
            document.getElementsByClassName(`${form}__tel`)[0].classList.remove('error');

            let isValid = true;
            if (name.length < 3){
                document.getElementsByClassName(`${form}__name`)[0].classList.add('error');
                isValid = false;
            };
            if (phone.includes('_') || phone.length === 0){
                document.getElementsByClassName(`${form}__tel`)[0].classList.add('error');
                isValid = false;
            };

            if (!isValid) return;
            closePopup('popup');

            showPopup('thanks-popup');
            
            postData('https://cellmon.ru/form_worker/index.php', { name: name, phone: phone })
                .then((data) => {
                    showPopup('thanks-popup');
                    console.log(data);
                });
        })
    });

    //validate
    ['popup'].forEach((form) => {
        document.getElementsByClassName(`${form}__name`)[0].addEventListener('input', () => {
            document.getElementsByClassName(`${form}__name`)[0].classList.remove('error');

            if (document.getElementsByClassName(`${form}__name`)[0].value.length < 3){
                document.getElementsByClassName(`${form}__name`)[0].classList.add('error');
            };
        })
    });
    ['popup'].forEach((form) => {
        document.getElementsByClassName(`${form}__tel`)[0].addEventListener('input', () => {
            document.getElementsByClassName(`${form}__tel`)[0].classList.remove('error');

            if (document.getElementsByClassName(`${form}__tel`)[0].value.includes('_') || document.getElementsByClassName(`${form}__tel`)[0].value.length === 0){
                document.getElementsByClassName(`${form}__tel`)[0].classList.add('error');
            };
        })
    });

});