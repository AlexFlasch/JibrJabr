(function() {
    'use strict';

    var app = require('app');
    var BrowserWindow = require('browser-window');

    var mainWindow = null;

    app.on('ready', function() {
        var windowOptions = {
            height: 1024,
            width: 768
        };
        mainWindow = new BrowserWindow(windowOptions);

        mainWindow.loadURL('file://' + __dirname + '/../app/views/index.html');
    });

})();
