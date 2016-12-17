/**
 * Created by yaoshining on 2016/12/17.
 */
const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    const indexPath = `file://${__dirname}/dist/index.html`;
    const mainWindow = new BrowserWindow({
        'web-preferences': {'web-security': false},
        width: 1280,
        height: 720
    });
    mainWindow.loadURL(indexPath)
});