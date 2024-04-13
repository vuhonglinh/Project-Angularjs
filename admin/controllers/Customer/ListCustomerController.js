myApp.controller("ListCustomerController", function ($scope, $http, $location) {
  const apiCustomer = "http://localhost:3000/customers";

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
    .get(apiCustomer)
    .then((response) => {
      $scope.listCustomers = response.data;
    })
    .catch((error) => {
      alert("Lỗi API");
    });

  $scope.delete = (id) => {
    if (confirm("Bạn có muốn xóa khách hàng không?")) {
      $http
        .delete(`${apiCustomer}/${id}`)
        .then((respose) => {
          var params = {
            message: 1,
          };
          document.getElementById("item-customer-" + id).remove();
          $location.path("/customer/list").search(params);
        })
        .catch((err) => {
          alert("Lỗi api");
        });
    }
  };
});
