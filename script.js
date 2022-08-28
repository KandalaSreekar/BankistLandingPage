'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/*
The DOM is the interface between the JS code and the browser, or specifically HTML that is rendered by the browser.
we can use it to make JS interact with the browser (create, modify, delete elements. set styles, classes attributes)
(and listen and respond to events)

A DOM tree is generated from any HTML document. It is made of nodes. 

Every single node in the DOM tree is of "type" NODE. This NODE object gets access to special methods and properties
such as textContent, childNodes, parentNode and many others.

There are different types of nodes. 
Element Type → div, images, links etc.
Text Type → <p>
Comment Type → HTML comments
Document Type → QuerySelector. createElement, getElementByID

All of this is made to work using Inheritance.
*/
const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')
btnScrollTo.addEventListener('click', function(e){
    const s1coords = section1.getBoundingClientRect()
    section1.scrollIntoView({behavior: "smooth"})
}
)
document.querySelectorAll('.nav__link').forEach(function(el){
    el.addEventListener('click', function(e){
        e.preventDefault();
        const id = this.getAttribute('href')
        document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    })
})
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
tabsContainer.addEventListener('click', function(e){
    const clicked = e.target.closest('.operations__tab')
    if(!clicked) return;
    tabs.forEach(function(t){
        return t.classList.remove('operations__tab--active')
    })
    tabsContent.forEach(c => c.classList.remove('operations__content--active'))
    clicked.classList.add('operations__tab--active')
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
})