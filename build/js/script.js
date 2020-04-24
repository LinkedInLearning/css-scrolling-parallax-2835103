$(function () {
  let headerContent = document.querySelector('.header-content')
  let nav = document.querySelector('.site-nav')
  let headerCue = document.querySelector('.header-cue')
  let meetMonsters = document.querySelector('#meet')
  let monsterScroll = document.querySelectorAll('#monster-group .monster')
  let navHeight = nav.scrollHeight

  monsterScroll.forEach(
    (item) => (item.style.animationDelay = `${Math.random() * 1 + 0.4}s`)
  )

  function inViewPort(el) {
    let rect = el.getBoundingClientRect()
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
      (rect.top >= 0 && rect.bottom <= window.innerHeight)
    )
  }

  function moveHeader() {
    let top = window.pageYOffset
    let mainOnTop = meetMonsters.getBoundingClientRect().top - navHeight

    mainOnTop < 0
      ? nav.classList.add('in-body')
      : nav.classList.remove('in-body')

    let currentCuePosition = headerContent.getBoundingClientRect().top

    currentCuePosition < 0
      ? headerCue.classList.add('d-none')
      : headerCue.classList.remove('d-none')

    headerContent.style.transform = `translateY(-${top / 1.5}px)`
    headerContent.style.opacity =
      1 - Math.max(top / (window.innerHeight * 0.2), 0)

    monsterScroll.forEach((item) =>
      inViewPort(item)
        ? item.classList.add('appear')
        : item.classList.remove('appear')
    )

    window.requestAnimationFrame(moveHeader)
  }

  window.requestAnimationFrame(moveHeader)

  let controller = new ScrollMagic.Controller()
  let friendTextTween = TweenMax.from('.friend-text', {
    y: 400,
    opacity: 0,
  })

  new ScrollMagic.Scene({
    triggerElement: '#friend',
  })
    .setTween(friendTextTween)
    .addIndicators({ name: 'friends' })
    .addTo(controller)
})
