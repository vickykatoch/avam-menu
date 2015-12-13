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
        this.cssPath = './src/avamMenu.css';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;