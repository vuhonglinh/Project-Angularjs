myApp.controller("AddUserController", function ($scope, $http, $location) {
  const apiUser = "http://localhost:3000/users";
  $scope.data = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    image: "",
    role: "",
  };

  $scope.add = () => {
    console.log(123);
    if (validate()) {
      $http
        .post(apiUser, $scope.data)
        .then((respose) => {
          var params = {
            message: 0,
          };
          $location.path("/user/list").search(params);
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
    role: false,
  };

  function validate() {
    $scope.validate.name = $scope.data.name == "" ? true : false;
    $scope.validate.email = $scope.data.email == "" ? true : false;
    $scope.validate.password = $scope.data.password == "" ? true : false;
    $scope.validate.address = $scope.data.address == "" ? true : false;
    $scope.validate.phone = $scope.data.phone == "" ? true : false;
    $scope.validate.image = $scope.data.image == "" ? true : false;
    $scope.validate.role = $scope.data.role == "" ? true : false;
    if (allPropertiesFalse($scope.validate)) {
      return true;
    }
    return false;
  }
  function allPropertiesFalse(obj) {
    return Object.values(obj).every((value) => !value);
  }
});
