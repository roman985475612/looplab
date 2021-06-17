const gulp         = require('gulp')
const del          = require('del')
const concat       = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const cleanCSS     = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')
const browserSync  = require('browser-sync').create()
const gulpIf       = require('gulp-if')
const uglify       = require('gulp-uglifyjs')
const webp         = require('gulp-webp')

let isDev  = process.argv.includes('--dev')
let isProd = !isDev

function clean() {
    return del('./build/*')
}

function html() {
    return gulp.src('./src/**/*.html')
               .pipe(gulp.dest('./build'))
               .pipe(browserSync.stream())
}

function styles() {
    return gulp.src([
                './node_modules/bootstrap/dist/css/bootstrap.min.css',
                './src/css/**/*.css'
            ])
            .pipe(gulpIf(isDev, sourcemaps.init()))
            .pipe(concat('main.css'))
            .pipe(autoprefixer())
            .pipe(gulpIf(isProd, cleanCSS({
                level: 2
            })))
            .pipe(gulpIf(isDev, sourcemaps.write('.')))
            .pipe(gulp.dest('./build/css'))
            .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src([
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './src/js/**/*.js'
        ])
        // .pipe(concat('main.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream())
}

function webfonts() {
    return gulp
            .src('./src/webfonts/**/*')
            .pipe(gulp.dest('./build/webfonts'))
}

function image() {
    return gulp
            .src('./src/img/**/*')
            .pipe(gulp.dest('./build/img'))
}

function imageToWebp() {
    return gulp
            .src('./src/img/**/*')
            .pipe(webp())
            .pipe(gulp.dest('./build/img'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    })
    gulp.watch('./src/**/*.html', html)
    gulp.watch('./src/css/**/*.css', styles)
    gulp.watch('./src/js/**/*.js', scripts)
}

let build = gulp.parallel(html, styles, scripts, webfonts, image, imageToWebp)
let buildWithClean = gulp.series(clean, build)
let dev = gulp.series(buildWithClean, watch)

gulp.task('build', buildWithClean)
gulp.task('dev', dev)