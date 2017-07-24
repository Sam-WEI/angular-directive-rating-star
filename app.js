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


myApp.directive('goorooStar', ['$document', function($document) {
  function round2Half(rating) {
    var r = Number(rating);
    var double = r * 2;    
    return Math.round(double) / 2;
  }

  var fullStarOriginX = -5;
  var fullStarOriginY = -396;

  var halfStarOriginX = -205;
  var halfStarOriginY = -396;

  function link(scope, elem, attr) {
    

    var originalWidth = 191 / 2;
    var originalHeight = 20;

    var realWidth = elem[0].clientWidth;
    var realHeight = elem[0].clientHeight;

    console.log("realWidth: " + realWidth + "  realHeight: " + realHeight);

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
    console.log("realWidth: " + realWidth + "  realHeight: " + realHeight + "   ratio: " + ratio);

    console.log(elem[0].clientWidth + ', ' + elem[0].clientHeight);
    
    var w = 400 * ratio;
    var h = 700 * ratio;

    var rating = round2Half(attr.rating) || 0;

    if(rating < 0) {
      rating = 0;
    } else if(rating > 5) {
      rating = 5;
    }

    console.log(attr.rating + ":::::::::::::::" + rating);

    var xOffset = 0, yOffset = 0;

    if(rating === parseInt(rating)) {
      xOffset = fullStarOriginX - (5 - rating) * 19;
      yOffset = fullStarOriginY;
    }
    else {
      xOffset = halfStarOriginX - (5 - rating - 0.5) * 19;
      yOffset = halfStarOriginY;
    }

    var ox = xOffset * ratio;
    var oy = yOffset * ratio;

    elem.css({
      width: realWidth + 'px',
      height: realHeight + 'px',
      background: 'url(stars.png) no-repeat left top',
      backgroundSize: w + 'px ' + h + 'px',
      backgroundPosition: ox + 'px ' + oy + 'px',
    })
  };

  return {
    template: '',
    transclude: false,
    link: link
  };
}]);