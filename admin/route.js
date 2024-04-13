var myApp = angular.module("myApp", ["ngRoute"]);
myApp.controller("MainController", function ($scope, $http, $location) {
  $scope.infoUser = localStorage.getItem("user");

  const apiCustomer = "http://localhost:3000/customers";
  const apiProduct = "http://localhost:3000/products";
  const apiPots = "http://localhost:3000/posts";
  const apiUser = "http://localhost:3000/users";

  $http.get(apiCustomer).then((response) => {
    $scope.customers = response.data;
  });

  $http.get(apiProduct).then((response) => {
    $scope.products = response.data;
  });

  $http.get(apiPots).then((response) => {
    $scope.posts = response.data;
  });

  $http.get(apiUser).then((response) => {
    $scope.users = response.data;
  });

  $scope.logout = function () {
    localStorage.removeItem("user");
    window.location.href = "/admin/login.html";
  };
});

myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/dashboard", {
      templateUrl: "views/dashboard.html",
      controller: "MainController",
    })
    ///Sản phẩm
    .when("/product/list", {
      templateUrl: "views/product/list.html",
      controller: "ListProductController",
    })
    .when("/product/add", {
      templateUrl: "views/product/add.html",
      controller: "AddProductController",
    })
    .when("/product/edit/:id", {
      templateUrl: "views/product/edit.html",
      controller: "EditProductController",
    })
    //Khách hàng
    .when("/customer/list", {
      templateUrl: "views/customer/list.html",
      controller: "ListCustomerController",
    })
    .when("/customer/add", {
      templateUrl: "views/customer/add.html",
      controller: "AddCustomerController",
    })
    .when("/customer/edit/:id", {
      templateUrl: "views/customer/edit.html",
      controller: "EditCustomerController",
    })
    //Quản trị viên
    .when("/user/list", {
      templateUrl: "views/user/list.html",
      controller: "ListUserController",
    })
    .when("/user/add", {
      templateUrl: "views/user/add.html",
      controller: "AddUserController",
    })
    .when("/user/edit/:id", {
      templateUrl: "views/user/edit.html",
      controller: "EditUserController",
    })
    //Bài viết
    .when("/post/list", {
      templateUrl: "views/post/list.html",
      controller: "ListPostController",
    })
    .when("/post/add", {
      templateUrl: "views/post/add.html",
      controller: "AddPostController",
    })
    .when("/post/edit/:id", {
      templateUrl: "views/post/edit.html",
      controller: "EditPostController",
    })
    //Auth
    .when("/login", {
      templateUrl: "views/auth/login.html",
      controller: "LoginController",
    })
    .when("/register", {
      templateUrl: "views/auth/register.html",
      controller: "RegisterController",
    })

    .otherwise({
      redirectTo: "/dashboard",
    });
});
