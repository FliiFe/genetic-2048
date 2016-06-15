module.exports = function (grunt) {

    grunt.initConfig({
        clean: ['./build'],
        connect: {
            server: {
                options: {
                    port: 8080,
                    hostname: '*',
                    base: './build/',
                    livereload: true
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: '2048/',
                src: ['**'],
                dest: 'build/'
            },
            js: {
                expand: true,
                cwd: 'src/',
                src: ['*.js'],
                dest: 'build/js/'
            },
            html: {
                expand: true,
                cwd: 'src/',
                src: ['*.html'],
                dest: 'build/'
            },
            brainwave: {
                expand: true,
                cwd: 'Brainwave/build/',
                src: ['*.js'],
                dest: 'build/js/'
            }
        },
        watch: {
            scripts: {
                files: ['src/**'],
                tasks: ['copy:js', 'copy:html'],
                options: {
                    livereload: true,
                    spawn: false
                }
            }
        }
    });

    grunt.registerTask('build', 'Build the project', ['copy:main', 'copy:js', 'copy:html', 'copy:brainwave']);

    grunt.registerTask('default', ['build', 'connect', 'watch']);
    grunt.registerTask('serve', ['connect']);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

};
