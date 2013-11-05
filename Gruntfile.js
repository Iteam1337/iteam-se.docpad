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
          "src/scripts/revolutnet/revolunet-collection-manager.js",
          "src/scripts/revolutnet/revolunet-angular-carousel.js",
          "src/scripts/revolutnet/revolunet-angular-carousel-indicators.js",
          "src/scripts/revolutnet/revolunet-angular-carousel-image-carousel.js",
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
          'src/files/content/vendor/angular-mobile.js',
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
          "<%= outPath %>content/styles/<%= pkg.name %>.css": [
            "src/styles/general.css.styl",
            "src/styles/style.css.styl",
            "src/styles/animation.css.styl",
            "src/styles/blog.css.styl",
            "src/styles/cases.css.styl",
            "src/styles/coworkers.css.styl",
            "src/styles/page.css.styl",
            "src/styles/*.css.styl",
            "src/styles/ipad.css.styl",
            "src/styles/iphone.css.styl"
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
            'src/scripts/revolutnet/angular-carousel.css',
            '!*.min.css'
          ]
        }
      }
    },
    shell: {
      docpad: {
        options: {
          stdout: true
        },
        command: "docpad generate --env static"
      },
      preparedeploy: {
        options: {
          stdout: true
        },
        command: "bash preparedeploy.sh"
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
      },
      release: {
        files: [
          {
            expand: true,
            cwd: "<%=outPath%>",
            src: ["**"],
            dest: "/Volumes/guld/iteam.se"
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
    },

    aws: grunt.file.readJSON('aws.json'),

    s3: {
      options: {
        key:    '<%= aws.key %>',
        secret: '<%= aws.secret %>',
        access: 'public-read',
        region: 'eu-west-1',
        gzip: true,
        maxOperations: 20,
        headers: {
          'Cache-Control': 'public, max-age=' + 60 * 60 * 24 * 30 // 30 days
        }
      },
      test: {
        options: {
          bucket: 'www.iteam.se',
        },
        upload: [
          {
            src: 'out/**/*',
            dest: '/',
            rel: 'out'
          },
        ],
      },
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-s3');

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

  grunt.registerTask('deploy', [
    'shell:docpad',
    's3'
  ]);
};