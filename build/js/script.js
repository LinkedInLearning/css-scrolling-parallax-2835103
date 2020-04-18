$(function () {
  let nav = document.querySelector('.site-nav')
  let meetMonsters = document.querySelector('#meet')
  let navHeight = nav.scrollHeight

  function moveHeader() {
    let mainOnTop = meetMonsters.getBoundingClientRect().top - navHeight

    mainOnTop < 0
      ? nav.classList.add('in-body')
      : nav.classList.remove('in-body')

    window.requestAnimationFrame(moveHeader)
  }

  window.requestAnimationFrame(moveHeader)
})
