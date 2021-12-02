const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp
    .src('./dist/styles/**/*.css')
    .pipe(concat('index.css'))
    .pipe(gulp.dest('./dist/styles'));
});
