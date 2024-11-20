const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  searchInputEl.setAttribute('placeholder', '통합검색');
});

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});
// 이 코드에서.search 요소에.focused 클래스가 추가되면 CSS 규칙은 부모 요소의 클래스 상태를 기준으로 자식 요소의 스타일을 변경하도록 동작할 수 있습니다. 
// 이를 통해 자식 요소인 .material - icons도 .search 요소의 상태 변화에 따라 스타일이 바뀌는 것입니다.


/**
 * 페이지 스크롤에 따른 요소 제어
 */
// 페이지 스크롤에 영향을 받는 요소들을 검색!
const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 버튼 보이기!
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300));
/*_.throttle(함수, 시간)*/

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});

/**
 * 순서대로 나타나는 기능
 */
// 나타날 요소들(.fade-in) 찾기.
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소, 지속시간, 옵션);
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7, 1.4, 2.1, 2.7
    opacity: 1
  });
});

//new Swiper(선택자, 옵션)
/**
 * 슬라이드 요소 관리
 */
new Swiper('.notice-line .swiper', {
  direction: 'vertical',
  // autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper', {
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수 
  spaceBetween: 10, // 슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true,
  autoplay: {
    delay: 5000
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어
  },
  navigation: {
    prevEl: '.promotion .swiper-button-prev',
    nextEl: '.promotion .swiper-button-next'
  }
});

new Swiper('.awards .swiper', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;

promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  //gsap.to(요소, 시간, 옵션);
  gsap.to(
    selector, //선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut", //gsap easing 구글 검색 -GreenSock 들어가서 복사
      delay: random(0, delay)
    }
  );
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// ScrollMagic
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, // 요소가 뷰포트에 보이기 시작할 때 트리거됩니다.
      triggerHook: .8 // 스크롤 위치 기준점. 0.8은 화면의 80% 높이에서 트리거됩니다.
    })
    .setClassToggle(spyEl, 'show') // 요소에 'show' 클래스를 추가/제거합니다.
    .addTo(new ScrollMagic.Controller()); // Scene을 컨트롤러에 추가하여 활성화합니다.
});
// Controller ** 는 ScrollMagic에서 전체 스크롤 이벤트를 관리하고 제어하는 역할을 합니다. 
// 여러 Scene들을 하나의 Controller에 추가하여 관리함으로써, 스크롤 위치나 이벤트에 따라 모든 Scene이 제대로 동작할 수 있도록 합니다.
// Controller는 기본적으로 모든 Scene을 추적하며, 각 Scene이 지정된 조건을 만족할 때(예: 스크롤 위치가 트리거 지점을 통과할 때) 
// 해당 Scene의 동작(예: 클래스 토글, 애니메이션 등)이 실행되도록 보장합니다. 
// .addTo() 메서드는 Scene을 특정 Controller에 연결하여 활성화하는 메서드입니다. 
// 이 메서드를 사용하지 않으면 Scene이 Controller에 추가되지 않기 때문에 동작하지 않습니다. 
// .addTo(new ScrollMagic.Controller());는 
// 새로 생성한 Scene을 Controller에 추가하여 Controller가 해당 Scene을 감지하고 제어할 수 있도록 합니다.
// 모든 Scene을 하나의 Controller가 통합적으로 관리함으로써 브라우저의 리소스 사용을 최적화할 수 있습니다.

const thisYear = document.querySelector('.this-year'); 
thisYear.textContent = new Date().getFullYear(); // 2021 













// _.throttle(함수, 시간)