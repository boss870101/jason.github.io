(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.onload = function(){
  var model = require( './scripts/models/mode.json' );
  var direction = require( './scripts/libs/direction' );
  var config = {
    "slideWidth": 600,
    "slideHeight": 400,
    "scale": 50,
    "imgWidth": 600,
    "rotate": 60,
    "verticalAlign": { "top": 0, "bottom": 1, "middle": 2 }
  }

  var slide = document.getElementById( 'slide' );
  var container = document.getElementById( 'container' );
  var offsetIndex = model.length % 2 ? 0 : -1;

  var render = function(){
    model.forEach( function( item, index, arr ){
      var moietyLength = Math.floor( arr.length / 2 );
      var abs = Math.abs;
      if( !item[ 'el' ] ){
        item.el = document.createElement( 'div' );
        item.index = index - moietyLength;
        item.el.className = 'item';
        item.el.style.backgroundImage = 'url(' + item.pic + ')';
        slide.appendChild( item.el );
      }
      var style = item.el.style;

      style.zIndex = ( item.index > 0 ? -item.index : item.index );
      style.width = config.imgWidth + 'px';
      style.height = config.slideHeight - abs( item.index ) * config.scale + 'px';
      style.left = item.index * config.scale + 'px'; 
      style.top = abs( item.index ) * config.scale / config.verticalAlign.middle  + 'px';
      style.opacity = 5 / ( abs( item.index ) + 5 );
    } );
  }

  render();

  function merryGoRound( dir ){
    model.forEach( function( item ){
      var v = dir === 'E' ? -1 : 1;
      item.index += v;
      item.index = Math.abs( item.index * 2 ) > model.length ? dir !== 'E' && offsetIndex ?
      v * 3 + offsetIndex - item.index : v + offsetIndex - item.index : item.index;
       
    } );

    render();
  }

  var start = true;

  container.addEventListener( 'click', function( event ){
    var target = event.target;
    if( start && target.className === 'prve' ){
      merryGoRound( 'E' );
      start = false;
      setTimeout( () => {
        start = true;
      }, 800 );
    }

    if( start && target.className === 'next' ){
      merryGoRound( 'W' );
      start = false;
      setTimeout( () => {
        start = true;
      }, 800 );
    }
  }, false );
   
  var startX,startY;
  window.addEventListener( 'touchstart',function( event ){
    startX = event.touches[ 0 ].pageX;
    startY = event.touches[ 0 ].pageY;
  }, false );
 
  window.addEventListener( 'touchend', function( event ){
    var endX = event.changedTouches[ 0 ].pageX;
    var endY = event.changedTouches[ 0 ].pageY;
    
    if( start ){
      merryGoRound( direction( [ endX, endY ], [ startX, startY ] ) ); 
      start = false;
      setTimeout( () => {
        start = true;
      }, 800 );
    }
  }, false );
}  

},{"./scripts/libs/direction":2,"./scripts/models/mode.json":3}],2:[function(require,module,exports){
var direction = module.exports = function(){
  var atan2 = Math.atan2, PI = Math.PI;
  var directions = [ 'SW', 'W', 'NW', 'N', 'Ne', 'E', 'SE', 'S' ];
  return function( p1, p2 ){
    var n = Math.floor( ( atan2( p2[ 1 ] - p1[ 1 ], p2[ 0 ] - p1[ 0 ] ) * 180 / PI + 250 ) / 45 ) % 8;
    return directions[ n ];
  }
}();


},{}],3:[function(require,module,exports){
module.exports=[
  { 
    "title": "风车",
    "pic": "images/1.jpg"  
  },
  { 
    "title": "上海迪斯尼",
    "pic": "images/2.jpg"  
  },
  { 
    "title": "时钟",
    "pic": "images/3.jpg"
  },
  { 
    "title": "长颈鹿",
    "pic": "images/4.jpg"
  },
  { 
    "title": "骑手",
    "pic": "images/5.jpg"
  },
  { 
    "title": "风车",
    "pic": "images/1.jpg"  
  },
  { 
    "title": "上海迪斯尼",
    "pic": "images/2.jpg"  
  },
  { 
    "title": "时钟",
    "pic": "images/3.jpg"
  },
  { 
    "title": "长颈鹿",
    "pic": "images/4.jpg"
  }
]
},{}]},{},[1])