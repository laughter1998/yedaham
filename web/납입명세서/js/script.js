var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 10,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        slideChange: function () {
            const deedList = document.querySelector('.deed-list-wrap');
            if (swiper.isEnd) {
                deedList.classList.add('list-end');
            } else {
                deedList.classList.remove('list-end');
            }
        },
    },
});


const deedNums = document.querySelectorAll('.deed-list-wrap .deed-num');
const deedViews = document.querySelectorAll('.deed-view-wrap .deed-view');
deedNums.forEach((deedNum, index) => {
    deedNum.addEventListener('click', () => {
        deedNums.forEach(num => num.classList.remove('current'));
        deedNum.classList.add('current');
        
        deedViews.forEach((view, i) => view.style.display = i === index ? 'block' : 'none');
    });
});