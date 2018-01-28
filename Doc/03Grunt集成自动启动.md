# 03 Grunt集成自动启动

1.安装`grunt`在全局：
```bash
npm i grunt -g 
```

2.安装命令行接口：
```bash
npm i grunt-cli -g 
```

3.安装任务插件：
```bash
npm i grunt-concurrent --save
npm i grunt-contrib-watch --save
npm i grunt-nodemon --save
```

在根目录下创建`gruntfile.js`:
```bash
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
```

这时，在命令行运行`grunt`：
```bash
PS F:\nodejs\luya_movie> grunt
grunt-cli: The grunt command line interface (v1.2.0)

Fatal error: Unable to find local grunt.

If you're seeing this message, grunt hasn't been installed locally to
your project. For more information about installing and configuring grunt,
please see the Getting Started guide:

http://gruntjs.com/getting-started
```

上面出现了错误提示。如果你也出现了这样的错误，那么执行以下命令：
```bash
npm i grunt --save-dev
```

这样就运行成功了：
```bash
PS F:\nodejs\luya_movie> grunt
Running "concurrent:tasks" (concurrent) task
    Running "nodemon:dev" (nodemon) task
    [nodemon] 1.14.11
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node app.js`
    Running "watch" task
    Waiting...
    movies start on port 3000
```