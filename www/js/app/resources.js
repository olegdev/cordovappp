define(['logger', 'config', 'storage'], function(logger, config, storage) {

	var getFileSystemEntry = function(fs, path, callback) {
		window.resolveLocalFileSystemURL(fs + path, function(entry) {
			callback(entry);
		}, function(error) {
			logger.error('Cannot get filesystem entry for "' + path + '" cause', error);
		});
	}

	/***
	 *  Первоначальная установка и подготовка скриптов игры
	 *  Выполняется однажды при первом запуске
	 */
	var installScripts = function(callback) {
		var innerCreateDestDir = function(callback) {
			getFileSystemEntry(cordova.file.dataDirectory, "resources", function(entry) {
				// clear previous installation stuff
				entry.removeRecursively(function() {
					getFileSystemEntry(cordova.file.dataDirectory, "", function(entry) {
						entry.getDirectory("resources", {create: true}, function(entry) {
							callback(entry);
						});
					});
				});
			}, function() {
				getFileSystemEntry(cordova.file.dataDirectory, "", function(entry) {
					entry.getDirectory("resources", {create: true}, function(entry) {
						callback(entry);
					});
				});
			});
		};

		/***/ logger.log("Install scripts");

		getFileSystemEntry(cordova.file.applicationDirectory, "/www/resources/css", function(srcDir) {
			innerCreateDestDir(function(destDir) {
				srcDir.copyTo(destDir, srcDir.name, function() {
					processCss(destDir, callback);
				}, function(error) {
					logger.error('Cannot copy scripts folder cause', error);
				})
			});
		});
	};

	/**
	 * Пробегаюсь по всем css-файлам и заменяю url картинок на локальный
	 */
	var processCss = function(dirEntry, callback) {
		var innerProcessFiles = function(index, fileEntries, callback) {
			var entry = fileEntries[index++];
			if (entry) {
				entry.file(function(file) {
					var reader = new FileReader();
			        reader.onloadend = function(e) {
			        	var text = this.result; //.replace(/http\w?\:\/\/[\.\w]+/g, "cdvfile://localhost/bundle/www/resources/img");
			        	entry.createWriter(function(fileWriter) {
					        fileWriter.write(text);
					    	innerProcessFiles(index, fileEntries, callback);  
					    }, function(error) {
					    	logger.error('Cannot write css file cause', error);
					    });
			        }
			        reader.readAsText(file);
				});
			} else {
				callback();
			}
		};
		getFileSystemEntry(cordova.file.dataDirectory, "/resources/css", function(entry) {
			var reader = entry.createReader();
			reader.readEntries(function(entries) {
				innerProcessFiles(0, entries, callback);
			}, function(error) {
				logger.error("Cannot read css dir cause", error);
			});
		});
	};

	/**
	 * Проверка наличия обновлений
	 */
	var checkUpdate = function(callback) {
		callback();
	};

	return {
		init: function(callback) {

			/***/ logger.log('Resources init');

			if (!storage.getItem('initialized')) {
				installScripts(function() {
					checkUpdate(callback);
				});
			} else {
				checkUpdate(callback);
			}
		},


	}

});