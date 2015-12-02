'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        this.typeScriptSourceFiles = './src/**/*.ts';
        this.libraryTypeScriptDefinitions = './typings/**/*.ts';
        this.outputFile="avam-menu.js";
        this.outputPath = "./dist/";
        this.templatePath = "./src/*.html";
        this.jsFilePath = "./dist/*.js";
        this.moduleName = 'avam-menu';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;