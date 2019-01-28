const awsCreds = require('dotup-aws-credentials-loader');

module.exports = function (grunt) {

  const loader = new awsCreds.AwsCredentialsLoader();
  const cred = loader.GetCredentials();

  const skillId = '';
  const functionArn = 'arn:aws:lambda:eu-west-1:977739547106:function:dotup-ts-node-skills-sample';

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: './dist/sample.js'
      },
      options: {
        ignore: [
          'node_modules/**',
          'dist/**',
          'gruntfile.js'
        ],
        env: {
          PORT: '8181'
        }
      }
    },

    watch: {
      scripts: {
        files: [
          '**/*.ts',
          '!node_modules/**/*.ts',
          '!dist/**/*.ts'
        ], // the watched files
        copy: {
          files: ['src/assets/**'],
          tasks: ['copy']
        },
        tasks: ["newer:tslint:all", "ts:build"], // the task to run
        options: {
          spawn: false // makes the watch task faster
        }
      }
    },

    concurrent: {
      watchers: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      all: {
        src: [
          "src/**/*.ts",
          "!dist/**/*.ts",
          "!node_modules",
          "!node_modules/**/*.ts",
          "!obj/**/*.ts",
          "!typings/**/*.ts"
        ] // avoid linting typings files and node_modules files
      }
    },

    ts: {
      default: {
        tsconfig: './tsconfig.json'
      },
      options: {
        fast: 'never' // You'll need to recompile all the files each time for NodeJS
      }
    },

    copy: {
      assets: {
        cwd: 'src',
        // These are the directories to be copied as-is.
        // These must also be specified below in the watch block.
        src: ['skill/assets/**', '!assets/**/*.map'],
        dest: 'dist',
        expand: true
      },
      packageJSON: {
        cwd: 'src/skill',
        // These are the directories to be copied as-is.
        // These must also be specified below in the watch block.
        src: 'package.json',
        dest: 'dist/skill',
        expand: true
      }
      // lambda: {
      //   cwd: 'dist/skill',
      //   // These are the directories to be copied as-is.
      //   // These must also be specified below in the watch block.
      //   src: ['**', '!**/*.map' ],
      //   dest: 'lambda/custom',
      //   expand: true
      // }
    },

    run: {
      test: {
        cmd: 'npm.cmd',
        args: [
          'run',
          'test'
        ]
      },
      installDependencies: {
        cmd: 'npm.cmd',
        args: [
          'install',
          '--prefix',
          'dist/skill',
          'dist/skill/'
        ]
      },
      deploy_model: {
        cmd: 'ask',
        args: [
          'deploy',
          '-t model',
          '--force']
      },
      deploy_skill: {
        cmd: 'ask',
        args: [
          'deploy',
          '-t skill',
          '--force']
      }
    },

    clean: ['dist'],

    lambda_package: {
      default: {
        options: {
          package_folder: 'dist/skill/'
        }
      }
    },
    lambda_deploy: {
      default: {
        arn: functionArn,
        options: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          region: "eu-west-1"
        },
      }
    }

  });

  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-nodemon");
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-aws-lambda');

  grunt.registerTask('lambda-pack', ['lambda_package:default']);
  grunt.registerTask('lambda-deploy', ['lambda_package:default', 'lambda_deploy:default']);

  // Default tasks.
  grunt.registerTask("serve", ["concurrent:watchers"]);
  grunt.registerTask("build", ["clean", "ts", "copy:assets", "copy:packageJSON"]);
  grunt.registerTask("release", ["clean", "ts", "run:test", "tslint:all", "copy:assets", "copy:packageJSON"]);
  grunt.registerTask("publish", ['release', "run:installDependencies", "lambda-deploy"]);
};