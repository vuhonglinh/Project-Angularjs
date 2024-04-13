myApp.controller("AddCustomerController", function ($scope, $http, $location) {
  const apiCustomer = "http://localhost:3000/customers";
  $scope.data = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    image: "",
  };

  $scope.add = () => {
    console.log(123);
    if (validate()) {
      $http
        .post(apiCustomer, $scope.data)
        .then((respose) => {
          var params = {
            message: 0,
          };
          $location.path("/customer/list").search(params);
        })
        .catch((err) => {
          alert("Lỗi api");
        });
    }
  };

  $scope.validate = {
    name: false,
    email: false,
    password: false,
    address: false,
    phone: false,
    image: false,
  };

  function validate() {
    $scope.validate.name = $scope.data.name == "" ? true : false;
    $scope.validate.email = $scope.data.email == "" ? true : false;
    $scope.validate.password = $scope.data.password == "" ? true : false;
    $scope.validate.address = $scope.data.address == "" ? true : false;
    $scope.validate.phone = $scope.data.phone == "" ? true : false;
    $scope.validate.image = $scope.data.image == "" ? true : false;
    if (allPropertiesFalse($scope.validate)) {
      return true;
    }
    return false;
  }
  function allPropertiesFalse(obj) {
    return Object.values(obj).every((value) => !value);
  }
});
