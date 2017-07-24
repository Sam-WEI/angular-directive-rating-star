var myApp = angular.module('myApp',[]);

myApp.controller('GreetingController', ['$scope', function($scope) {
  
}]);

myApp.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for(var i = 0; i < total; i++) {
      input.push(i);      
    }
    return input;
  }
});


myApp.directive('goorooRating', ['$document', function($document) {
  function round2Half(rating) {
    var r = Number(rating);
    var double = r * 2;    
    return Math.round(double) / 2;
  }

  // init
  var imageWidth = 218;
  var imageHeight = 45;

  var originalWidth = 218 / 2;
  var originalHeight = 21;

  var singleStarWidth = 22;

  var fullStarOriginX = 0;
  var fullStarOriginY = 0;

  var halfStarOriginX = 0;
  var halfStarOriginY = -25;
  // init 

  function link(scope, elem, attr) {


    var realWidth = elem[0].clientWidth;
    var realHeight = elem[0].clientHeight;

    // console.log("realWidth: " + realWidth + "  realHeight: " + realHeight);

    if(realWidth === 0 && realHeight === 0) {
      realWidth = originalWidth;
      realHeight = originalHeight;
    } 
    else if(realWidth === 0) {
      realWidth = realHeight * originalWidth / originalHeight;
    } 
    else if(realHeight === 0) {
      realHeight = realWidth * originalHeight / originalWidth;
    }

    var ratio = realWidth / originalWidth;
    // console.log("realWidth: " + realWidth + "  realHeight: " + realHeight + "   ratio: " + ratio);

    console.log(elem[0].clientWidth + ', ' + elem[0].clientHeight);
    
    var w = imageWidth * ratio;
    var h = imageHeight * ratio;

    var rating = round2Half(scope.rating) || 0;

    if(rating < 0) {
      rating = 0;
    } else if(rating > 5) {
      rating = 5;
    }

    
    var xOffset = 0, yOffset = 0;

    if(rating === parseInt(rating)) {
      xOffset = fullStarOriginX - (5 - rating) * singleStarWidth;
      yOffset = fullStarOriginY;
    }
    else {
      xOffset = halfStarOriginX - (5 - rating - 0.5) * singleStarWidth;
      yOffset = halfStarOriginY;
    }

    var ox = xOffset * ratio;
    var oy = yOffset * ratio;

    elem.css({
      boxSizing: 'content-box',
      width: realWidth + 'px',
      height: realHeight + 'px',
      background: 'url(rating-stars.png) no-repeat left top',
      backgroundSize: w + 'px ' + h + 'px',
      backgroundPosition: ox + 'px ' + oy + 'px',
    })
  };

  return {
    template: '',
    transclude: false,
    scope: {
      rating: '@'
    },
    link: link
  };
}]);