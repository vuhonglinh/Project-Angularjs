myApp.controller("ListPostController", function ($scope, $http, $location) {
  const apiPost = "http://localhost:3000/posts";

  var status = $location.search();
  $scope.Success = false;
  $scope.addSuccess = false;
  $scope.deleteSuccess = false;
  $scope.editSuccess = false;

  // Xác định trạng thái thành công dựa trên query string
  if (status.message == 1) {
    $scope.Success = true;
    $scope.deleteSuccess = true;
  } else if (status.message == 0) {
    $scope.Success = true;
    $scope.addSuccess = true;
  } else if (status.message == 2) {
    $scope.Success = true;
    $scope.editSuccess = true;
  }

  $http
    .get(apiPost)
    .then((response) => {
      $scope.listPosts = response.data;
    })
    .catch((error) => {
      alert("Lỗi API");
    });

  $scope.delete = (id) => {
    if (confirm("Bạn có muốn xóa bài viết không?")) {
      $http
        .delete(`${apiPost}/${id}`)
        .then((respose) => {
          var params = {
            message: 1,
          };
          document.getElementById("item-post-" + id).remove();
          $location.path("/post/list").search(params);
        })
        .catch((err) => {
          alert("Lỗi api");
        });
    }
  };
});
