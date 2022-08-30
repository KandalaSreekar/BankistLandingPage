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
// Menu Fade animation

const nav = document.querySelector('.nav')
nav.addEventListener('mouseover', function(e){
    if(e.target.classList.contains('nav__link')){
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')
        siblings.forEach(el => {
            if(el!==link) el.style.opacity = 0.5
        })
        logo.style.opacity = 0.5
    }
})
nav.addEventListener('mouseout', function(e){
    if(e.target.classList.contains('nav__link')){
        const link = e.target
        const siblings = link.closest('.nav').querySelectorAll('.nav__link')
        const logo = link.closest('.nav').querySelector('img')
        siblings.forEach(el => {
            if(el!==link) el.style.opacity = 1
        })
        logo.style.opacity = 1
    }
})

// Sticky Navigation

const stickyNav = function(entries){
    const [entry] = entries
    nav.classList.add('sticky')
    if(!entry.isIntersecting) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
}
const header = document.querySelector(".header")
const navHeight = nav.getBoundingClientRect().height
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header)

// Reveal Sections

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) return

    entry.target.classList.remove('section--hidden')
    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})

allSections.forEach(function(section){
    sectionObserver.observe(section)
    section.classList.add('section--hidden')
})

// Lazy Loading Imagess

const imgTargets = document.querySelectorAll('[data-src]')

const loadImg = function(entries, observer){
    const [entry] = entries

    // replace src with data-src
    entry.target.src = entry.target.dataset.src
    entry.target.classList.remove('lazy-img')
}
const imgObserver = new IntersectionObserver(loadImg, {
    root:null,
    threshold: 0,
})
imgTargets.forEach(img => imgObserver.observe(img))