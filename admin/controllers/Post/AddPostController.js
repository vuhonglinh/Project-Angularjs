myApp.controller("AddPostController", function ($scope, $http, $location) {
  const apiPost = "http://localhost:3000/posts";
  $scope.data = {
    title: "",
    content: "",
    image: "",
  };

  $scope.add = () => {
    if (validate()) {
      $http
        .post(apiPost, $scope.data)
        .then((respose) => {
          var params = {
            message: 0,
          };
          $location.path("/post/list").search(params);
        })
        .catch((err) => {
          alert("Lỗi api");
        });
    }
  };
  
  $scope.validate = {
    title: false,
    content: false,
    image: false,
  };
  function validate() {
    $scope.validate.title = $scope.data.title == "" ? true : false;
    $scope.validate.content = $scope.data.content == "" ? true : false;
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
