module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    fileName: '<%= grunt.config.get("pkg").name.toLowerCase().replace(/ /g, "-") %>',
    jsFiles: ['assets/js/*.js'],
    cssFiles: ['assets/css/*.less'],
    distDir: 'assets/dist/',
    concat: {
      options: {
        banner: '/*! <%= fileName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        stripBanners: true
      },
      js: {
        src: '<%= jsFiles %>',
        dest: '<%= distDir %><%= fileName %>.all.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= fileName %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= distDir %><%= fileName  %>.all.js',
        dest: '<%= distDir %><%= fileName %>.all.min.js'
      }
    },
    less: {
      compressed: {
        options: {
          compress: true
        },
        files: {
          '<%= distDir %><%= fileName %>.all.min.css': '<%= cssFiles %>'
        }
      },
      uncompressed: {
        options: {
          compress: false
        },
        files: {
          '<%= distDir %><%= fileName %>.all.css': '<%= cssFiles %>'
        }
      }
    },
    watch: {
      js: {
        files: '<%= jsFiles %>',
        tasks: ['concat:js', 'uglify']
      },
      less: {
        files: '<%= cssFiles %>',
        tasks: ['less']
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  return grunt.registerTask('default', ['concat', 'less']);
};