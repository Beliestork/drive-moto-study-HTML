;(function(d) {
    'use strict';

    $('.js-slick-banner').slick({
        prevArrow: '<button class="banner__slider-arrow banner__slider-arrow--prev" type="button"></button>',
        nextArrow: '<button class="banner__slider-arrow banner__slider-arrow--next" type="button"></button>',
        dots: true,
        infinite: true,
    });

    $('.js-slick-product-popular').slick({
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        variableWidth: true,
        prevArrow: '<button class="products__arrow products__arrow--prev" type="button"></button>',
        nextArrow: '<button class="products__arrow products__arrow--next" type="button"></button>',
    });

    /* Tabs */
    const tabs = document.querySelectorAll('.js-tab');
    const tabContents = document.querySelectorAll('.js-tab-content');
    
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].addEventListener('click', handleTabClick);
    }

    function handleTabClick(e) {
        const contentId = e.target.dataset.tabFor;
        const content = document.getElementById(contentId);
        const isolateElement = e.target.closest('.js-tab-isolate');
        
        if (content) {
            const tab = e.currentTarget; 

            removeSelectors(tabs, 'js-tab--active', isolateElement);
            removeSelectors(tabContents, 'js-tab-content--active', isolateElement);

            tab.classList.add('js-tab--active');
            content.classList.add('js-tab-content--active');               
        }
    }

    function removeSelectors(elements, selector, isolateElement) {
        let tmp = [];
        
        if (isolateElement) {
            for (let i = 0; i < elements.length; i++) {
                const isolate = elements[i].closest('.js-tab-isolate');
                if (isolate === isolateElement) {
                    tmp.push(elements[i]);
                }
            }
        } else {
            tmp = elements;
        }

        tmp.forEach(item => {
            item.classList.remove(selector);
        });
    }
    /* .End */

    /* Heart toggle */
    const toggleHeartBtn = function(e) {
        const target = e.target;
        const heartElement = target.closest('.heart');

        if (heartElement) {
            heartElement.classList.toggle('heart--active');
        }
    };  

    document.addEventListener('click', toggleHeartBtn);
    /* .End */

})(document);