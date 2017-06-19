var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

gulp.task('sass', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('css', function() {
	return gulp.src(['src/scss/reset.scss', 'src/scss/grid.scss'])
		.pipe(concat('draft.css'))
		.pipe(gulp.dest('./dist/'))
});

gulp.task('nano', function() {
	return gulp.src('./dist/draft.css')
		.pipe(cssnano())
		.pipe(gulp.dest('./dist/draft.min.css'))
});

gulp.task('watch', ['browserSync', 'sass', 'css', 'nano'], function() {
	gulp.watch('src/scss/**/*.scss', ['sass']);
	gulp.watch('./*.html', browserSync.reload);
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: '.'
		}
	});
});
