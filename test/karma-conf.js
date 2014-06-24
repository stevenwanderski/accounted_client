module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'app/bower_components/jquery/dist/jquery.min.js',
      'app/bower_components/angular/angular.min.js',
      'app/bower_components/angular-route/angular-route.min.js',
      'app/bower_components/angular-resource/angular-resource.min.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};