myApp.controller("ListProductController", function ($scope, $http, $location) {
  const apiProduct = "http://localhost:3000/products";

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
    .get(apiProduct)
    .then((response) => {
      $scope.listProducts = response.data;
    })
    .catch((error) => {
      alert("Lỗi API");
    });

  $scope.delete = (id) => {
    if (confirm("Bạn có muốn xóa sản phẩm không?")) {
      $http
        .delete(`${apiProduct}/${id}`)
        .then((respose) => {
          var params = {
            message: 1,
          };
          document.getElementById("item-product-" + id).remove();
          $location.path("/product/list").search(params);
        })
        .catch((err) => {
          alert("Lỗi api");
        });
    }
  };
});
