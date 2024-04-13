myApp.controller("ListUserController", function ($scope, $http, $location) {
  const apiUser = "http://localhost:3000/users";

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

  $scope.addItem = function () {
    // Code thêm mục vào đây
    // Sau khi thêm thành công
    $scope.Success = true;
    $scope.addSuccess = true;
  };

  $http
    .get(apiUser)
    .then((response) => {
      $scope.listCustomers = response.data;
    })
    .catch((error) => {
      alert("Lỗi API");
    });

  $scope.delete = (id) => {
    if (confirm("Bạn có muốn xóa quản trị viên không?")) {
      $http
        .delete(`${apiUser}/${id}`)
        .then((respose) => {
          var params = {
            message: 1,
          };
          document.getElementById("item-user-" + id).remove();
          $location.path("/user/list").search(params);
        })
        .catch((err) => {
          alert("Lỗi api");
        });
    }
  };
});
