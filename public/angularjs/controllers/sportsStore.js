angular.module("sportsStore")
.constant("dataUrl", "http://localhost:27017/products")
.constant("orderUrl", "http://localhost:27017/orders")
.controller("sportsStoreCtrl", function($scope, $http, $location, dataUrl, orderUrl, cart){
	
	$scope.data = [];
	
	$http.get(dataUrl).then(function(data){
		$scope.data.products = data.data;
	}).catch(function(data){
		$scope.data.error = data.data;
	});
	
	$scope.sendOrder = function(shippingDetails) {
		var order = angular.copy(shippingDetails);
		order.products = cart.getProducts();
		$http.post(orderUrl, order).then(function(data){
			$scope.data.orderId = data.data.id;
			cart.getProducts().length = 0;
		}).catch(function(data){
			$scope.data.orderError = data.data;
		}).finally(function(){
			$location.path("/complete");
		});
	}
	
});