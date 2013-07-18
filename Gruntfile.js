/* Gruntfile.js
 * Grunt workflow for building kick-ass AngularJS applications.
 * @author Calvin Lai <calvin@wunwun.com>
 */


module.exports = function(grunt) {

  // initial grunt configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    buildDir: 'build',
    releaseDir: 'release',
    builtResourcesDir: 'builtResources',
    srcDir: 'src',
    tmpDir: 'tmp',

    assets: {
      development: {
        css: {
          // place all vendor CSS here (via Bower)
          vendor: [
            '<%= srcDir %>/components/angular-ui/build/angular-ui.css',
            '<%= srcDir %>/components/font-awesome/build/assets/font-awesome/css/font-awesome.css',
            '<%= srcDir %>/components/font-awesome/build/assets/font-awesome/css/font-awesome-ie7.css'
          ],
          // leave this alone
          src: [
            '<%= buildDir %>/css/vendor.css',
            '<%= buildDir %>/css/app.css'
          ]
        },
        js: {
          // vendor
          vendor: [
            // cordova
            '<%= srcDir %>/vendor/js/lib/cordova.js',

            // phonegap/native plugins
            '<%= srcDir %>/vendor/js/plugins/PushNotification.js',

            // add any Bower components here.
            '<%= srcDir %>/components/lodash/lodash.js',
            '<%= srcDir %>/components/angular/angular.js',
            '<%= srcDir %>/components/angular-cookies/angular-cookies.js',
            '<%= srcDir %>/components/angular-resource/angular-resource.js',
            '<%= srcDir %>/components/angular-localstorage/localStorageModule.js',
            '<%= srcDir %>/components/Swipe/swipe.js'
          ],
          src: [
            '<%= buildDir %>/js/vendor.js',
            '<%= buildDir %>/js/config/application.js',
            '<%= buildDir %>/js/config/development.js',
            '<%= buildDir %>/js/pg.js',
            '<%= buildDir %>/js/config/routes.js',
            '<%= buildDir %>/js/modules.js',
            '<%= buildDir %>/js/directives.js',
            '<%= buildDir %>/js/filters.js',
            '<%= buildDir %>/js/services.js',
            '<%= buildDir %>/js/controllers.js'
          ]
        }
      },
      production: {
        css: [
          '<%= srcDir %>/components/angular-ui/build/angular-ui.css',
          '<%= builtResourcesDir %>/css/bootstrap.css',
          '<%= srcDir %>/components/font-awesome/build/assets/font-awesome/css/font-awesome.css',
          '<%= srcDir %>/components/font-awesome/build/assets/font-awesome/css/font-awesome-ie7.css',
          '<%= tmpDir %>/css/app.css'
        ],
        js: [

          // cordova
          '<%= srcDir %>/vendor/js/lib/cordova.js',

          // phonegap/native plugins
          '<%= srcDir %>/vendor/js/plugins/PushNotification.js',

          // add any Bower components here.
          '<%= srcDir %>/components/lodash/lodash.js',
          '<%= srcDir %>/components/angular/angular.js',
          '<%= srcDir %>/components/angular-cookies/angular-cookies.js',
          '<%= srcDir %>/components/angular-resource/angular-resource.js',
          '<%= srcDir %>/components/angular-localstorage/localStorageModule.js',
          '<%= srcDir %>/components/Swipe/swipe.js'

          // leave these alone
          '<%= tmpDir %>/js/config/application.js',
          '<%= tmpDir %>/js/config/production.js',
          '<%= tmpDir %>/js/pg.js',
          '<%= tmpDir %>/js/config/routes.js',
          '<%= tmpDir %>/js/modules.js',
          '<%= tmpDir %>/js/directives.js',
          '<%= tmpDir %>/js/filters.js',
          '<%= tmpDir %>/js/services.js',
          '<%= tmpDir %>/js/controllers.js'
        ]
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
        src: ['<%= tmpDir %>', '<%= buildDir %>']
      },
      production: {
        src: ['<%= tmpDir %>', '<%= releaseDir %>']
      },
      css: {
        src: ['<%= buildDir %>/css']
      },
      js: {
        src: ['<%= buildDir %>/js']
      },
      img: {
        src: ['<%= buildDir %>/img']
      },
      partials: {
        src: ['<%= buildDir %>/js/partials']
      }
    },

    copy: {
      img: {
        files: [
          { expand: true, cwd: '<%= srcDir %>/img/', src: ['**'], dest: '<%= buildDir %>/img/' }
        ]
      },
      partials: {
        files: [
          { expand: true, cwd: '<%= srcDir %>/html/partials/', src: ['**'], dest: '<%= buildDir %>/js/partials/' },
        ]
      },
      development: {
        files: [
          { src: '<%= tmpDir %>/css/vendor.css', dest: '<%= buildDir %>/css/vendor.css' },
          { src: '<%= tmpDir %>/js/vendor.js', dest: '<%= buildDir %>/js/vendor.js' },
          { expand: true, cwd: '<%= srcDir %>/js/', src: ['*.js'], dest: '<%= tmpDir %>/js/' },
          { expand: true, cwd: '<%= srcDir %>/js/config', src: ['*.js', '!production.js'], dest: '<%= tmpDir %>/js/config' },
          { expand: true, cwd: '<%= srcDir %>/html/partials/', src: ['**'], dest: '<%= buildDir %>/js/partials/' },
          { expand: true, cwd: '<%= srcDir %>/components/font-awesome/build/assets/font-awesome/font/', src: ['**'], dest: '<%= buildDir %>/font/' }
        ]
      },
      production: {
        files: [
          { expand: true, cwd: '<%= srcDir %>/img/', src: ['**'], dest: '<%= releaseDir %>/img/' },
          { expand: true, cwd: '<%= srcDir %>/js/', src: ['*.js'], dest: '<%= tmpDir %>/js/' },
          { expand: true, cwd: '<%= srcDir %>/js/config', src: ['*.js', '!development.js'], dest: '<%= tmpDir %>/js/config' },
          { expand: true, cwd: '<%= srcDir %>/html/partials/', src: ['**'], dest: '<%= releaseDir %>/js/partials/' },
          { expand: true, cwd: '<%= srcDir %>/components/font-awesome/build/assets/font-awesome/font/', src: ['**'], dest: '<%= releaseDir %>/font/' }
        ]
      },
      tmp_to_build: {
        files: [
          { expand: true, cwd: '<%= tmpDir %>/js/', src: ['**'], dest: '<%= buildDir %>/js/' }
        ]
      }
    },

    sass: {
      foundation: {
        files: {
          "<%= builtResourcesDir %>/css/foundation.css": "<%= srcDir %>/components/foundation/scss/foundation.scss"
        }
      }
    },

    // compile LESS files into CSS and store them in temp directories
    less: {
      options: {
        paths: [
          // add any additional paths to LESS components here
          "<%= srcDir %>/components/lesshat",
          "<%= srcDir %>/css/config"
        ]
      },
      development: {
        files: {
          // put app.css directly into the build directory for development
          "<%= buildDir %>/css/app.css": [
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

    // concatenate files for angularjs
    concat: {
      vendor: {
        files: {
          '<%= tmpDir %>/css/vendor.css': '<%= assets.development.css.vendor %>',
          '<%= tmpDir %>/js/vendor.js'  : '<%= assets.development.js.vendor %>'
        }
      },
      angular: {
        options: {
          banner: "'use strict';\n\n"
        },
        files: {
          '<%= tmpDir %>/js/modules.js'    : '<%= srcDir %>/js/modules/*.js',
          '<%= tmpDir %>/js/controllers.js': '<%= srcDir %>/js/controllers/*.js',
          '<%= tmpDir %>/js/directives.js' : ['<%= srcDir %>/js/directives/*.js', '<%= srcDir %>/js/directives/**/*.js'],
          '<%= tmpDir %>/js/filters.js'    : '<%= srcDir %>/js/filters/*.js',
          '<%= tmpDir %>/js/services.js'   : '<%= srcDir %>/js/services/*.js'
        }
      },
      production: {
        files: {
          '<%= releaseDir %>/css/app.css': '<%= assets.production.css %>',
          '<%= releaseDir %>/js/app.js': '<%= assets.production.js %>'
        }
      }
    },

    // ngmin for pre-minifying AngularJS apps
    ngmin: {
      routers: {
        src: '<%= tmpDir %>/js/routers.js',
        dest: '<%= tmpDir %>/js/routers.js'
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
      }
    },

    // uglify js for production
    uglify: {
      production: {
        files: {
          '<%= releaseDir %>/js/app.js': '<%= releaseDir %>/js/app.js'
        }
      },
    },

    // minify css for production
    cssmin: {
      production: {
        files: {
          '<%= releaseDir %>/css/app.css': [
            '<%= builtResourcesDir %>/css/foundation.css',
            '<%= releaseDir %>/css/app.css'
          ],
        }
      }
    },

    // watch files, build on the fly for development
    watch: {
      scripts: {
        files: ['<%= srcDir %>/js/**','<%= srcDir %>/js/*'],
        tasks: ['build:development']
      },
      less: {
        files: [
          '<%= srcDir %>/css/**/*.less'
        ],
        tasks: ['build:development']
      },
      img: {
        files: ['<%= srcDir %>/img/**'],
        tasks: ['build:development']
      },
      partials: {
        files: ['<%= srcDir %>/html/partials/**'],
        tasks: ['build:development']
      },
      tmpl: {
        files: ['<%= srcDir %>/html/*.tmpl'],
        tasks: ['build:development']
      }
    },

    buildIndex: {
      options: {
        layout: '<%= srcDir %>/html/layout.tmpl',
      },
      development: {
        options: {
          dest: '<%= buildDir %>/index.html'
        },
        files: {
          css: '<%= assets.development.css.src %>',
          js: '<%= assets.development.js.src %>'
        }
      },
      production: {
        options: {
          dest: '<%= releaseDir %>/index.html'
        },
        files: {
          css: '<%= assets.production.css %>',
          js: '<%= assets.production.js %>'
        }
      }
    },

    // main build task (custom) with options
    // this task also builds out the main index.html
    // file based on templates, which are environment-aware
    build: {
      development: {},
      production: {}
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


  // build HTML files based on target
  grunt.registerMultiTask('buildIndex', 'Builds an HTML file for angular.', function() {

    var opts = this.options()
      , target = this.target
      , css = this.files[0].src
      , js = this.files[1].src
      , layout = grunt.template.process(grunt.file.read(opts.layout), {
          data: { env: target, js: js, css: css }
        });

    // generate main index.html file
    grunt.file.write(opts.dest, header + footer);
    grunt.log.write('Generating ' + opts.dest + '...').ok();

  });


  // task for building main index page based on environment
  grunt.registerMultiTask('build', 'Build the app based on environment.', function() {

    var opts = this.options()
      , target = this.target;

    // clean up directories
    grunt.task.run('clean:' + target);

    // build all less files based on environment
    grunt.task.run('less:' + target);

    // concat angular files
    grunt.task.run('concat:angular');

    // use ngmin to pre-minify angular files
    grunt.task.run('ngmin');

    // concat vendor libs
    grunt.task.run('concat:vendor');

    // copy all files
    grunt.task.run('copy:' + target);
    grunt.task.run('copy:partials');
    grunt.task.run('copy:img');

    // copy tmp files to development
    if (target == 'development') {
      grunt.task.run('copy:tmp_to_build');
    }

    if (target == 'production') {
      // concat all angular files into a single file
      grunt.task.run('concat:production');
      grunt.task.run('uglify:production');
      grunt.task.run('cssmin:production');
    }

    // build main index.html file last
    grunt.task.run('buildIndex:' + target);

  });

