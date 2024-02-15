window.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.offer__slide'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = getComputedStyle(slidesWrapper).width,   // 650px
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slider = document.querySelector('.offer__slider');


    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`
    }
    else {
        total.textContent = slides.length; 
        current.textContent = slideIndex;
    }


    slidesField.style.width = 100 * slides.length + '%';

    slidesField.style.display = 'flex';
    slidesField.style.transition = '.5s ease';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide =>  {
        slide.style.width = width;
    })

    slider.style.position = 'relative';
    const indicator = document.createElement('ol');
          dots = [];
    indicator.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    
    `
    slider.append(indicator);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicator.append(dot);
        dots.push(dot);
    }
 

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        }
        else {
            offset += +width.slice(0, width.length - 2) // + before width can help change data type from string to number
        }

        slidesField.style.transform = `translate(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
            
        }
        else {
            slideIndex++; 
        }
        
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = slideIndex;
        }

        dots.forEach(dot => dot.style.opacity = .5)
        dots[slideIndex - 1].style.opacity = 1;
    })

    prev.addEventListener('click', () => {
        
        if (offset == 0) {
            offset = (+width.slice(0, width.length - 2) * (slides.length - 1));
        }
        else {
            offset -= +width.slice(0, width.length - 2); 
        }
        slidesField.style.transform = `translate(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        }
        else {
            slideIndex--;
        }
        
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = slideIndex;
        }
        dots.forEach(dot => dot.style.opacity = .5);
        dots[slideIndex-1].style.opacity = 1;
 
    })


    dots.forEach(item => {
        item.addEventListener('click', e => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = (+width.slice(0, width.length - 2) * (slideTo - 1));
            slidesField.style.transform = `translate(-${offset}px)`;

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            }
            else {
                current.textContent = slideIndex;
            }
            dots.forEach(dot => dot.style.opacity = .5);
            dots[slideTo - 1].style.opacity = 1;
        })
    })


    // console.log(typeof width.slice(0, 3))  // '650' data type = string
    // console.log(typeof +width.slice(0, 3)) // 650 data type = number
})



