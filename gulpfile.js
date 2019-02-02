var del = require('del');
var gulp = require("gulp");
var babel = require("gulp-babel");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");

gulp.task('minify', () => {
  return gulp.src('build/animated-svg-dial.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('transpile', () => {
  return gulp.src('src/animated-svg-dial.js')
    .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
  return del('build/*', {
    force: true
  });
});

gulp.task('default', gulp.series('clean', 'transpile', 'minify'));
