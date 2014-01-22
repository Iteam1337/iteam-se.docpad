module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    outPath: './out/',

    clean :{
      out : ['<%= outPath%>']
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
          "src/scripts/**/*.js"
        ]
      },
      vendor: {
        dest: '<%= outPath %>content/scripts/vendor.js',
        src: [
          'src/files/content/vendor/jquery.js',
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
            "src/**/*.css.styl"
          ]
        }
      }
    },

    imagemin: {
      main:{
        files: [{
          expand: true, cwd:'out/',
          src:['**/{*.png,*.jpg}'],
          dest: 'out/'
        }]
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
    shell: {
      docpad: {
        options: {
          stdout: true,
          failOnError: true,
        },
        command: "docpad generate --env static"
      }
    },

    aws: grunt.file.readJSON('aws.json'),

    s3: {
      options: {
        key:    process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        access: 'public-read',
        region: 'eu-west-1',
        gzip: true,
        gzipExclude: ['.jpg', '.png', '.jpeg', '.JPG', '.PNG'],
        maxOperations: 20,
        headers: {
          'Cache-Control': 'public, max-age=' + 60 * 60 * 24 * 30 // 30 days
        }
      },
      production: {
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
      stage: {
        options: {
          bucket: 'stage.iteam.se'
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

    invalidate_cloudfront: {
      options: {
        key:    process.env.AWS_ACCESS_KEY_ID,
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        distribution: '<%= aws && aws.cloudfrontDistribution %>',
      },
      production: {
        files: [{
          expand: true,
          cwd: './out/',
          src: ['**/*'],
          filter: 'isFile',
          dest: ''
        }]
      }
    },

    manifest: {
      generate: {
        options: {
          //network: ['*', 'https://*'],
          preferOnline: true,
          verbose: true,
          timestamp: true,
          basePath: 'out',
        },
        src: [
          'content/scripts/iteamse.js',
          'content/scripts/vendor.js',
          'content/styles/*.css',
          'content/images/svg/*.svg',
          'content/fonts/*.*',
        ],
        dest: 'out/application.appcache'
      }
    },

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-invalidate-cloudfront');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', [
    'concat',
    'uglify',
    'stylus',
    'cssmin',
  ]);

  // Default task(s).
  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify',
    'stylus',
    'cssmin'
  ]);

  grunt.registerTask('dist', [
    'clean',
    'shell:docpad',
    'concat',
    'imagemin',
    'uglify',
    'stylus',
    'manifest'
  ]);

  grunt.registerTask('deploy:production', [
    'dist',
    's3:production'
  ]);

  grunt.registerTask('deploy:stage', [
    'dist',
    's3:stage'
  ]);
};