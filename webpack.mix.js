const mix = require('laravel-mix');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

mix.js('src/js/app.js', 'public/js')
   .sass('src/scss/app.scss', 'public/css')
   .setPublicPath('public')
   .sourceMaps()
   .webpackConfig({
       plugins: [
           new BrowserSyncPlugin({
               host: 'localhost',
               port: 3000,
               proxy: 'http://localhost:8080/',
               files: [
                   'public/js/*.js',
                   'public/css/*.css',
                   'public/*.html'
               ]
           })
       ]
   });
