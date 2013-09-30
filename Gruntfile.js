module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    outPath: (grunt.file.readJSON('config.json').outPath + "/"),
    outBuildPath: (grunt.file.readJSON('config.json').outBuildPath + "/"),

    clean :{
      out : ['<%= outPath%>/content/styles', '<%= outPath %>/content/scripts', '<%= outPath %>/content/partials',]
    },
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
          "src/scripts/config/*.js",
          "src/scripts/factory/*.js",
          "src/scripts/directives/*.js",
          "src/scripts/app.js",
          "src/scripts/controllers/*.js",
          "src/scripts/**/*.js"
        ]
      },
      vendor: {
        dest: '<%= outPath %>content/scripts/vendor.js',
        src: [
          'src/files/content/vendor/_angular.js',
          'src/files/content/vendor/jquery.js',
          'src/files/content/vendor/*.js',
          'src/files/content/vendor/twitter-bootstrap/js/bootstrap.js',
          'src/files/content/vendor/twitter-lightbox/bootstrap-lightbox.js'
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
          "<%= outPath %>content/styles/<%= pkg.name %>.css": [
            "src/styles/general.css.styl",
            "src/styles/style.css.styl",
            "src/styles/animation.css.styl",
            "src/styles/blog.css.styl",
            "src/styles/cases.css.styl",
            "src/styles/coworkers.css.styl",
            "src/styles/page.css.styl",
            "src/styles/*.css.styl",
            "src/styles/responsive.css.styl"
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
            'src/files/content/vendor/twitter-bootstrap/css/bootstrap.css',
            'src/files/content/vendor/twitter-bootstrap/css/bootstrap-responsive.css',
            '!*.min.css'
          ]
        }
      }
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "<%=outPath%>",
            src: ["**"],
            dest: "<%= outBuildPath %>/"
          }
        ]
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
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', [
    'concat',
    'uglify',
    'stylus',
    'cssmin',
    'jade'
  ]);

  // Default task(s).
  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify',
    'stylus',
    'cssmin',
    'jade',
    'copy'
  ]);


};