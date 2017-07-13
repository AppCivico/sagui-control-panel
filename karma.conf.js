// https://github.com/Nikku/karma-browserify
module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'browserify'],
    files: [
    	'node_modules/babel-polyfill/dist/polyfill.js',
    	'_source/javascript/spec/unit/**/*.js'
    ],
    reporters: ['nyan'],
    preprocessors: {
      '_source/javascript/spec/unit/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      // needed to enable mocks
      plugin: [require('proxyquireify').plugin]
    },
    // if you want to continuously re-run tests on file-save,
    // replace the following line with `autoWatch: true`
    //singleRun: true,
    autoWatch: true
  })
}
