module.exports = function(grunt) {
  var data=require('./data.js');
  console.log(data);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build'],
    copy: {
      main: {
        files: [
        // includes files within path
        {expand: true, flatten:true, src: ['src/js/*'], dest: 'build/js/', filter: 'isFile'},
        {expand: true, flatten:true, src: ['src/css/*'], dest: 'build/css/', filter: 'isFile'}
        ]
      }
    },
    jade: {
      compile: {
        options: {
          data:function(dest, src) {
            //extract number
            var chapter=+dest.split('').filter(function(c){return +c>=0;}).join('');
            return {
              from: src,
              to: dest,
              chapter:chapter,
              chapters:data.chapters,
              titles:data.titles,
            };
          }
        },
        files: (function() {
          var ret={};
          for(var i=0;i<=data.chapters;++i) {
            ret['build/chapter'+i+'.html']=['src/jade/'+i+'.jade'];
          }
          return ret;
        })()
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('makejade', 'My "default" task description.', function() {
    grunt.log.writeln(JSON.stringify(arguments));
  });
  grunt.registerTask('default', ['clean','copy','jade']);
};
