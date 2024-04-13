myApp.controller("EditPostController", function ($scope, $http, $routeParams,$location) {
  const apiPost = "http://localhost:3000/posts";
  $scope.data = {
    title: "",
    content: "",
    image: "",
  };
  var id = $routeParams.id;
  $http.get(`${apiPost}/${id}`).then((response) => {
    $scope.data = {
      title: response.data.title,
      content: response.data.content,
      image: response.data.image,
    };
  });

  $scope.edit = () => {
    if (validate()) {
      $http
        .patch(`${apiPost}/${id}`, $scope.data)
        .then((respose) => {
          var params = {
            message: 2,
          };
          $location.path("/post/list").search(params);
        })
        .catch((err) => {
          alert("Lỗi api " + err);
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
