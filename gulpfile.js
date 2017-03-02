// Including plugins
var gulp = require('gulp'),
browserify = require('gulp-browserify'),
uglify = require("gulp-uglify"),
cleanCSS = require("gulp-clean-css"),
rename = require("gulp-rename"),
development = true;

// Merge JS into one file
gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src('./src/js/botonera/*.js')
        .pipe(browserify({
        //   insertGlobals : true,
          debug : development
        }))
        .pipe(gulp.dest('./build/js/botonera/'))
});

// Minify CSS
gulp.task('minify-css', function () {
    gulp.src(['./src/css/*/*.css', '!./src/css/*/*.min.css']) // path to your files
    .pipe(cleanCSS({debug: development}, function(details) {
        console.log("Original: " + details.name + ': ' + details.stats.originalSize);
        console.log("Minify: " +details.name + ': ' + details.stats.minifiedSize);
    }))
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/'));
});

// Minify JS
// NOTE uglifyjs only works with ES5
gulp.task('minify-js', function () {
    gulp.src(['./build/js/*/*.js', '!./build/js/*/*.min.js']) // path to your files
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build', ['browserify', 'minify-js', 'minify-css']);
gulp.task('minify', ['minify-js', 'minify-css']);
