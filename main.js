var app                = require('electron').app;
var ipc                = require('electron').ipcMain;
var BrowserWindow      = require('electron').BrowserWindow;
var PreferencesManager = require('./PreferencesManager.js');

//Maintain a global preferences manager instance
var prefs = new PreferencesManager();

//Maintain a reference to the main window to prevent it being freed prematurely
var mainWindow = null;

//Quit when all browser windows are closed
app.on('window-all-closed', function() {
	app.quit();
});

//Wait until Electron has completed startup initialisation
app.on('ready', function()
{
	//Register our IPC responders
	ipc.on('get-pref', function(event, arg) {
		event.returnValue = prefs.getPref(arg);
	});
	
	ipc.on('set-pref', function(event, arg) {
		prefs.setPref( arg['key'], arg['value'] );
	});
	
	//Create the main browser window
	mainWindow = new BrowserWindow({
		'width':          1280,
		'height':         720,
		'center':         true,
		'show':           true,
		'resizable':      true,
		'fullscreen':     false,
		'useContentSize': true,
		'frame':          false
	});
	
	//Make sure we release our reference to the main window when it is closed
	mainWindow.on('closed', function() {
		mainWindow = null;
	});
	
	//Load the initial page
	mainWindow.loadURL('file://' + __dirname + '/spotify-ui-spoof.html');
});
