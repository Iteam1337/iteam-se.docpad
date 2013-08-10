module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    outPath: (grunt.file.readJSON('config.json').outPath + "/"),

    // Concats the js files into a single include
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd HH:mm") %> */\n'
      },
      dist: {
        dest: '<%= outPath %>content/scripts/<%= pkg.name %>.js',
        src: [
          'src/documents/content/scripts/**/*.js'
        ]
      },
      vendor: {
        dest: '<%= outPath %>content/scripts/vendor.js',
        src: [
          'src/files/content/vendor/*.js',
          'src/files/content/vendor/twitter-bootstrap/js/bootstrap.js'
        ]
      }
    },

    // Minifies the jsfiles
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%= outPath %>content/scripts/all.min.js': [
            '<%= concat.vendor.dest %>',
            '<%= concat.dist.dest %>'
          ]
        }
      }
    },

    stylus: {
      options: {
        banner: '/* <%= pkg.name %>.css */ \n'
      },
      compile: {
        files: {
          '<%= outPath %>content/styles/<%= pkg.name %>.css': [
            'src/documents/content/styles/*.css.styl'
          ]
        }
      }
    },

    // Minify vendor css
    cssmin: {
      add_banner: {
        options: {
          banner: '/* vendor.css */ \n'
        },
        files: {
          '<%= outPath %>content/styles/vendor.css': [
            'src/documents/content/styles/*.css',
            'src/files/content/vendor/twitter-bootstrap/css/bootstrap.css',
            'src/files/content/vendor/twitter-bootstrap/css/bootstrap-responsive.css',
            '!*.min.css'
          ]
        }
      }
    },

    //
    // Generate angular-templates
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: grunt.file.expandMapping(['**/*.jade'], "<%= outPath %>content/partials/", {
          cwd: "src/angular_partials/",
          rename: function(destBase, destPath) {
            return destBase + destPath.replace(/\.jade$/, '.html');
          }
        })
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Default task(s).
  grunt.registerTask('default', [
    'concat',
    'uglify',
    'stylus',
    'cssmin',
    'jade'
  ]);

};