// добавляем класс для открытия меню

function openMenu() {
  const menu = document.getElementById('wrapper-menu');
  menu.classList.add('wrapper-menu--open');
  activeHidden(true);
}
// убираем класс для закрытия меню; вызываем функцию, и передаём параметр false для того, чтобы сработало else и класс active удалился и body перестал быть hidden и скролился при закрытом меню!

function closeMenu() {
  const menu = document.getElementById('wrapper-menu');
  menu.classList.remove('wrapper-menu--open');
  activeHidden(false);
}

// modal
function openModal(id) {
  openForm('login-form', 'registration-form');
  const modal = document.getElementById(id);
  modal.classList.add('modal--open');
  setTimeout(() => activeHidden(true), 0);
}

function closeModal(id) {
  closeForm('registration-form');
  const modal = document.getElementById(id);
  modal.classList.remove('modal--open');
  activeHidden(false);
}

// form

function openForm(id, idClose = null) {
  if (idClose) {
    closeForm(idClose);
  }
  const form = document.getElementById(id);
  form.classList.add('form--open');
}

function closeForm(id) {
  const form = document.getElementById(id);
  form.classList.remove('form--open');
}

// функция останавливает дефолтную отправку формы и выводит дфнные, введенные в input функцией  alert
function returnDataInput(event) {
  event.preventDefault();
  const email = event.target.elements.email.value;
  const password = event.target.elements.psw.value;
  const res = email + '\n' + password;
  alert(res);
}

// находим id и записываем в переменную. Условный оператор, если параметр open = true -  добавляем его классу декоратор active (при котором применяется свойство overflow hidden для body); если параметр open = false - удаляем декоратор active (у body становится overflow auto).

function activeHidden(open) {
  const body = document.getElementById('body-hidden');
  if (open) {
    body.classList.add('body-hidden--active');
  } else {
    body.classList.remove('body-hidden--active');
  }
}

// находим элементы списка меню и при нажатии на них вызываем функцию, которая убирает класс и меню закрывается

const linkList = document.getElementsByClassName('vertical-menu__link');
for (let i = 0; i < linkList.length; i++) {
  const item = linkList[i];
  item.addEventListener('click', closeMenu);
}

/********************************** СЛАЙДЕР****************************/

/********************************** инициализация слайдера****************************/
window.addEventListener(`resize`, (event) => {
  // добавлена высота блоку slider
  sliderWidth = slides[0].clientWidth;
  slider.style.height = slider.clientWidth > 390 ? sliderWidth + 'px' : '210px';
  stepsSlide(1, sliderWidth);
});

//точки для переключения слайдера

const arrowSlider = document.getElementsByClassName('slider-points__item');
for (let i = 0; i < arrowSlider.length; i++) {
  arrowSlider[i].addEventListener('click', function () {
    clickPoint(this);
  });
  arrowSlider[i].setAttribute('slide-index', i);
}

// переключение по слайдам (нажимая на картинку)

const allSlides = document.getElementsByClassName('slider__slide');
for (let i = 0; i < allSlides.length; i++) {
  allSlides[i].addEventListener('click', function () {
    clickSlide(this);
  });
  allSlides[i].setAttribute('slide-Index', i);
  allSlides[i].setAttribute('slide-points', i);
}

// стрелки на мобильной версии

const arrowRight = document.getElementsByClassName('slider-arrow__right');
const arrowLeft = document.getElementsByClassName('slider-arrow__left');

// вешаем клик на правую и на левую стрелку, и запускаем функцию,которая передаёт параметры при нажатии стрелки,
// если нажата правая стрелка, то +1, а если нажата левая -1

arrowRight[0].addEventListener('click', function () {
  clickArrow(1);
});
arrowLeft[0].addEventListener('click', function () {
  clickArrow(-1);
});

// активный слайд (который сейчас по центру)

let currentSlide = 1;

// весь слайдер
const slider = document.getElementById('slider');

// обёртка слайдера с абсолютным позиционированием

const sliderList = slider.getElementsByClassName('slider__list')[0];

// каждый слайд отдельно
const slides = slider.getElementsByClassName('slider__slide');

// высота слайда
const sliderHeight = slides[0].clientHeight;

// ширина слайда
let sliderWidth = slides[0].clientWidth;

// добавлена высота блоку slider
slider.style.height = slider.clientWidth > 390 ? sliderWidth + 'px' : '210px';
startAddSlide();
stepsSlide(1, sliderWidth);

/********************************** конец инициализации слайдера****************************/

//функция, которая устанавливает активную точку и задаёт ей класс 'slider-points__item--active'
function activePoint(a, slideIndex = 1) {
  const el = document.getElementsByClassName('slider-points__item--active');
  if (el[0]) {
    el[0].classList.remove('slider-points__item--active');
  }
  arrowSlider[a].classList.add('slider-points__item--active');
  arrowSlider[a].setAttribute('slide-index', slideIndex);
}

// функция, которая передвигает слайды
function stepsSlide(a, slideWidth) {
  activePoint(a);
  a++;
  const position = (slider.clientWidth - slideWidth) / 2 - (slideWidth * a + getGap(slider.clientWidth) * a);
  sliderList.style.left = position + 'px';
}

function clickPoint(point) {
  const slideIndex = point.getAttribute('slide-index');

  for (let i = 0; i < slides.length; i++) {
    if (slides[i].getAttribute('slide-index') == slideIndex) {
      clickSlide(slides[i]);
      return;
    }
  }
}

// функция которая вставляет слайд в начало и слайд в конец
function startAddSlide() {
  const newSlide1 = slides[slides.length - 1].cloneNode(true);
  newSlide1.setAttribute('slide-Index', -1);
  newSlide1.addEventListener('click', function () {
    clickSlide(this);
  });
  const newSlide2 = slides[0].cloneNode(true);
  newSlide2.setAttribute('slide-Index', slides.length);
  newSlide2.addEventListener('click', function () {
    clickSlide(this);
  });
  sliderList.insertBefore(newSlide1, sliderList.firstChild);
  sliderList.appendChild(newSlide2);
}

// функция, которая возвращает размер gap, установленный в css, в зависимости от ширины слайдера
function getGap(widthSlider) {
  if (widthSlider >= 768) {
    return 60;
  }
  if (widthSlider <= 390) {
    return 0;
  }
  return 15;
}

//функция, которая переключает по стрелке слайд (мобильная версия)
function clickArrow(direction) {
  const newIndex = currentSlide + direction;
  for (let i = 0; i < slides.length; i++) {
    const indexSlide = slides[i].getAttribute('slide-index');
    if (newIndex == indexSlide) {
      clickSlide(slides[i]);
      break;
    }
  }
}

function clickSlide(el) {
  const indexActiveSlide = +el.getAttribute('slide-index');
  const sliderPoints = el.getAttribute('slide-points');
  if (indexActiveSlide == currentSlide) {
    return;
  }

  //получаем текущую позицию left sliderList
  const left = sliderList.style.left.replace('px', '');
  //отключаем transition для left
  sliderList.style.transition = 'left 0s';

  removeSlide(indexActiveSlide, currentSlide);
  // если нажимаем вправо
  if (currentSlide < indexActiveSlide) {
    // то увеличиваем left на ширину 1 слайда
    sliderList.style.left = +left + sliderWidth + 'px';
  } else {
    // если вправо то уменьшаем left на ширину 1 слайда
    sliderList.style.left = +left - sliderWidth + 'px';
  }

  addSlide(indexActiveSlide, currentSlide);

  // функция, которая запускает данный код последним, когда уже все выполнилось
  setTimeout(() => {
    // добавляем transition left
    sliderList.style.transition = 'left 1s';
    // возвращаем предыдущую позицию left
    sliderList.style.left = left + 'px';
  }, 0);
  currentSlide = indexActiveSlide;
  activePoint(sliderPoints, indexActiveSlide);
}

// функция, которая добавляет новые слайды
function addSlide(indexActiveSlide, currentSlide) {
  // eсли currentSlide > indexActiveSlide = true, то идем влево. Если false - идем вправо.
  // slideIndex это индекс элемента в массиве слайдов, который нужно взять чтобы склонировать, если влево, то берем то что перед первым элементом, если вправо то предпоследний элемент
  const slideIndex = currentSlide > indexActiveSlide ? slides.length - 2 : 1;
  // клонируем слайд из массива слайдов нужный нам слайд по индексу, который узнали выше
  const newSlide = slides[slideIndex].cloneNode(true);
  newSlide.addEventListener('click', function () {
    clickSlide(this);
  });
  // если идем влево, то
  if (currentSlide > indexActiveSlide) {
    // берем в списке слайдов  первого ребенка и получаем его атрибут
    const newIndex = sliderList.firstElementChild.getAttribute('slide-index');
    // склонированному слайду перезаписываем атрибут уменьшая его на 1
    newSlide.setAttribute('slide-Index', newIndex - 1);
    // в начало массива слайдов добавляем склонированный слайд с новым атрибутом перед первым ребенком
    sliderList.insertBefore(newSlide, sliderList.firstElementChild);
    // если идем вправо, то
  } else {
    // берем в списке слайдов  первого ребенка и получаем его атрибут
    const newIndex = sliderList.lastElementChild.getAttribute('slide-index');
    // склонированному слайду перезаписываем атрибут увеличивая его на 1
    newSlide.setAttribute('slide-Index', +newIndex + 1);
    // в конец массива слайдов добавляем склонированный слайд с новым атрибутом
    sliderList.appendChild(newSlide);
  }
}

function removeSlide(indexActiveSlide, currentSlide) {
  //если текущий слайд больше, чем нажатый, то удалить firstchild или удалить lastchild

  if (currentSlide > indexActiveSlide) {
    sliderList.removeChild(sliderList.lastElementChild);
  } else {
    sliderList.removeChild(sliderList.firstElementChild);
  }
}

const result = `1. Слайдер изображений в секции destinations +50
- на десктоп варианте при клике на урезанную картинку слева или справа изображение меняется по принципу карусели (например если нажать правую картинку та что была в центре на уезжает налево, а та что была видна наполовину оказывается cправа). Слайдер может быть как конечным так и бесконечным - данный критерий не должен влиять на оценку + 20
- Три точки внизу отображают "номер слайда", то есть каждому слайду соответствует свой кружочек, который становится активным при нахождении соответствующего ему слайда в центре. На мобильном варианте картинка одна, но поверх нее появляются стрелочки навигации (можно сделать как карусель или же затемнять кнопку если слайдер достиг края) +20
- Анимации плавного перемещения для слайдера +10
2. Нажатие на кнопку Login (кнопка Account в мобильной версии) показывает сверстанный логин попап + 50
- логин попап соответствует верстке его закрытие происходит при клике вне попапа +25
- логин попап имеет 2 инпута (логин и пароль) при нажатии на кнопку Sign In показывается браузерный алерт с введенными данными (для реализации можно использовать тег ) +25
3. Нажатие на кнопку Register на Login попапе меняет разметку попапа на разметку Sign Up попапа согласно макету (То есть нажатие не закрывает модал а просто меняет его наполнение). +25
- Оценка 125/125.`;

console.log(result);
