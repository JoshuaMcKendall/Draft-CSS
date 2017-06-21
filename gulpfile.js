var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/css'));
});

gulp.task('css', function() {
	return gulp.src(['src/css/reset.css', 'src/css/grid.css'])
		.pipe(concat('draft.css'))
		.pipe(gulp.dest('./dist/'))
		.pipe(concat('draft.min.css'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('nano', function() {
	return gulp.src('./dist/draft.min.css')
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/'))
	    .pipe(browserSync.reload({
	      stream: true
	    }));
});

gulp.task('build', function(callback) {
  runSequence('sass', 'css', 'nano', callback);
});

gulp.task('watch', ['browserSync', 'build'], function() {
	gulp.watch('src/scss/**/*.scss', ['build']);
	gulp.watch('./index.html', browserSync.reload)
});

gulp.task('browserSync', function() {
	browserSync.init({
		browser: ['google chrome'],
		server: {
			baseDir: '.'
		}
	});
});
