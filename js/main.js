;(function(d) {
    'use strict';

    $('.js-slick-banner').slick({
        prevArrow: '<button class="banner__slider-arrow banner__slider-arrow--prev" type="button"></button>',
        nextArrow: '<button class="banner__slider-arrow banner__slider-arrow--next" type="button"></button>',
        dots: true,
        infinite: true,
    });

    $('.js-slick-products').slick({
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

    /* Dropdown Content */
    const triggers = document.getElementsByClassName('js-dropdown-trigger');

    const handleTriggerClick = (e) => {
        const selfTrigger = e.currentTarget;

        selfTrigger.classList.toggle('js-dropdown-triggered');

        if (selfTrigger.dataset.target) {
            alert('Ищем элемент по id переданному в атрибут data-target="#example"');

        } else {
            const dropDownElement = selfTrigger.parentElement.querySelector('.js-dropdown');
            
            // js-dropdown--open - это метка, говорящая нам о том, что элемент открыт.
            if (dropDownElement.classList.contains('js-dropdown--open')) {
                dropDownElement.classList.remove('js-dropdown--open');
                dropDownElement.style.maxHeight = null;
            } else {
                dropDownElement.classList.add('js-dropdown--open');
                dropDownElement.style.maxHeight = dropDownElement.scrollHeight + 'px';
            }
        }
    };

    for (let i = 0; i < triggers.length; i++) {
        triggers[i].addEventListener('click', handleTriggerClick);
    }

    const openedDropDownContainers = document.querySelectorAll('.js-dropdown.js-dropdown--open');

    for (let i = 0; i < openedDropDownContainers.length; i++) {
        openedDropDownContainers[i].style.maxHeight = openedDropDownContainers[i].scrollHeight + 'px';
    }
    /* .End */

    /* Filter Range */
        if (jQuery().ionRangeSlider) {
            const updateRangeLabels = function(min, max) {
                document.querySelector('.js-range-slider-min-value').textContent = min;
                document.querySelector('.js-range-slider-max-value').textContent = max;
            }

            $(".js-range-slider").ionRangeSlider({
                type: 'double',
                skin: 'round',
                grid: false,
                hide_min_max: true,
                hide_from_to: true,
                onStart: function(data) {
                    updateRangeLabels(data.from_pretty, data.to_pretty);
                },
                onChange: function(data) {
                    updateRangeLabels(data.from_pretty, data.to_pretty);
                }
            });
        }
    /* .End */


    /* Custom Select */
    const customSelects = document.getElementsByClassName('custom-select');

    for (let i = 0; i < customSelects.length; i++) {
        const nativeSelect = customSelects[i].querySelector('select');
        const selectContent = document.createElement('div');
        selectContent.className = 'custom-select__selected';
        selectContent.innerHTML = nativeSelect.options[nativeSelect.selectedIndex].innerHTML;
        customSelects[i].append(selectContent);

        /* Inner div for custom options elements */
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'custom-select__options custom-select__options--hide';

        for (let k = 0; k < nativeSelect.length; k++) {
            const optionElm = document.createElement('div');
            optionElm.innerHTML = nativeSelect.options[k].innerHTML;
            optionElm.className = 'custom-select__option';
    
            optionElm.addEventListener('click', function(e) {
                for (let l = 0; l < nativeSelect.length; l++) {
                    if (nativeSelect.options[l].innerHTML === this.innerHTML) {
                        nativeSelect.selectedIndex = l;
                        selectContent.innerHTML = this.innerHTML;
                        closeAllCustomSelect(customSelects[i], true);
                        break;
                    }
                }
            });

            optionsContainer.append(optionElm);
        }

        customSelects[i].append(optionsContainer);

        selectContent.addEventListener('click', function(e) {
            // Close all custom-select
            closeAllCustomSelect(e.currentTarget.parentElement);
            
            // Show only options for current select
            selectContent.classList.toggle('custom-select__selected--up-arr');
            optionsContainer.classList.toggle('custom-select__options--hide');
        });

        document.addEventListener('click', function(e) {
            const target = e.target;
            const selectElement = target.closest('.custom-select');
            
            if (!selectElement) {
                closeAllCustomSelect(selectElement);
            }
        }, true);
    }

    function closeAllCustomSelect(trigger, hard) {
        Array.prototype.forEach.call(document.querySelectorAll('.custom-select'), function(item) {
            if (hard || trigger !== item) {
                item.querySelector('.custom-select__selected').classList.remove('custom-select__selected--up-arr');
                item.querySelector('.custom-select__options').classList.add('custom-select__options--hide');
            }
        });
    }
    /* .End */

    /* Buttons to change flow on catalog page */
    const changeFlowButtons = document.querySelectorAll('.js-change-flow');

    const removeSelectorForArray = (selector, array) => {
        array.forEach((item) => {
            item.classList.remove(selector);
        });
    };

    for (let i = 0; i < changeFlowButtons.length; i++) {
        changeFlowButtons[i].addEventListener('click', function(e) {
            const curTarget = e.currentTarget;
            const targetIdAttr = curTarget.dataset.target || null;
            const typeAttr = curTarget.dataset.flowType || 'grid';

            if (targetIdAttr) {
                const elementToChangeFlow = document.getElementById(targetIdAttr);
                
                if (elementToChangeFlow) {
                    elementToChangeFlow.setAttribute('data-flow-type', typeAttr);

                    removeSelectorForArray('js-active-flow', changeFlowButtons);
                    curTarget.classList.add('js-active-flow');
                }
                
                console.log(elementToChangeFlow);
            }
        });
    }
    /* .End */

    /* Звездный рейтинг */
    const starRateElement = document.querySelector('.js-star-rate');

    if (starRateElement) {
        const amounFilledStar = starRateElement.dataset.starFill;
        const starElements = starRateElement.querySelectorAll('.js-star-rate__entity');

        for (let i = 0; i < amounFilledStar; i++) {
            if (i + 1 > starElements.length) break;

            starElements[i].classList.add('star-rate__entity--filled');
        }
    }
    /* .End */

    /* Мобильное меню */
    const sideMenuMob = document.querySelector('.js-side-menu-mob');

    if (sideMenuMob) {
        const activeSelector = 'js-side-menu-mob--open'
        const triggerElement = document.querySelector('.js-side-menu-mob-trigger');

        const closeSideMenuMob = function() {
            sideMenuMob.classList.remove(activeSelector);
        };

        const openSideMenuMob = function() {
            sideMenuMob.classList.add(activeSelector);
        };

        

        document.addEventListener('click', function(e) {
            const target = e.target;

            if (!target.closest('.js-side-menu-mob')) {
                closeSideMenuMob(); 
            }
        }, true);

        triggerElement.addEventListener('click', function() {
            openSideMenuMob();
        });
    }
    /* .End */

})(document);