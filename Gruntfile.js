module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
        options: {
            banner: '/*!\n' +
                ' * <%= pkg.name %> - <%= pkg.description %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' * Version: <%= pkg.version %>\n' +
                ' * <%= pkg.author %>\n' +
                ' */\n'
        },
        build: {
            src: 'stem/stem.js',
            dest: 'stem/stem.min.js'
        }
    },
    watch: {
        scripts: {
            files: ['stem/stem.js'],
            tasks: ['default'],
            options: {
                spawn: false,
            },
        },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify']);

};