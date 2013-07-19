module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concats the js files into a single include
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd HH:mm") %> */\n'
      },
      dist: {
        src: [
          'src/documents/scripts/app.js',
          'src/documents/scripts/controllers/*.js'
        ],
        dest: 'out/scripts/<%= pkg.name %>.js'
      },
      vendor: {
        src: ['src/files/vendor/*.js'],
        dest: 'out/scripts/vendor.js'
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
          'out/scripts/all.min.js': ['<%= concat.vendor.dest %>', '<%= concat.dist.dest %>']
        }
      }
    },

    stylus: {
      options: {
        banner: '/* <%= pkg.name %>.css */ \n'
      },
      compile: {
        files: {
          'out/styles/<%= pkg.name %>.css':[
            'src/documents/styles/*.css.styl'
          ]
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'stylus']);

};