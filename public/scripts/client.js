console.log('sizedup');


var resizedX = 0;
var resizedY = 0;
// console.log(resizedX, resizedX);
var windowSize = function() {
  console.log('windowSize');
  var w = window.outerWidth;
  var h = window.outerHeight;
  var txt = "Window size: width=" + w + ", height=" + h;
  console.log(txt);
  resizedX = (window.outerWidth - 520) / 2;
  console.log(resizedX, resizedY);
};
var sizeUP = function() {
  console.log('sizeUp');
  var canvasXY = canvas.getBoundingClientRect();
  console.log("top: ", canvasXY.top, "right: ", canvasXY.right, "bottom: ", canvasXY.bottom, "left: ", canvasXY.left);
  resizedX = (canvasXY.left);
  resizedY = (canvasXY.top);
  // console.log("rx:", resizedX);
  // console.log("ry:", resizedY);
};


var app = angular.module('myApp', []);
//
// app.config(function($routeProvider) {
//     $routeProvider.when('/', {
//         templateUrl: "views/partials/bodyview.html",
//         controller: "NgPlay"
//     // }).when('/showbod', {
//     //     templateUrl: "views/partials/bodyview.html",
//     //     controller: "NgPlay"
//
//     });
// });

// app.controller('BodController', function( $location) {
//
//
// });


app.controller('NgPlay', function(HttpService, $location) {

  var vm = this;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  vm.go = function(path) {
    $location.path(path);
  };

  function Dot(x, y) {
    return {
      x,
      y
    };
  }

  vm.arrToSend = [];
  console.log('NG sourced');

  vm.displayItems = function() {
    HttpService.getItems().then(function(response) {
      console.log(response);
      vm.dotData = response.data;

    });
  };
  vm.displayItems();


  windowSize();

  vm.myFunc = function(event) {
    vm.x = event.clientX;
    vm.y = event.clientY;

  };
  vm.coords = function() {
    vm.arrToSend.push(new Dot(vm.x, vm.y));
    vm.makeCircle(vm.x, vm.y);
    console.log(vm.arrToSend);
  };
  vm.makeCircle = function(x, y) {
    ctx.beginPath();
    ctx.arc(x - resizedX, y - resizedY, 10, 0, 2 * Math.PI);
    ctx.fillStyle = "#C3423F";
    ctx.fill();
    ctx.stroke();
  };

  vm.saveIt = function() {
    var itemToSend = {
      name: vm.name,
      date: new Date(),
      dots: vm.arrToSend
    };
    HttpService.postItem(itemToSend).then(function(response) {
      vm.displayItems();
    });
  };
  vm.showIt = function(index) {
    // vm.go('/showbod');
    console.log('showit');
    for (var i = 0; i < vm.dotData[index].dots.length; i++) {
      vm.makeCircle(vm.dotData[index].dots[i].x, vm.dotData[index].dots[i].y);
    }
  };

});
