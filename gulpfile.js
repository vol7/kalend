const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp
    .src('./dist/worker/*.worker.js')
    .pipe(concat('kalend_worker.js'))
    .pipe(gulp.dest('./dist'));
});
