$(function () {
  // Look for monsters with the class of scroll trigger
  let monsterScroll = document.querySelectorAll('.monster.scroll-trigger')
  monsterScroll.forEach((item) => {
    item.style.animationDelay = `${Math.random() * 0.25 + 0.5}s`
  })

  function pageOffset() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop
  }

  let headerContent = document.querySelector('.header-content')
  let nav = document.querySelector('.site-nav')
  let headerCue = document.querySelector('.header-cue')
  let meetMonsters = document.querySelector('#meet')
  let navHeight = nav.scrollHeight

  function moveHeader() {
    let top = pageOffset()
    let mainOnTop = meetMonsters.getBoundingClientRect().top - navHeight
    mainOnTop < 0
      ? nav.classList.add('in-body')
      : nav.classList.remove('in-body')

    let currentCuePosition = headerContent.getBoundingClientRect().top
    currentCuePosition < -1
      ? headerCue.classList.add('d-none')
      : headerCue.classList.remove('d-none')

    headerContent.style.transform = `translate3D( 0px, ${top / 1.5}px, 0px)`
    headerContent.style.opacity =
      1 - Math.max(top / (window.innerHeight * 0.6), 0)
    window.requestAnimationFrame(moveHeader)
  }
  window.requestAnimationFrame(moveHeader)

  // Detect wether an element is showing in the viewport
  function inViewport(el) {
    let rect = el.getBoundingClientRect()
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
      (rect.top >= 0 && rect.bottom <= window.innerHeight)
    )
  }

  function cycleThroughMonsters() {
    monsterScroll.forEach((item) =>
      inViewport(item)
        ? item.classList.add('visible')
        : item.classList.remove('visible') && item.classList.add('invisible')
    )
    window.requestAnimationFrame(cycleThroughMonsters)
  }
  window.requestAnimationFrame(cycleThroughMonsters)

  //Let the ScrollMagic Begin

  let controller = new ScrollMagic.Controller({ addIndicators: true })

  // Monster Types Scene 01 --------------------------
  let typesTween = new TimelineMax()

  typesTween.from('#types header', 100, {
    opacity: 0,
    y: -100,
    ease: Elastic.easeOut,
  })

  // create a scene
  let typesScene01 = new ScrollMagic.Scene({
    triggerElement: '#types',
    duration: 400,
    triggerHook: 0,
  })
    .setTween(typesTween)
    .setPin('#types')

  controller.addScene(typesScene01)

  // Monster Types Scense 02 --------------------------
  let typesTween02 = new TimelineMax()

  typesTween02.staggerFrom('#types .col', 1.25, {
    scale: 0.5,
    opacity: 0,
    cycle: {
      y: [500],
    },
    ease: Elastic.easeOut,
    stagger: {
      amount: 0.25,
    },
  })

  // create a scene
  let typesScene02 = new ScrollMagic.Scene({
    triggerElement: '#types',
    triggerHook: 0,
    offset: 200,
    duration: 300,
  }).setTween(typesTween02)
  controller.addScene(typesScene02)

  // Parachute Friend --------------------------
  let friendTween = new TimelineMax()

  friendTween
    .from('#parachute', 1, {
      scale: 0.5,
      opacity: 0.25,
      rotation: -40,
      x: '100%',
      y: '-200%',
    })
    .to('#parachute', 1, {
      x: '30%',
      y: '20%',
      rotation: -30,
    })
    .to('#parachute', 1, {
      x: '-80%',
      y: '250%',
      rotation: 30,
    })

  // create a scene
  let friendScene = new ScrollMagic.Scene({
    triggerElement: '#friend',
    duration: '170%',
  }).setTween(friendTween)
  controller.addScene(friendScene)

  var friendTextTween = TweenMax.staggerFromTo(
    '.friend-text',
    2,
    { y: 700, opacity: 0 },
    { y: 0, opacity: 1, ease: Back.easeOut },
    0.15
  )

  // create a scene
  let friendText = new ScrollMagic.Scene({
    triggerElement: '#friend',
    triggerHook: 0,
    duration: '10%',
  }).setTween(friendTextTween)
  controller.addScene(friendText)
})
