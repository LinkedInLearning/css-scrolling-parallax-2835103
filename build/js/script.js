$(function () {
  // Look for monsters with the class of scroll trigger
  let monsterScroll = document.querySelectorAll('.monster.scroll-trigger')
  monsterScroll.forEach((item) => {
    item.style.animationDelay = `${Math.random() * 0.75 + 0.5}s`
  })

  function getMonsters() {
    monsterScroll.forEach((item) =>
      inViewport(item)
        ? item.classList.add('visible')
        : item.classList.remove('visible') && item.classList.add('invisible')
    )
    window.requestAnimationFrame(getMonsters)
  }
  window.requestAnimationFrame(getMonsters)

  function pageOffset() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop
  }

  function moveHeader() {
    let headerContent = document.querySelector('.header-content')
    let top = pageOffset()
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
})
