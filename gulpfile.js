var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    Config = require('./gulpfile.config'),
    angularFilesort = require('gulp-angular-filesort'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    gulpConfig = new Config();


gulp.task('clean', function(cb){
    del(['dist'], cb);
});

gulp.task('build',['clean', 'compile:js','compile:css'], function(){
    return gulp.src(gulpConfig.jsFilePath);
});

gulp.task('watch', function() {
    var files = [
          gulpConfig.typeScriptSourceFiles,
          gulpConfig.cssPath
    ];
    gulp.watch(files, ['build']);
});


gulp.task('compile:js',['compile:ts','compile:tcache'], function () {
    return gulp
            .src(gulpConfig.jsFilePath)
            .pipe(angularFilesort())
            //.pipe(uglify())
            .pipe(concat(gulpConfig.outputFile))            
            .pipe(gulp.dest(gulpConfig.outputPath));                
});

gulp.task('compile:ts', function(){
    var sourceFiles = [
        gulpConfig.typeScriptSourceFiles,
        gulpConfig.libraryTypeScriptDefinitions
    ];
    return gulp.src(sourceFiles)
        .pipe(ts({
            noImplicitAny: true
           }))
        .pipe(gulp.dest(gulpConfig.outputPath));
});

gulp.task('compile:tcache', function(){
    console.log('Module : ' + gulpConfig.moduleName);
    return gulp.src(gulpConfig.templatePath)
            .pipe(templateCache({
                root : 'src/',
                module : gulpConfig.moduleName
            }))
            .pipe(gulp.dest(gulpConfig.outputPath));       
});

gulp.task('compile:css', function(){
    console.log('CSS Module : ' + gulpConfig.cssPath);
    return gulp.src(gulpConfig.cssPath)
            .pipe(minifyCss())
            .pipe(gulp.dest(gulpConfig.outputPath)); 
});