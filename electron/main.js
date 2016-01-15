(function() {
    'use strict';

    var path = require('path');

    var app = require('app');
    var BrowserWindow = require('browser-window');

    var mainWindow = null;

    app.on('ready', function() {
        var windowOptions = {
            height: 1024,
            width: 768,
            icon: path.join(__dirname, 'JibrJabrLogo.png')
        };
        mainWindow = new BrowserWindow(windowOptions);

        mainWindow.loadURL('file://' + __dirname + '/../app/views/index.html');
    });

})();
