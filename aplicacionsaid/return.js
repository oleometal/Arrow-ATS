module.exports = function (msg) { 
	return new Promise(function(resolve, reject) {
	// Only `delay` is able to resolve or reject the promise
		//setTimeout(function() {
			resolve(msg); // After 3 seconds, resolve the promise with value 42
		//}, 3000);
	});
};