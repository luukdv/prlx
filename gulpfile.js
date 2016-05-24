'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

var files = [
  'src/**/*.js',
  '!gulpfile.js',
  '!node_modules/**/*.*'
];

gulp.task('uglify', function() {
  return gulp.src(files)

  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('default', function() {
  gulp.watch(files, ['uglify']);
});
