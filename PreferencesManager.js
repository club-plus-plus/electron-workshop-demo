"use strict";

class PreferencesManager
{
	constructor()
	{
		this.prefs = {
			"key1": "value1",
			"key2": "value2",
			"key3": "value3"
		};
	}
	
	getPref(k) {
		return this.prefs[k];
	}
	
	setPref(k, v) {
		this.prefs[k] = v;
	}
}

module.exports = PreferencesManager;