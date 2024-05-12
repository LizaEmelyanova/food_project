function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          btn_prev = document.querySelector(prevArrow),
          btn_next = document.querySelector(nextArrow),
          current_slide = document.querySelector(currentCounter),
          total_slides = document.querySelector(totalCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
    
    let current = 1;
    let offset = 0;

    current_slide.innerHTML = numFormat(current);
    total_slides.innerHTML = numFormat(slides.length);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    
    indicators.style.cssText = `
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
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
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
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    btn_next.addEventListener('click', () => {
        if (offset == getNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (current == slides.length) {
            current = 1;
        } else {
            current++;
        }

        current_slide.innerHTML = numFormat(current);

        currentDotStyle();
    });

    btn_prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = getNumber(width) * (slides.length - 1);
        } else {
            offset -= getNumber(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (current == 1) {
            current = slides.length;
        } else {
            current--;
        }

        current_slide.innerHTML = numFormat(current);

        currentDotStyle();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            current = slideTo;
            offset = getNumber(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            current_slide.innerHTML = numFormat(current);

            currentDotStyle();
        });
    });

    function numFormat(num) {
        if (num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function currentDotStyle() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[current - 1].style.opacity = 1;
    }

    function getNumber(str) {
        return +str.replace(/\D/g, '');
    }
}

export default slider;