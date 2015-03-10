/*
 * grunt-tabtospace
 * https://github.com/zyxxt/grunt-tabtospace
 *
 * Copyright (c) 2014 zyxxt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tabtospace', 'a grunt tool to replace tab to space', function() {
      var options = this.options({
          spaceCnt: 4,
          encoding: 'utf-8'
      });

      var getSpace = function (cnt) {
          var space = [];
          var i = 0;
          while (i < cnt) {
              space.push(' ');
              i++;
          }
          return space.join('');
      };

      var replaceTabs = function(file, data){
          
          if(data.indexOf('\t') == -1){
            return data;
          }

          grunt.log.ok('replacing tabs with spaces: "%s" ', file);

          var space = getSpace(options.spaceCnt);
          return data.replace(/\t/g,space);
      }     

      var fs = require('fs');
      var readFile = function (file) {
          // 读写文件都用同步的方式吧，异步的话要处理 var done = async(); done(true);要在所有文件处理完后调用回调
          // 有点麻烦
          var data = fs.readFileSync(file, {
              encoding: options.encoding
          });
          data = replaceTabs(file, data);

          fs.writeFileSync(file, data, {
              encoding: options.encoding
          });
      };
      var tabToSpace = function (file) {
          if (!grunt.file.exists(file)) {
              // 文件不存在
              grunt.verbose.warn('The file: "%s" is not exist.', file);
              return ;
          }
          if (!grunt.file.isFile(file)) {
              grunt.verbose.warn('"%s" is not a file');
              return ;
          }
          readFile(file);
      };

      this.files.forEach(function (file) {
          file.src.forEach(function(f) {
              tabToSpace(f);
          });

      });
  });

};
