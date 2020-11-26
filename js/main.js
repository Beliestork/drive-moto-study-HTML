;(function(d) {
    'use strict';

    $('.js-slick-banner').slick({
        prevArrow: '<button class="banner__slider-arrow banner__slider-arrow--prev" type="button"></button>',
        nextArrow: '<button class="banner__slider-arrow banner__slider-arrow--next" type="button"></button>',
        dots: true,
        infinite: true,
    });


    /* Tab for <category-search> section */
    const categorySearch = document.querySelector('.js-category-search');

    if (categorySearch) {
        const categoryTabs = document.querySelectorAll('.js-category-search-tab');
        const categoryforms = document.querySelectorAll('.js-category-search-form');
        
        for (let i = 0; i < categoryTabs.length; i++) {
            categoryTabs[i].addEventListener('click', handleTabClick);
        }

        function handleTabClick(e) {
            const formId = e.target.dataset.categoryTabFor;
            const form = document.getElementById(formId);
            
            if (form) {
                const tab = e.currentTarget; 

                removeSelectors(categoryTabs, 'category-search__tab--active');
                removeSelectors(categoryforms, 'category-search__form--active');

                tab.classList.add('category-search__tab--active');
                form.classList.add('category-search__form--active');               
            }
        }

        function removeSelectors(elements, selector) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].classList.remove(selector);
            }
        }
    }
    /* .End */

})(document);