myApp.controller("PostController", function ($scope, $http) {
  const apiPosts = "http://localhost:3000/posts";

  $http.get(apiPosts).then((response) => {
    $scope.listPosts = response.data;
  });
});
