var myApp = angular.module("myApp", ["ngRoute"]);

myApp.controller("MainController", function ($scope, $http) {
  const apiProduct = "http://localhost:3000/products";
  $scope.infoCustomer = localStorage.getItem("customers");
  // Lấy danh sách sản phẩm từ localStorage
  $scope.logout = function (id) {
    localStorage.removeItem("customers");
    window.location.href = "/admin/login.html";
  };

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
        document.getElementById("count-cart").innerHTML = `(${cartItems.length})`;
        Swal.fire("Thành công", "Bạn đã thêm sản phẩm vào giỏ hàng", "success");
      })
      .catch((error) => {
        alert("Lỗi API: " + error);
      });
  };
});

myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/home", {
      templateUrl: "views/home.html",
      controller: "HomeController",
    })
    .when("/categories", {
      templateUrl: "views/categories.html",
      controller: "AddProductController",
    })
    .when("/about", {
      templateUrl: "views/about.html",
      controller: "UpdateProductController",
    })
    .when("/contact", {
      templateUrl: "views/contact.html",
      controller: "UpdateProductController",
    })
    .when("/cart", {
      templateUrl: "views/cart.html",
      controller: "CartController",
    })
    .when("/post", {
      templateUrl: "views/post.html",
      controller: "PostController",
    })
    .when("/product", {
      templateUrl: "views/product.html",
      controller: "HomeController",
    })
    .when("/detail/:id", {
      templateUrl: "views/detail.html",
      controller: "DetailController",
    })
    .otherwise({
      redirectTo: "/home",
    });
});
