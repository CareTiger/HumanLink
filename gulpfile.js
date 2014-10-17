var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat');

var paths = {
    js: 'assets/js/*.js',
    less: 'assets/stylesheets/less/*.less'
};

gulp.task('move-less-dependencies', function () {

    return gulp.src([
        'bower_components/bootstrap/less/**/*.less',
    ])
        .pipe(gulp.dest('./assets/stylesheets/less/bootstrap/'));
});

gulp.task('compile-less', ['move-less-dependencies'], function () {
    return gulp.src([
        'assets/stylesheets/less/nav.less',
    ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./assets/stylesheets/build/'));
});

gulp.task('compile-js', function() {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
    ])
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./assets/js/build/'));
});

gulp.task('watch', function() {
    gulp.watch(paths.js, ['compile-js']);
    gulp.watch(paths.less, ['compile-less']);
});

gulp.task('default', ['watch', 'compile-less', 'compile-js'], function () {

});