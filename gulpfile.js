const gulp = require('gulp');
const ts = require('gulp-typescript');
const shell = require('gulp-shell');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('dist')).pipe(shell(['mkdir -p dist/src/config/logs/']));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts',['scripts']);
});

gulp.task('default',['watch']);
gulp.task('build',['scripts']);