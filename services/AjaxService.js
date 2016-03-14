app.factory('ajaxService', function($http) {
	return {
		get: get,
		post: post,
        delete: del
	}
	
	function get(url) {
        return $http
			.get(url)
			.success(function(data) {
				return data;
			}).error(function(err) {
				return err;
			});
	}
    
    function post(url) {
		console.log('Implementar put.');
	}
    
    function del(url) {
		console.log('Implementar delete.');
	}
	
});