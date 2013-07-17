/* Gruntfile.js
 * Grunt workflow for building kick-ass AngularJS applications.
 * @author Calvin Lai <calvin@wunwun.com>
 */


module.exports = function(grunt) {

  var _APP_NAME_ = "CHANGE ME IN Gruntfile.js";

  // initial grunt configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    appDir: 'www',
    tmpDir: 'tmp',
    srcDir: 'src',
    bowerDir: 'vendor',
    vendorDir: 'src/js/vendor',
    releaseDir: '<%= appDir %>',

    assets: {
      css: {
        vendor: [

          // Add additional Bower components here
          '<%= bowerDir %>/bootstrap/dist/css/bootstrap.css',
          '<%= bowerDir %>/font-awesome/css/font-awesome.css'

        ],
        // shouldn't need to touch this
        src: [
          '<%= appDir %>/css/vendor.css',
          '<%= appDir %>/css/app.css'
        ]
      },
      js: {
        vendor: [
          // add any Bower components here.
          '<%= bowerDir %>/angular/angular.js',
          '<%= bowerDir %>/angular-route/angular-route.js',
          '<%= bowerDir %>/angular-touch/angular-touch.js'
        ],
        // shouldn't need to touch this.
        src: [
          '<%= appDir %>/js/vendor.js',
          '<%= appDir %>/js/pg.js',
          '<%= appDir %>/js/app.js',
          '<%= appDir %>/js/config.js',
          '<%= appDir %>/js/modules.js',
          '<%= appDir %>/js/directives.js',
          '<%= appDir %>/js/filters.js',
          '<%= appDir %>/js/services.js',
          '<%= appDir %>/js/controllers.js'
        ]
      }
    },

    // concatenate files for angularjs
    concat: {
      vendor: {
        files: {
          '<%= tmpDir %>/css/vendor.css': '<%= assets.css.vendor %>',
          '<%= tmpDir %>/js/vendor.js'  : '<%= assets.js.vendor %>'
        }
      },
      angular: {
        files: {
          '<%= tmpDir %>/js/config.js'      : ['<%= srcDir %>/js/config/*.js'],
          '<%= tmpDir %>/js/modules.js'     : ['<%= srcDir %>/js/modules/*.js', '<%= srcDir %>/js/modules/**/*.js'],
          '<%= tmpDir %>/js/controllers.js' : ['<%= srcDir %>/js/controllers/*.js', '<%= srcDir %>/js/controllers/**/*.js'],
          '<%= tmpDir %>/js/directives.js'  : ['<%= srcDir %>/js/directives/*.js', '<%= srcDir %>/js/directives/**/*.js'],
          '<%= tmpDir %>/js/filters.js'     : ['<%= srcDir %>/js/filters/*.js', '<%= srcDir %>/js/filters/**/*.js'],
          '<%= tmpDir %>/js/modules.js'     : ['<%= srcDir %>/js/modules/*.js', '<%= srcDir %>/js/modules/**/*.js'],
          '<%= tmpDir %>/js/services.js'    : ['<%= srcDir %>/js/services/*.js', '<%= srcDir %>/js/services/**/*.js']
        }
      },
      production: {
        files: {
          '<%= appDir %>/js/application.js': [
            '<%= tmpDir %>/js/production.js',
            '<%= tmpDir %>/js/vendor.js',
            '<%= tmpDir %>/js/pg.js',
            '<%= tmpDir %>/js/app.js',
            '<%= tmpDir %>/js/config.js',
            '<%= tmpDir %>/js/modules.js',
            '<%= tmpDir %>/js/directives.js',
            '<%= tmpDir %>/js/filters.js',
            '<%= tmpDir %>/js/services.js',
            '<%= tmpDir %>/js/controllers.js'
          ]
        }
      }
    },

    // for cleaning builds before re-building
    clean: {
      options: {
        force: true
      },
      tmp: {
        src: ['<%= tmpDir %>'],
      },
      development: {
        src: ['<%= tmpDir %>', '<%= appDir %>']
      },
      production: {
        src: ['<%= tmpDir %>', '<%= releaseDir %>']
      },
      css: {
        src: ['<%= appDir %>/css']
      },
      js: {
        src: ['<%= appDir %>/js']
      },
      img: {
        src: ['<%= appDir %>/img']
      },
      img: {
        src: ['<%= appDir %>/font']
      },
      partials: {
        src: ['<%= appDir %>/html/partials']
      }
    },

    copy: {
      config: {
        files: [
          { src: '<%= srcDir %>/js/config/application.js', dest: '<%= tmpDir %>/js/config/application.js' },
          { src: '<%= srcDir %>/js/app.js', dest: '<%= tmpDir %>/js/app.js' },
          { src: '<%= srcDir %>/js/pg.js', dest: '<%= tmpDir %>/js/pg.js' },
          { src: '<%= srcDir %>/config.xml', dest: '<%= appDir %>/config.xml' }
        ]
      },
      vendor: {
        files: [
          { src: '<%= tmpDir %>/css/vendor.css', dest: '<%= appDir %>/css/vendor.css' },
          { src: '<%= tmpDir %>/js/vendor.js', dest: '<%= appDir %>/js/vendor.js' }
        ]
      },
      img: {
        files: [
          { expand: true, cwd: '<%= srcDir %>/img/', src: ['**'], dest: '<%= appDir %>/img/' }
        ]
      },
      partials: {
        files: [
          { expand: true, cwd: '<%= srcDir %>/html/partials/', src: ['**'], dest: '<%= appDir %>/html/partials/' }
        ]
      },
      fonts: {
        files: [
          { expand: true, cwd: '<%= bowerDir %>/font-awesome/font/', src: ['**'], dest: '<%= appDir %>/font/' }
        ]
      },
      tmp_to_build: {
        files: [
          { expand: true, cwd: '<%= tmpDir %>/js/', src: ['*'], dest: '<%= appDir %>/js/' }
        ]
      },
      development: {
        files: [
          { src: '<%= srcDir %>/js/config/environments/development.js', dest: '<%= appDir %>/js/config/development.js' }
        ]
      },
      production: {
        files: [
          { src: '<%= srcDir %>/js/config/environments/production.js', dest: '<%= tmpDir %>/js/production.js' }
        ]
      }
    },

    // compile LESS files into CSS and store them in temp directories
    less: {
      options: {
        paths: [
          // add any additional paths to LESS components here
          "<%= bowerDir %>/lesshat",
          "<%= srcDir %>/css/config"
        ]
      },
      development: {
        files: {
          // put app.css directly into the build directory for development
          "<%= appDir %>/css/app.css": [
            "<%= srcDir %>/css/common/*.less",
            "<%= srcDir %>/css/*.less"
          ]
        }
      },
      production: {
        files: {
          // put app.css in tmp dir in production, so we can run cssmin on it after
          "<%= tmpDir %>/css/app.css": [
            "<%= srcDir %>/css/common/*.less",
            "<%= srcDir %>/css/*.less"
          ]
        }
      }
    },

    // ngmin for pre-minifying AngularJS apps
    ngmin: {
      routers: {
        src: '<%= tmpDir %>/js/config/router.js',
        dest: '<%= tmpDir %>/js/config/router.js'
      },
      controllers: {
        src: '<%= tmpDir %>/js/controllers.js',
        dest: '<%= tmpDir %>/js/controllers.js'
      },
      directives: {
        src: '<%= tmpDir %>/js/directives.js',
        dest: '<%= tmpDir %>/js/directives.js'
      },
      modules: {
        src: '<%= tmpDir %>/js/modules.js',
        dest: '<%= tmpDir %>/js/modules.js'
      },
      filters: {
        src: '<%= tmpDir %>/js/filters.js',
        dest: '<%= tmpDir %>/js/filters.js'
      },
      services: {
        src: '<%= tmpDir %>/js/services.js',
        dest: '<%= tmpDir %>/js/services.js'
      },
      vendor: {
        src: '<%= tmpDir %>/js/vendor.js',
        dest: '<%= tmpDir %>/js/vendor.js'
      }
    },

    // uglify js for production
    uglify: {
      production: {
        files: {
          '<%= appDir %>/js/application.js': [
            '<%= appDir %>/js/application.js'
          ]
        }
      },
    },

    // minify css for production
    cssmin: {
      production: {
        files: {
          '<%= appDir %>/css/app.css': [
            '<%= tmpDir %>/css/vendor.css',
            '<%= tmpDir %>/css/app.css'
          ],
        }
      }
    },

    // watch files, build on the fly for development
    watch: {
      root: {
        files: ['<%= srcDir %>/*'],
        tasks: ['copy:config']
      },
      scripts: {
        files: ['<%= srcDir %>/js/**','<%= srcDir %>/js/*'],
        tasks: [
          'clean:js', 'concat:angular', 'concat:vendor',
          'copy:development', 'copy:config', 'copy:vendor',
          'copy:tmp_to_build'
        ]
      },
      less: {
        files: [
          '<%= srcDir %>/css/*.less',
          '<%= srcDir %>/css/**/*.less'
        ],
        tasks: [
          'clean:css', 'concat:vendor', 'copy:vendor',
          'less:development'
        ]
      },
      img: {
        files: ['<%= srcDir %>/img/**'],
        tasks: ['clean:img', 'copy:img']
      },
      fonts: {
        files: ['<%= srcDir %>/font/**'],
        tasks: ['clean:fonts', 'copy:fonts']
      },
      partials: {
        files: ['<%= srcDir %>/html/partials/**'],
        tasks: ['clean:partials', 'copy:partials']
      },
      layouts: {
        files: ['<%= srcDir %>/html/layouts/**'],
        tasks: ['layouts:development']
      }
    },

    layouts: {
      options: {
        layout: '<%= srcDir %>/html/layouts/application.tmpl',
      },
      development: {
        options: {
          dest: '<%= appDir %>/index.html'
        },
        files: {
          css: '<%= assets.css.src %>',
          js: '<%= assets.js.src %>'
        }
      },
      production: {
        options: {
          dest: '<%= releaseDir %>/index.html'
        },
        files: {
          css: '<%= assets.css.src %>',
          js: '<%= assets.js.src %>'
        }
      }
    },


    config: {
      options: {
        template: '<%= srcDir %>/config.xml.tmpl',
        dest: '<%= appDir %>/config.xml'
      },
      enterprise: {},
      production: {},
      development: {}
    },


    // main build task (custom) with options
    // this task also builds out the main index.html
    // file based on templates, which are environment-aware
    build: {
      development: {},
      production: {},
      enterprise: {}
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
  grunt.loadNpmTasks('grunt-shell');


  // build HTML files based on target
  grunt.registerMultiTask('layouts', 'Builds an HTML file for angular.', function() {

    var opts = this.options()
      , target = this.target
      , css = this.files[0].src
      , js = this.files[1].src
      , layout = grunt.template.process(grunt.file.read(opts.layout), {
          data: { env: target, js: js, css: css, appName: _APP_NAME_ }
        });

    // generate main index.html file
    grunt.file.write(opts.dest, layout);
    grunt.log.write('Generating ' + opts.dest + '...').ok();

  });


  grunt.registerMultiTask('config', 'Builds the Cordova configuration file from template.', function() {

    var opts = this.options()
      , target = this.target
      , version = this.args[0] || '';

    var template = grunt.template.process(grunt.file.read(opts.template), {
          data: { target: target, appName: _APP_NAME_ }
        });

    // generate main index.html file
    grunt.file.write(opts.dest, template);
    grunt.log.write('Generating ' + opts.dest + '...').ok();

  });


  // task for building main index page based on environment
  grunt.registerMultiTask('build', 'Build the app based on environment.', function() {

    var opts = this.options()
      , target = this.target
      , env = target
      , args = this.args
      , version = args[0];

    if (target == 'enterprise') {
      env = 'production';
    }

    // clean up directories
    grunt.task.run('clean:' + env);

    // build all less files based on environment
    grunt.task.run('less:' + env);

    // concat angular files
    grunt.task.run('concat:angular');

    // use ngmin to pre-minify angular files
    grunt.task.run('ngmin');

    // concat vendor libs
    grunt.task.run('concat:vendor');

    // copy all files
    grunt.task.run('copy:' + env);
    grunt.task.run('copy:config');
    grunt.task.run('copy:partials');
    grunt.task.run('copy:img');
    grunt.task.run('copy:fonts');

    // copy tmp files to development
    if (target == 'development') {
      grunt.task.run('copy:vendor');
      grunt.task.run('copy:tmp_to_build');
    }

    if (target == 'production' || target == 'enterprise') {
      // concat all angular files into a single file
      grunt.task.run('concat:production');
      grunt.task.run('uglify:production');
      grunt.task.run('cssmin:production');
    }

    // build cordova config.xml file, uses target so we
    // can switch from production to enterprise for bundle ID
    grunt.task.run('config:' + target);

    // build main index.html file last
    grunt.task.run('layouts:' + env);

  });

};

