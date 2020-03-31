const { src, dest, series, parallel, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const origin = 'build'
const destination = 'build'

function html(cb) {
  cb()
}

function css(cb) {
  cb()
}

function js(cb) {
  cb()
}

function watcher(cb) {
  watch(`${origin}/**/*.html`).on('change', series(html, browserSync.reload))
  watch(`${origin}/**/*.css`).on('change', series(css, browserSync.reload))
  watch(`${origin}/**/*.js`).on('change', series(js, browserSync.reload))
  cb()
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: destination
    }
  })
  cb()
}

exports.default = series(parallel(html, css, js), server, watcher)
