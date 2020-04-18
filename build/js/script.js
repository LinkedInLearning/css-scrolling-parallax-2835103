$(function () {
  let meetMonsters = document.querySelector('#meet')

  function moveHeader() {
    console.log(`${meetMonsters.getBoundingClientRect().top}`)
    window.requestAnimationFrame(moveHeader)
  }

  window.requestAnimationFrame(moveHeader)
})
