var  gulp = require('gulp'),
     sass = require('gulp-sass'),
   uglify = require('gulp-uglify'),
   rename = require('gulp-rename'),
 cleancss = require('gulp-clean-css'),
   concat = require('gulp-concat'),
     maps = require('gulp-sourcemaps'),
      del = require('del');

// All sass/scss files and compile to css and save to css.
gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('demo/css'))
});
// Gulp minifys al js files and save to js
gulp.task('compress', function() {
  return gulp.src('src/js/*.js')
    .pipe(maps.init())
    .pipe(uglify())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('demo/js'));
});
// Uglify Plugins
gulp.task('uglifyPlugins', function() {
  return gulp.src(['src/libs/bootstrap/dist/js/bootstrap.js',
    'src/libs/jquery/dist/jquery.js'])
    .pipe(rename({
      suffix: ".min",
      extname: ".js"
    }))
    .pipe(uglify())
    .pipe(gulp.dest('demo/js'));
});
// Minify Plugins CSS
gulp.task('minifyPlugins', function() {
  return gulp.src(['src/libs/bootstrap/dist/css/bootstrap.css'])
  	.pipe(rename({
           suffix: ".min",
           extname: ".css"
  	}))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(gulp.dest('demo/css'));
});
//once built get ready for dispatch

// minify's styles.css styles.min.css
gulp.task("minifyCss", function() {
    return gulp.src('demo/css/styles.css')
    .pipe(cleancss())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('demo/css'));
});
// complies all JS files into one (concat)
gulp.task("concatScripts", function() {
    return gulp.src([
      'demo/js/jquery.min.js',
      'demo/js/bootstrap.min.js'])
    .pipe(concat("plugin.js"))
    .pipe(gulp.dest('demo/js'));
});


// removes all created files to start from scratch
gulp.task("clean", function() {
	del(['dist', 'demo/css/**.css*','demo/js/**.js*']);
});
// Watching files
gulp.task('watchAll', function() {
  gulp.watch("src/js/*.js", ['compress']);
  gulp.watch("src/sass/**/*.scss", ['sass']);
});

// set up project from start
gulp.task("setup", ["clean", "sass",
"compress", "uglifyPlugins", "minifyPlugins", "watchAll"]);

// build dist files
gulp.task("build", ["minifyCss", "concatScripts"], function() {     
  return gulp.src(['demo/css/bootstrap.min.css', 'demo/css/styles.min.css', 'demo/js/plugin.js', 'demo/js/main.js', 'demo/index.html', 'demo/fonts/**', 'demo/img/**'], { base: './'})
  .pipe(gulp.dest('dist')); 
});

