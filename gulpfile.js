/* Build script for jacobshack */

var gulp = require("gulp");
var minifyCSS = require("gulp-minify-css");
var path = require("path");
var fs = require("fs");
var minifyHTML = require("gulp-minify-html");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var compass = require('gulp-compass');
var merge = require('merge-stream');
var gutil = require("gulp-util");

// make build directory
var paths = {
    styles: {
        src: './stylesheets/scss/*.scss',
        config: './config.rb',
        output: './dist/stylesheets/'
    },
    assets: {
        images: {
            src: [ 
                './assets/images/**/*.gif', // GIFs
                './assets/images/**/*.jpg', // JPGs
                './assets/images/**/*.png', // PNGs 
                './assets/images/**/*.svg' // SVGs
            ],
            output: './dist/assets/images/'
        },
        pdf: {
            src: './*.pdf',
            output: './dist/'                
        }
    },
    html: {
        src: './*.html',
        output: './dist/'
    },
    js: {
        src: './js/**/*.js',
        output: './dist/js'
    }
};

// remove build dir if it already exists
fs.exists(__dirname + '/dist', (exists)=>{
    if(exists){
        fs.rmdir(__dirname + '/', (st)=>{
            //
        })
    }
});

gulp.task('compass', function() {
  gulp.src(paths.styles.src)
    .pipe(compass({
      config_file: paths.styles.config,
      css: 'dist/stylesheets',
      sass: 'stylesheets/scss'
    }))
    // .on('error', gutil.log)
    .pipe(gulp.dest(paths.styles.output));
});

gulp.task('html', function() {
    return gulp.src(paths.html.src)
                .pipe(minifyHTML())
                .pipe(gulp.dest(paths.html.output))
});

gulp.task('compilePdf', function(){
    /* This task simply copys all pdf files */ 
    return gulp.src(paths.assets.pdf.src)
        .pipe(gulp.dest(paths.assets.pdf.output))
})

gulp.task('compileJS', function(){
    return gulp.src(paths.js.src)
           .pipe(uglify())
           .pipe(gulp.dest(paths.js.output))
})

gulp.task('images', function(){
    var tasks = paths.assets.images.src.map(elem => {
        return gulp.src(elem, {base: './assets/images'})
            .pipe(imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 5,
                removeViewBox: true
            }))
            .pipe(gulp.dest(paths.assets.images.output))
    });
    return merge(tasks);
});

gulp.task('default',['compass', 'compilePdf', 'compileJS', 'html', 'images'],function(){
   // default gulp tasks
});