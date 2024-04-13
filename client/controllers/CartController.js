myApp.controller("CartController", function ($scope) {
  // Lấy danh sách sản phẩm từ localStorage
  var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  $scope.cartItems = cartItems;

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  $scope.getTotalQuantity = function () {
    var totalQuantity = 0;
    for (var i = 0; i < $scope.cartItems.length; i++) {
      totalQuantity += $scope.cartItems[i].quantity;
    }
    return totalQuantity;
  };

  // Tính tổng số tiền của các sản phẩm trong giỏ hàng
  $scope.getTotalAmount = function () {
    var totalAmount = 0;
    for (var i = 0; i < $scope.cartItems.length; i++) {
      totalAmount += $scope.cartItems[i].price * $scope.cartItems[i].quantity;
    }
    return totalAmount;
  };

  // Xóa sản phẩm khỏi giỏ hàng
  $scope.removeItem = function (index) {
    $scope.cartItems.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify($scope.cartItems));
    document.getElementById("count-cart").innerHTML = `(${cartItems.length})`;
    Swal.fire("Thành công", "Bạn đã xóa sản phẩm trong giỏ hàng", "success");
  };

  // Xóa toàn bộ sản phẩm trong giỏ hàng
  $scope.clearCart = function () {
    $scope.cartItems = [];
    localStorage.removeItem("cart");
  };
});
