import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
// const babel = require('gulp-babel');

const paths = {
  js: ['./src/**/*.*'],
  source: './src',
  dist: './_dist',
  server_exec: './bin/www',
};

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
  run('clean', 'babel', 'restart', cb);
});

gulp.task('clean', cb => {
  rimraf(paths.dist, cb);
});

// gulp.task('babel', () => {
//   gulp.src(paths.source)
//     .pipe(babel({
//       presets: ['es2015-node'],
//       plugins: ['transform-object-rest-spread'],
//     }))
//     .pipe(gulp.dest(paths.dist));
// });

gulp.task('babel', shell.task([
  `babel -D -q ${paths.source} --out-dir ${paths.dist}`,
]));

let express;
gulp.task('server', () => {
  express = server.new(paths.server_exec);
});

gulp.task('restart', () => {
  express.start.bind(express)();
});

gulp.task('watch', () =>
  watch(paths.source, () => {
    gulp.start('build');
  })
);
