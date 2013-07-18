/* Gruntfile.js
 * Grunt workflow for building kick-ass AngularJS applications.
 * @author Calvin Lai <calvin@wunwun.com>
 */


module.exports = function(grunt) {

  // initial grunt configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    templates: {
      main: {
        files: {
          'bower.json'  : 'templates/bower.json.tmpl',
          '.bowerrc'    : 'templates/bowerrc.tmpl',
          '.gitignore'  : 'templates/gitignore.tmpl',
          'Gruntfile.js': 'templates/Gruntfile.js.tmpl',
        }
      }
    },

    // generates an example project in /src
    scaffold: {
      options: {
        test: false
      }
    }

  });

  // load grunt npm modules
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-symlink');



  grunt.registerMultiTask('templates', 'Processes templates', function(dest) {
    var opts = this.options()
      , target = this.target;

    for (var i = 0; i < this.files.length; i++) {
      var file = this.files[i];

      grunt.template.addDelimiters('init', '{%', '%}')

      // use 'init' for process param so we use different delimiters.
      var tmpl = grunt.template.process(grunt.file.read(file.src), {
        data: {},
        delimiters: 'init'
      });

      // write the file
      grunt.log.write("Creating template " + file.dest + " ...\n");

      grunt.file.write(dest + '/' + file.dest, tmpl);
    }

  });


  // generate a new ng-phonegap project
  grunt.registerTask('scaffold', 'Generates a new ng-phonegap project.', function(dest) {

    grunt.log.write("Scaffolding project...\n");

    var opts = this.options()
      , destination = dest ? dest : 'www';

    // create templated files
    grunt.task.run('templates:main:' + dest);

  });


};
