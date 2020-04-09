$(function () {
  let scroll = window.requestAnimationFrame
  let el = document.querySelectorAll('.scroll-trigger')

  el.forEach((item) => {
    item.style.animationDelay = `${Math.random() * 0.75 + 0.5}s`
  })

  let content = document.querySelectorAll('.scroll-trigger')

  function loop() {
    el.forEach((item) =>
      inViewport(item)
        ? item.classList.add('visible')
        : item.classList.remove('visible') && item.classList.add('invisible')
    )
    scroll(loop)
  }

  function inViewport(el) {
    let rect = el.getBoundingClientRect()
    return (
      (rect.top <= 0 && rect.bottom >= 0) ||
      (rect.bottom >= window.innerHeight && rect.top <= window.innerHeight) ||
      (rect.top >= 0 && rect.bottom <= window.innerHeight)
    )
  }

  loop()
})
