(function(modules){var installedModules={};function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:false};modules[moduleId].call(module.exports,module,module.exports,__webpack_require__);module.loaded=true;return module.exports}__webpack_require__.m=modules;__webpack_require__.c=installedModules;__webpack_require__.p="";return __webpack_require__(0)})([function(module,exports,__webpack_require__){"use strict";var _domRadey=__webpack_require__(1);var _direction=__webpack_require__(2);var _mode=__webpack_require__(3);var _mode2=_interopRequireDefault(_mode);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(0,_domRadey.domRadey)(function(){var config={"sliderWidth":600,"sliderHeight":400,"scale":50,"imgWidth":600,"rotate":60,"verticalAlign":{"top":0,"bottom":1,"middle":2}};var slider=document.getElementById("slider");var container=document.getElementById("container");var offsetIndex=_mode2.default.length%2?0:-1;var render=function render(){_mode2.default.forEach(function(item,index,arr){var moietyLength=Math.floor(arr.length/2);var abs=Math.abs;if(!item.el){item.el=document.createElement("div");item.index=index-moietyLength;item.el.className="item";item.el.style.backgroundImage="url("+item.pic+")";slider.appendChild(item.el)}var style=item.el.style;style.zIndex=item.index>0?-item.index:item.index;style.width=config.imgWidth+"px";style.height=config.sliderHeight-abs(item.index)*config.scale+"px";style.left=item.index*config.scale+"px";style.top=abs(item.index)*config.scale/config.verticalAlign.middle+"px";style.opacity=5/(abs(item.index)+5)})};render();function merryGoRound(dir){_mode2.default.forEach(function(item){var v=dir==="E"?-1:1;item.index+=v;item.index=Math.abs(item.index*2)>_mode2.default.length?dir!=="E"&&offsetIndex?v*3+offsetIndex-item.index:v+offsetIndex-item.index:item.index});render()}var start=true;container.addEventListener("click",function(event){var target=event.target;if(start&&target.className==="prve"){merryGoRound("E");start=false;setTimeout(function(){start=true},800)}if(start&&target.className==="next"){merryGoRound("W");start=false;setTimeout(function(){start=true},800)}},false);var startX,startY;window.addEventListener("touchstart",function(event){startX=event.touches[0].pageX;startY=event.touches[0].pageY},false);window.addEventListener("touchend",function(event){var endX=event.changedTouches[0].pageX;var endY=event.changedTouches[0].pageY;if(start){merryGoRound((0,_direction.direction)([endX,endY],[startX,startY]));start=false;setTimeout(function(){start=true},800)}},false)})},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var domRadey=exports.domRadey=function domRadey(fn){if(document.addEventListener){document.addEventListener("DOMContentLoaded",fn,false)}else{IEContenLoaded(fn)}function IEContenLoaded(fn){var done=false;var init=function(){if(!done){done=true;fn()}}(function(){try{window.document.documentElement.doScroll("left")}catch(error){setTimeout(argument.callee,1);return}init()})();window.document.onreadystatechange=function(){if(window.document.readyState=="complete"){window.document.onreadystatechange=null;init()}}}}},function(module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var direction=exports.direction=function(){var atan2=Math.atan2,PI=Math.PI;var directions=["SW","W","NW","N","Ne","E","SE","S"];return function(p1,p2){var n=Math.floor((atan2(p2[1]-p1[1],p2[0]-p1[0])*180/PI+250)/45)%8;return directions[n]}}()},function(module,exports){module.exports=[{"title":"风车","pic":"images/1.jpg"},{"title":"上海迪斯尼","pic":"images/2.jpg"},{"title":"时钟","pic":"images/3.jpg"},{"title":"长颈鹿","pic":"images/4.jpg"},{"title":"骑手","pic":"images/5.jpg"},{"title":"风车","pic":"images/1.jpg"},{"title":"上海迪斯尼","pic":"images/2.jpg"},{"title":"时钟","pic":"images/3.jpg"},{"title":"长颈鹿","pic":"images/4.jpg"}]}]);