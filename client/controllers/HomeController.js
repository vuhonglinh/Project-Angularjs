myApp.controller("HomeController", function ($scope, $http) {
  const apiProduct = "http://localhost:3000/products";

  $http.get(apiProduct).then((response) => {
    $scope.listProducts = response.data;
  });
});
