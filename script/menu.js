window.addEventListener('scroll', animMenuOnScroll);
function animMenuOnScroll() {
    //mewnu fixed
    const isMenuFixed = document.getElementById('header-nav').classList.contains('fixed');
    if (window.pageYOffset > 100 && !isMenuFixed)
        document.getElementById('header-nav').classList.add('fixed');
    if (window.pageYOffset <= 100 && isMenuFixed)
        document.getElementById('header-nav').classList.remove('fixed');
}
