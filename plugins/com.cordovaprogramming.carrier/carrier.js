var cordova = require('cordova');

var carrier = {
	getAverageNoise : function(successCallback, errorCallback) {
		/* 

		cordova.exec passes control to native code
		when native is finished it passes callback functions
		and passes its results back to the js object

		general notation:
		cordova.exec(successCallback, errorCallback, 'PluginObject',
				 'pluginMethod', [arguments]);

		'PluginObject' parameter is a string that identifies 
		the native object(CarrierPlugin.m/.h) that contains the 
		method being called, and the 'pluginMethod' parameter 
		is a string that identifies the method that is executed.

		*/ 
		cordova.exec(successCallback, errorCallback,
		 'CarrierPlugin', 'getAverageNoise', []);
	},

		getLuminosity : function(successCallback, errorCallback) {
		cordova.exec(successCallback, errorCallback,
		 'CarrierPlugin', 'getLuminosity', []);
	}

};


module.exports = carrier;