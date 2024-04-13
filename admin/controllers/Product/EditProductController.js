myApp.controller(
  "EditProductController",
  function ($scope, $http, $routeParams, $location) {
    const apiProduct = "http://localhost:3000/products";
    $scope.data = {
      name: "",
      price: "",
      image: "",
      quantity: "",
      description: "",
    };
    var id = $routeParams.id;
    $http.get(`${apiProduct}/${id}`).then((response) => {
      $scope.data = {
        name: response.data.name,
        price: response.data.price,
        image: response.data.image,
        quantity: response.data.quantity,
        description: response.data.description,
      };
    });

    $scope.edit = () => {
      if (validate()) {
        $http
          .patch(`${apiProduct}/${id}`, $scope.data)
          .then((respose) => {
            var params = {
              message: 2,
            };
            $location.path("/product/list").search(params);
          })
          .catch((err) => {
            alert("Lỗi api " + err);
          });
      }
    };

    $scope.validate = {
      name: false,
      price: false,
      image: false,
      quantity: false,
      description: false,
    };

    function validate() {
      $scope.validate.name = $scope.data.name == "" ? true : false;
      $scope.validate.price = $scope.data.price == "" ? true : false;
      $scope.validate.image = $scope.data.image == "" ? true : false;
      $scope.validate.quantity = $scope.data.quantity == "" ? true : false;
      $scope.validate.description =
        $scope.data.description == "" ? true : false;
      if (allPropertiesFalse($scope.validate)) {
        return true;
      }
      return false;
    }

    function allPropertiesFalse(obj) {
      return Object.values(obj).every((value) => !value);
    }
  }
);
