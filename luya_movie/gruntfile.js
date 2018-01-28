module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      ejs: {
        files: ['views/**'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['public/js/**'],
        // tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: [],
          ignoredFiles: ['node_modules/**', 'DS_Store'],
          watchedExtensions: ['js'],
          watchedFolders: ['./'],
          debug: true,
          delayTime: 1,
          env: {
            PORT: 3000
          },
          cwd: __dirname
        }
      }
    },

    concurrent: {
      tasks: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  // 加载插件
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  
  // 对grunt配置参数 防止开发过程中由于语法警告而中断grunt的整个服务
  grunt.option('force', true);

  // 注册任务
  grunt.registerTask('default', ['concurrent']);
}