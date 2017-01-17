import Start from 'start';
import reporter from 'start-pretty-reporter';
import env from 'start-env';
import webpack from 'start-webpack';
import files from 'start-files';
import clean from 'start-clean';
import read from 'start-read';
import rename from 'start-rename';
import uglify from 'start-uglify';
import write from 'start-write';
import eslint from 'start-eslint';

const start = Start(reporter());

export const webpackBuild = () => start(
  files('build/'),
  clean(),
  env('NODE_ENV', 'production'),
  webpack(require('./webpack.config.js'))
);

export const minify = () => start(
  files('build/*.js'),
  read(),
  uglify({
    compress: {
      warnings: false
    },
    mangle: true
  }),
  rename((file) => file.replace(/\.js$/, '.min.js')),
  write('build/')
);

export const build = () => start(
  webpackBuild,
  minify
);

export const lint = () => start(
  files([ 'demo/**/*.js?(x)', 'lib/*.js?(x)' ]),
  eslint()
);
