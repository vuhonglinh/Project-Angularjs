myApp.controller("ProductController", function ($scope) {
  const apiProduct = "http://localhost:3000/products";

  $http.get(apiProduct).then((response) => {
    $scope.listProducts = response.data;
  });
});
