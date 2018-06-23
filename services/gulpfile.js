var gulp = require('gulp'),
    execSync = require('child_process').execSync,
    replace = require('gulp-replace'),
    runSequence = require('run-sequence'),
    minimist = require('minimist');

/* use replace task with parameters in run-sequense and delete prepare:package & clean:package task */
gulp.task('replace', function() {
    options = minimist(process.argv.slice(2));
    console.log(options)
  return gulp.src(String(options.f), { base: './' })
    .pipe(replace(String(options.s), String(options.r)))
    .pipe(gulp.dest('./'));
});

gulp.task('prepare:package',function(){
     return gulp.src(["./package.json"])
    .pipe(replace(new RegExp('dependencies'), 'peerDependencies'))
    .pipe(gulp.dest('./'))
})

gulp.task('clean:package',function(){
  return gulp.src(["./package.json"])
    .pipe(replace(new RegExp('peerDependencies'), 'dependencies'))
    .pipe(gulp.dest('./'))  
})

gulp.task('compile:core',function(){
    return execSync('npm run compile --quite',{maxBuffer: 1024 * 1500}, function(err, stdout) {
            //console.log(stdout);
            if (err)
                console.log(err);
        })
})
gulp.task('build:core',[],function(){
    return gulp.start('compile:core')
})

gulp.task("default", function() {
    runSequence('prepare:package', 'compile:core','clean:package');
    //runSequence('copy','sass','css:merge');
});