(function() {

  "use strict";

  var app = angular.module('iteamse', []);

	app.config(function ($compileProvider) {
		$compileProvider
			.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension|spotify):/); 
	});
})();