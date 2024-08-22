'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnLearn = document.querySelector('.btn--scroll-to');

const sections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const s1coords = section1.getBoundingClientRect();
const s2coords = section2.getBoundingClientRect();

const tabContainer = document.querySelector('.operations__tab-container');
const tab = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

const slider = document.querySelector('.slider');

const nav = document.querySelector('.nav');
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

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies to... Blah Blah blah stfu bitch <button class = "btn btn--close--cookie">Accept</button>`;
message.style.width = '110%';
message.style.backgroundColor = '#353445';

document.querySelector('.header').prepend(message);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + `px`;

btnLearn.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (!e.target.classList.contains('nav__link')) return;

  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tab.forEach(val => val.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabContent.forEach(val =>
    val.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    link.style.opacity = 1;

    const navLinks = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    navLinks.forEach(val => {
      if (val !== link) {
        val.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

const obsCallback = function (entries, obs) {
  if (!entries[0].isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
};
const header = document.querySelector('.header');
const headerObserver = new IntersectionObserver(obsCallback, obsOptions);
headerObserver.observe(header);

//Section Observer
const secObsCallback = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};
const sectionObserver = new IntersectionObserver(secObsCallback, {
  threshold: 0.2,
});

sections.forEach(function (val) {
  val.classList.add('section--hidden');
  sectionObserver.observe(val);
});

//Lazy Image Observer
const imgObserverCallBack = function (entries, observer) {
  const [entry] = entries;
  const tempImg = entry.target;
  if (!entry.isIntersecting) return;
  console.log('Sheesh');
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    tempImg.classList.remove('lazy-img');
  });
};
const imgObserver = new IntersectionObserver(imgObserverCallBack, {
  threshold: 0,
  rootMargin: '200px',
});

//Slider for Images
const images = document.querySelectorAll('img[data-src]');
images.forEach(val => imgObserver.observe(val));
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;
const slides = document.querySelectorAll('.slide');

const changeSlide = function (slide = 0) {
  slides.forEach(
    (val, i) => (val.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
const setActiveDot = function (slide) {
  console.log(slide);
  const sliderDots = document.querySelectorAll('.dots__dot');
  console.log(sliderDots[0]);
  sliderDots.forEach(val => val.classList.remove('dots__dot--active'));
  sliderDots[slide].classList.add('dots__dot--active');
};
changeSlide(0);

const nextSlide = function () {
  curSlide++;
  if (curSlide >= slides.length) {
    curSlide = 0;
  }
  changeSlide(curSlide);
  setActiveDot(curSlide);
};

const prevSlide = function () {
  curSlide--;
  if (curSlide < 0) {
    curSlide = slides.length - 1;
  }
  changeSlide(curSlide);
  setActiveDot(curSlide);
};
btnRight.addEventListener('click', function () {
  nextSlide();
});

btnLeft.addEventListener('click', function () {
  prevSlide();
  slider.focus();
});

slider.blur();
slider.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key === 'ArrowLeft') prevSlide();
  else if (e.key === 'ArrowRight') nextSlide();
});

const containerDots = document.querySelector('.dots');
slides.forEach((_, i) => {
  containerDots.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});

containerDots.addEventListener('click', function (e) {
  if (!e.target.classList.contains('dots__dot')) return;
  console.log(e.target);
  curSlide = e.target.dataset.slide;
  changeSlide(curSlide);
  setActiveDot(curSlide);
});

setActiveDot(curSlide);

////////////////////////////////////////////////////////////
//Non Importang Stuffs
// const randomInt = (min, max) =>
//   Math.floor(min + Math.random() * (max - min + 1));
// console.log(Math.random() * 6); // 0 - 5
// console.log(randomInt(5, 6));

// document.querySelector('.nav').addEventListener('click', function () {
//   this.style.backgroundColor = `rgb(${randomInt(0, 255)},${randomInt(
//     0,
//     255
//   )},${randomInt(0, 255)})`;
//   console.log('nav 1');
// });

// document.querySelector('.nav__links').addEventListener('click', function () {
//   this.style.backgroundColor = `rgb(${randomInt(0, 255)},${randomInt(
//     0,
//     255
//   )},${randomInt(0, 255)})`;
//   console.log('nav links 2');
// });
// document.querySelector('.nav__link').addEventListener('click', function () {
//   this.style.backgroundColor = `rgb(${randomInt(0, 255)},${randomInt(
//     0,
//     255
//   )},${randomInt(0, 255)})`;
//   console.log('nav link 3');
// });

// const foo = document.querySelectorAll('.nav__link');
// foo.forEach(val => (val.href = '#'));
