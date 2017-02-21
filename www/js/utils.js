
//angular.module('app.utils', [])
app.service('utils', function ($log, $window) {

	var _objToString = function(obj) {
	    var str = 'Object\n{\n';
	    for (var p in obj) {
	    	if(obj.hasOwnProperty(p)) {
            	str += p + ': ' + obj[p] + '\n';
	    	}
	    }
	    str += '}';
	    return str;
	};

	this.dObj = function (obj) {
		$log.debug(_objToString(obj));
	};
	
	this.d = function (msg) {
		$log.debug(JSON.stringify(msg));
	};

	this.e = function (msg) {
		$log.error(JSON.stringify(msg));
	};

	this.w = function (msg) {
		$log.warn(JSON.stringify(msg));
	};

	this.prepareForServer = function(obj) {
		if(obj._id) {
			delete obj['_id'];
		}
		return obj;
	}
})
;