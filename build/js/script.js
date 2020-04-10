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

  let controller = new ScrollMagic.Controller({ addIndicators: true })

  // create a scene
  let scene = new ScrollMagic.Scene({
    triggerElement: '#types',
    triggerHook: 0,
    offset: -70,
    duration: 500,
  })
    .setTween('#type-horns', 0.1, { fill: 'red', scale: 2.5, opacity: 0 })
    .setPin('#types')

  controller.addScene(scene)
})
