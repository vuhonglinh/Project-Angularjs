myApp.controller(
  "DetailController",
  function ($scope, $http, $location, $routeParams) {
    const apiProduct = "http://localhost:3000/products";

    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    $scope.cartItems = cartItems;
    $http
      .get(`${apiProduct}/${$routeParams.id}`)
      .then((respose) => {
        console.log(respose.data);
        $scope.product = respose.data;
      })
      .catch((err) => {
        console.error(err);
      });

    $scope.addCart = function (id) {
      $http
        .get(`${apiProduct}/${id}`)
        .then((response) => {
          
          var product = response.data;
          var cartItems = JSON.parse(localStorage.getItem("cart")) || [];
          var existingItem = cartItems.find((item) => item.id === product.id);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            product.quantity = 1;
            cartItems.push(product);
          }
          localStorage.setItem("cart", JSON.stringify(cartItems));
          document.getElementById(
            "count-cart"
          ).innerHTML = `(${cartItems.length})`;
          Swal.fire(
            "Thành công",
            "Bạn đã thêm sản phẩm vào giỏ hàng",
            "success"
          );
        })
        .catch((error) => {
          alert("Lỗi API: " + error);
        });
    };
  }
);
