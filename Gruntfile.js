module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist/**"],
        uglify: {
            files: {
                src: "src/js/*.js",
                dest: "dist/js",
                ext: ".min.js",
                expand: true,
                flatten: true
            }
        },
        jshint: {
            files: ['src/js/*.js'],
            options: {
                force: true,
                globals: {
                    jQuery: true
                }
            }
        },
        processhtml: {
            files: {
                expand: true,
                cwd: 'src/',
                src: ['*.html'],
                dest: 'dist/',
            }
        },
        csslint: {
            options: {
                import: false
            },
            src: ['src/css/*.css']
        },
        cssmin: {
            files: {
                expand: true,
                cwd: 'src/css',
                src: ['*.css'],
                dest: 'dist/css',
                ext: '.min.css',
            }
        },
        htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                removeOptionalTags: true,
                minifyJS: true
            },
            files: {
                expand: true,
                cwd: 'dist/',
                src: ['*.html'],
                dest: 'dist/',
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'src/images',
                src: ['*.*'],
                dest: 'dist/images',
            }
        },
        watch: {
            files: ['src/**/*'],
            tasks: ['dist'],
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('test', ['jshint', 'csslint']);
    grunt.registerTask('dist', ['clean', 'uglify', 'cssmin', 'processhtml', 'htmlmin', 'copy']);
};
