/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _drag = __webpack_require__(1);

	var _closest = __webpack_require__(4);

	var _model = __webpack_require__(5);

	var _model2 = _interopRequireDefault(_model);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var container = document.getElementById('container');
	var desktopContainer = document.getElementById('desktop-container');
	var sliderNav = container.querySelector('.slider-nav');
	var sliderPrev = container.querySelector('.slider-prev');
	var sliderNext = container.querySelector('.slider-next');
	var dockContainer = document.getElementById('dock-container');
	var dock = container.querySelector('.dock');
	var dockApp = container.querySelector('.dock-app');
	var downMenu = container.querySelector('.down-menu');
	var upMenu = container.querySelector('.up-menu');
	var sliderDesktop = document.getElementById('slider-desktop');
	var indexBlock = container.querySelector('.index-block');
	var screenSize = [document.documentElement.clientWidth, document.documentElement.clientHeight];
	screenSize[1] = screenSize[1] > 400 ? screenSize[1] : 400;

	var zoom = [];

	// var maxScaleX = 0.056;
	// var minScaleX = 0.047;
	// var maxScaleY = 0.11;
	// var maxScaleY = 0.1;
	// var rangeNumber = ( max, min )=>{

	// }

	var _ref = screenSize[0] > screenSize[1] ? [0.006 * screenSize[0], 0.012 * screenSize[1]] : [0.015 * screenSize[0], 0.012 * screenSize[1]];

	var _ref2 = _slicedToArray(_ref, 2);

	zoom[0] = _ref2[0];
	zoom[1] = _ref2[1];
	var iconSize = screenSize[0] > screenSize[1] ? 0.056 * screenSize[0] : 0.11 * screenSize[1];

	iconSize = iconSize < 70 && screenSize[0] > screenSize[1] ? 80 : iconSize;

	var configs = {
	  containerSize: [screenSize[0], screenSize[1]],
	  desktopSize: [screenSize[0], screenSize[1] * 0.81],
	  dockStartPosition: [0.188 * screenSize[0], screenSize[1] * 0.04],
	  dockSpaceSize: [0.14 * screenSize[0], 0.067 * screenSize[1]],
	  dockContainerSize: [screenSize[0], screenSize[1] * 0.19],
	  dockSize: [screenSize[0], 0.24 * screenSize[1]],
	  dockTop: 0.03 * screenSize[1]
	};

	var desktopHeight = configs.desktopSize[1] - screenSize[1] * 0.06;

	var colNum = screenSize[0] > screenSize[1] ? screenSize[0] > 1000 ? 7 : screenSize[0] > 600 ? 6 : 5 : 4;
	var rowNum = 4,
	    rowNumLast = null;

	var desktopSpaceSize = [Math.floor((screenSize[0] - colNum * iconSize) / (colNum + 1)), Math.floor((desktopHeight - rowNum * iconSize) / (rowNum + 1))];

	var clongDesktopSpaceSize = [];

	clongDesktopSpaceSize[0] = desktopSpaceSize[0];
	clongDesktopSpaceSize[1] = desktopSpaceSize[1];

	var HTML = function () {
	  var html = function html(_html) {
	    this.html = _html;
	  };

	  html.prototype.getElementsByHtml = function (html) {
	    var elt = document.createElementNS('xml', 'x');
	    elt.innerHTML = Array.isArray(html) ? html.join('') : html;
	    var eltChildNodes = elt.childNodes;
	    return [].slice.call(eltChildNodes, 0);
	  };

	  html.prototype.innerHTML = function (container, element, html) {
	    var htmls = this.getElementsByHtml(this.html);
	    htmls.forEach(function (item) {
	      container.insertBefore(item, element);
	    });
	    return htmls.length === 1 ? htmls[0] : htmls;
	  };

	  html.prototype.append = function (container, html) {
	    return this.innerHTML(container, null, this.html);
	  };

	  html.prototype.prepend = function (container, html) {
	    return this.innerHTML(container, container.firstChild, this.html);
	  };

	  html.prototype.before = function (element, html) {
	    return this.innerHTML(element.parentNode, element, this.html);
	  };

	  html.prototype.after = function (element, html) {
	    return this.innerHTML(element.parentNode, element.nextSibling, this.html);
	  };

	  html.prototype.replace = function (element, html) {
	    var htmls = this.getElementsByHtml(this.html);
	    htmls.forEach(function (item) {
	      element.parentNode.insertBefore(item, element);
	    });
	    return element.parentNode.removeChild(element);
	  };
	  return function (h) {
	    return new html(h);
	  };
	}();

	window.addEventListener('resize', function () {
	  screenSize = [document.documentElement.clientWidth, document.documentElement.clientHeight];
	  screenSize[1] = screenSize[1] > 400 ? screenSize[1] : 400;
	  colNum = screenSize[0] > screenSize[1] ? screenSize[0] > 1000 ? 7 : screenSize[0] > 800 ? 6 : 5 : 4;
	  iconSize = screenSize[0] > screenSize[1] ? 0.056 * screenSize[0] : 0.11 * screenSize[1];
	  iconSize = iconSize < 70 && screenSize[0] > screenSize[1] ? 80 : iconSize;

	  var _ref3 = screenSize[0] > screenSize[1] ? [0.006 * screenSize[0], 0.012 * screenSize[1]] : [0.015 * screenSize[0], 0.012 * screenSize[1]];

	  var _ref4 = _slicedToArray(_ref3, 2);

	  zoom[0] = _ref4[0];
	  zoom[1] = _ref4[1];


	  configs = {
	    containerSize: [screenSize[0], screenSize[1]],
	    desktopSize: [screenSize[0], screenSize[1] * 0.81],
	    dockStartPosition: [0.188 * screenSize[0], screenSize[1] * 0.04],
	    dockSpaceSize: [0.14 * screenSize[0], 0.067 * screenSize[1]],
	    dockContainerSize: [screenSize[0], screenSize[1] * 0.19],
	    dockSize: [screenSize[0], 0.24 * screenSize[1]],
	    dockTop: 0.03 * screenSize[1]
	  };

	  desktopHeight = configs.desktopSize[1] - screenSize[1] * 0.06;
	  desktopSpaceSize = [Math.floor((screenSize[0] - colNum * iconSize) / (colNum + 1)), Math.floor((desktopHeight - rowNum * iconSize) / (rowNum + 1))];

	  desktopRender();
	  dockRender();
	  desktopItemMoveIndex();
	  allTitlePosition();
	}, false);

	var css = {
	  transform: function transform(element, position) {
	    return element.style.transform = 'translate3d(' + position[0] + 'px,' + position[1] + 'px,0px)';
	  },

	  translate3dScale: function translate3dScale(element, position, scale) {
	    return element.style.transform = 'translate3d(' + position[0] + 'px,\n    ' + position[1] + 'px,0px) scale(' + scale[0] + ',' + scale[1] + ')';
	  },

	  spaceIndexLeftWidth: function spaceIndexLeftWidth(element, position) {
	    element.style.left = position[0] + 'px';
	    element.style.width = position[1] + 'px';
	  },

	  enlarge: function enlarge(desktop, element) {
	    var containerSize = [configs.containerSize[0], configs.containerSize[1]];
	    var x = containerSize[0] / iconSize;
	    var y = containerSize[1] / iconSize;
	    var elementLeft = element.getBoundingClientRect().left;
	    var elementTop = element.getBoundingClientRect().top;
	    var translateX = desktop.offsetWidth * zoom[0] / 2 - desktop.offsetWidth / 2 - (elementLeft * zoom[0] - (desktop.offsetWidth / 2 - iconSize * zoom[0] / 2));
	    var translateY = configs.desktopSize[1] * zoom[1] / 2 - configs.desktopSize[1] / 2 - (elementTop * zoom[1] - (configs.desktopSize[1] / 2 - iconSize * zoom[1] / 2)) + configs.dockSize[1] / 2 - 14;

	    desktopContainer.style.height = configs.containerSize[1] + 'px';
	    container.parentNode.onmousewheel = function () {
	      return false;
	    };
	    desktop.style.transform = 'translate3d(' + translateX + 'px,' + translateY + 'px,0px) scale(' + zoom[0] + ',' + zoom[1] + ')';

	    var _element$lastChild = element.lastChild;
	    var style = _element$lastChild.style;
	    var firstChild = _element$lastChild.firstChild;
	    var classList = _element$lastChild.classList;
	    var lastChild = _element$lastChild.lastChild;
	    var elStyle = element.parentNode.elStyle;

	    var appOff = element.lastChild.firstChild;
	    appOff.style.top = configs.desktopSize[1] / 4 / y + 'px';
	    appOff.style.left = screenSize[0] / 4 / x + 'px';
	    style.transform = 'translate3d(0,0,0) scale(' + x / zoom[0] + ',' + y / zoom[1] + ')';
	    firstChild.style.transform = 'translate3d(0,0,0) scale(' + zoom[0] / x + ',' + zoom[1] / y + ')';
	    classList.remove('hidden');
	    lastChild.classList.remove('hidden');
	    element.parentNode.style.zIndex = 20;
	    element.parentNode.position = 'absolute';
	    dockContainer.style.zIndex = 0;
	    sliderNext.style.display = 'none';
	    sliderPrev.style.display = 'none';
	    dockContainer.style.transform = 'translate3d(' + -2000 + 'px,' + -1700 + 'px,0px) scale(' + zoom[0] + ',' + zoom[1] + ')';
	  },

	  transformPosition: function transformPosition(element, position, pos) {
	    var Pos = pos === undefined ? [0, 0] : pos;
	    element.style.transform = 'translate3d(' + (Pos[0] + position[0]) + 'px,' + (Pos[1] + position[1]) + 'px,0px)';
	  },

	  reduce: function reduce(desktop, element) {
	    desktop.style.transform = 'scale(1,1)';
	    desktopContainer.style.height = configs.desktopSize[1] + 'px';
	    element.parentNode.style.transform = 'scale(1,1)';
	    container.parentNode.onmousewheel = function () {
	      return true;
	    };
	    setTimeout(function () {
	      return element.parentNode.classList.add('hidden');
	    }, 180);

	    console.log(element.parentNode);
	    element.parentNode.style.zIndex = 2;
	    element.classList.add('hidden');
	    dockContainer.style.zIndex = 2;
	    sliderNext.style.display = 'block';
	    sliderPrev.style.display = 'block';
	    dockContainer.style.transform = 'translate3d(0,0,0) scale(1,1)';
	  },

	  position: function position(element, _position) {
	    element.style.left = _position[0] + 'px';
	    element.style.top = _position[1] + 'px';
	  },

	  size: function size(element, _size) {
	    element.style.width = _size[0] + 'px';
	    element.style.height = _size[1] + 'px';
	  }
	};

	var enlarge = function enlarge(element) {
	  var containerSize = [configs.containerSize[0], configs.containerSize[1]];
	  var x = containerSize[0] / iconSize;
	  var y = containerSize[1] / iconSize;
	  var elementPosition = getTransformPosition(element.parentNode);
	  var translateX = containerSize[0] * zoom[0] / 2 - containerSize[0] / 2 - (elementPosition[0] * zoom[0] - (containerSize[0] / 2 - iconSize * zoom[0] / 2));
	  var translateY = containerSize[1] * zoom[1] / 2 - containerSize[1] / 2 - (elementPosition[1] * zoom[1] - (containerSize[1] / 2 - iconSize * zoom[1] / 2)) - (containerSize[1] - dock.offsetHeight) - 10;

	  dock.style.transform = 'translate3d(' + translateX + 'px,' + translateY + 'px,0px) scale(' + zoom[0] + ',' + zoom[1] + ')';
	  dock.style.height = containerSize[1] + 'px';

	  element.lastChild.style.transform = 'translate3d(0,0,0) scale(' + x / zoom[0] + ',' + y / zoom[1] + ')';
	  element.lastChild.firstChild.style.transform = 'translate3d(0,0,0) scale(' + zoom[0] / x + ',' + zoom[1] / y + ')';

	  var appOff = element.lastChild.firstChild;

	  appOff.style.top = configs.desktopSize[1] / 4 / y + 'px';
	  appOff.style.left = screenSize[0] / 4 / x + 'px';
	  element.lastChild.classList.remove('hidden');
	  element.lastChild.lastChild.classList.remove('hidden');
	  dockContainer.style.zIndex = 2;
	  sliderNext.style.display = 'none';
	  sliderPrev.style.display = 'none';
	  desktopContainer.style.transform = 'translate3d(' + translateX + 'px,-1700px,0px) scale(' + zoom[0] + ',' + zoom[1] + ')';
	};

	var reduce = function reduce(element) {
	  (0, _closest.closest)(element, '.dock').style.transform = 'scale(1,1)';
	  setTimeout(function () {
	    dock.style.height = configs.dockSize[1] + 'px';
	  }, 1000);
	  element.parentNode.style.transform = 'scale(1,1)';
	  setTimeout(function () {
	    return element.parentNode.classList.add('hidden');
	  }, 180);
	  element.classList.add('hidden');
	  dockContainer.style.zIndex = 2;
	  desktopContainer.style.transform = 'translate3d(0,0,0) scale(1,1)';
	  sliderNext.style.display = 'block';
	  sliderPrev.style.display = 'block';
	};

	var desktopNum = -1;
	var getTransformPosition = function getTransformPosition(element) {
	  var str = element.style.transform;
	  var position = [Number(parseFloat(str.substring(12).split(','))), Number(parseFloat(str.substring(12).split(',')[1]))];
	  return position;
	};

	var desktopRender = function desktopRender() {
	  var desktop, sliderItem, item;

	  _model2.default.desktops.forEach(function (el, index) {

	    if (!el.desktop) {
	      el.desktop = document.createElement('div');
	      el.desktop.className = 'desktop';
	      el.desktop.setAttribute('data-index', index);
	      el.desktop.setAttribute('data-i', index);
	      sliderDesktop.appendChild(el.desktop);
	    }

	    var style = container.style,
	        elStyle = el.desktop.style;

	    style.width = configs.containerSize[0] + 'px';
	    style.height = configs.containerSize[1] + 'px';
	    elStyle.width = configs.desktopSize[0] + 'px';
	    elStyle.height = configs.desktopSize[1] + 'px';
	    desktopContainer.style.height = configs.desktopSize[1] + 'px';
	    sliderDesktop.style.height = configs.desktopSize[1] + 'px';
	    css.transform(el.desktop, [configs.containerSize[0] * el.desktop.dataset.index, 0]);

	    if (!el.sliderItem) {
	      el.sliderItem = document.createElement('li');
	      el.sliderItem.setAttribute('data-index', index);
	      el.sliderItem.className = index === 0 ? 'slider-item checked' : 'slider-item';
	      sliderNav.appendChild(el.sliderItem);
	    }

	    el.forEach(function (element, index) {

	      if (!element.item) {
	        desktopNum++;
	        element.item = HTML(['<div class="item-container">', '<div class="item" data-index="' + index + '" style="background-image: url(' + element.pic + ');">', '<div class="title">' + element.title + '</div>', '<div class="before-space"></div>', '<div class="after-space hidden"></div>', '<div class="close"></div>', '<div class="app hidden">', '<input type="button" value="关闭" class="desktop-app-off hidden">', '</div>', '</div>', '<div class="inline-box hidden" data-index="' + index + '"></div>', '<div class="app hidden"></div>', '<input class="inline-box-name hidden" type="text" value="未定义">', '</div>']).append(el.desktop);
	      }

	      css.size(element.item, [iconSize, iconSize]);

	      element.item.style.display = rowNum > (index / colNum | 0) ? 'block' : 'none';

	      if (rowNum * colNum - 1 === index) rowNumLast = getTransformPosition(element.item);

	      css.transform(element.item, [desktopSpaceSize[0] + index % colNum * (desktopSpaceSize[0] + iconSize), desktopSpaceSize[1] + (index / colNum | 0) * (desktopSpaceSize[1] + iconSize)]);
	    });
	  });
	};

	desktopRender();

	var desktopItemMoveIndex = function desktopItemMoveIndex() {
	  Array.from(desktopContainer.querySelectorAll('.before-space')).forEach(function (element) {
	    element.style.left = -desktopSpaceSize[0] + 'px';
	    element.style.width = desktopSpaceSize[0] + 'px';
	  });

	  Array.from(desktopContainer.querySelectorAll('.after-space')).forEach(function (element) {
	    element.style.left = iconSize + 'px';
	    element.style.width = desktopSpaceSize[0] + 'px';
	  });
	};

	desktopItemMoveIndex();

	var dockEl = void 0;
	var dockRender = function dockRender() {
	  _model2.default.dock.forEach(function (element, index) {
	    if (!element.item) {
	      element.item = HTML(['<div class="item-container">', '<div class="item" data-index="' + index + '" style="background-image: url(' + element.pic + ');">', '<div class="title">' + element.title + '</div>', '<div class="before-space"></div>', '<div class="after-space hidden"></div>', '<div class="close"></div>', '<div class="app hidden">', '<input type="button" value="关闭" class="dock-app-off hidden">', '</div>', '</div>', '</div>']).append(dock);
	    }

	    var length = Array.from(dock.children).length;
	    var beforeSpace = dockContainer.querySelectorAll('.before-space')[index];
	    var title = dockContainer.querySelectorAll('.title')[index];

	    beforeSpace.style.left = -desktopSpaceSize[0] + 'px';
	    beforeSpace.style.width = desktopSpaceSize[0] + 'px';
	    title.style.top = iconSize + 8 + 'px';

	    css.size(element.item, [iconSize, iconSize]);
	    dockContainer.style.height = configs.dockContainerSize[1] + 'px';
	    dock.style.height = configs.dockSize[1] + 'px';
	    dock.style.top = -configs.dockTop + 'px';

	    css.transform(element.item, [desktopSpaceSize[0] + index * (desktopSpaceSize[0] + iconSize), configs.dockStartPosition[1]]);
	  });
	};

	dockRender();

	var allTitlePosition = function allTitlePosition() {
	  Array.from(container.querySelectorAll('.title')).forEach(function (element) {
	    element.style.top = iconSize + 8 + 'px';
	  });
	};

	allTitlePosition();

	var box = document.createElement('div');
	box.className = 'box';
	container.appendChild(box);

	// let dockBox = document.createElement( 'div' );
	// dockBox.className = 'dockBox';
	// dockContainer.appendChild( dockBox );

	var spaceStyle = function spaceStyle(container, html) {
	  css.spaceIndexLeftWidth(html.length ? html[0] : html, [-configs.dockSpaceSize[0] + iconSize, configs.dockSpaceSize[0] - iconSize]);
	  container.length === 3 ? css.spaceIndexLeftWidth(html[2], [iconSize, configs.dockSpaceSize[0] - iconSize]) : null;
	};

	var sliderDesktopIndexEndPositionRender = function sliderDesktopIndexEndPositionRender() {
	  Array.from(sliderDesktop.children).forEach(function (item, index) {
	    Array.from(item.children).forEach(function (el, index) {
	      var elIndex = Number(el.firstChild.dataset.index);

	      elIndex === colNum - 1 || elIndex === colNum * 2 - 1 || elIndex === colNum * 3 - 1 || elIndex === colNum * 4 - 1 ? (0, _closest.closest)(el.firstChild, '.after-space hidden') !== null ? (0, _closest.closest)(el.firstChild, '.after-space hidden').classList.remove('hidden') : '' : (0, _closest.closest)(el.firstChild, '.after-space') !== null ? (0, _closest.closest)(el.firstChild, '.after-space').classList.add('hidden') : '';

	      el.style.display = rowNum > (elIndex / colNum | 0) ? 'block' : 'none';

	      if (rowNum * colNum === index) rowNumLast = getTransformPosition(el);

	      css.transform(el, [desktopSpaceSize[0] + elIndex % colNum * (desktopSpaceSize[0] + iconSize), desktopSpaceSize[1] + (elIndex / colNum | 0) * (desktopSpaceSize[1] + iconSize)]);
	    });
	  });
	};

	var sliderDockIndexEndPositionRender = function sliderDockIndexEndPositionRender() {
	  var itemArr = Array.from(dock.children);
	  var length = itemArr.length;
	  itemArr.forEach(function (item) {
	    var elIndex = length - 1 !== 0 ? Number(item.firstChild.dataset.index) : 0;
	    (0, _closest.closest)(item.firstChild, '.after-space') !== null ? (0, _closest.closest)(item.firstChild, '.after-space').classList.add('hidden') : null;
	    css.transform(item, [desktopSpaceSize[0] + elIndex * (desktopSpaceSize[0] + iconSize), configs.dockStartPosition[1]]);
	  });
	};

	var inlineBoxIndexEndPositionRender = function inlineBoxIndexEndPositionRender(element) {
	  Array.from(element.children).forEach(function (item, index) {
	    var elIndex = Number(item.firstChild.dataset.index);
	    item.firstChild.classList.add('animate');
	    inlineBoxHtml = HTML(['<div class="before-space"></div>', '<div class="close"></div>', elIndex % colNum === colNum - 1 ? '<div class="after-space"></div>' : '']).append(item.firstChild);

	    css.transform(item, [desktopSpaceSize[0] - 80 + elIndex % colNum * (desktopSpaceSize[0] - 160), desktopSpaceSize[1] + (elIndex / colNum | 0) * desktopSpaceSize[1]]);
	  });
	};

	var positionTest = function positionTest(container, position) {
	  var arr = Array.from(container.children);
	  var containerSize = [container.offsetWidth, container.offsetHeight];
	  var item = arr.length - 1 !== -1 ? container.className === 'desktop' && rowNumLast !== null ? rowNumLast : getTransformPosition(arr[arr.length - 1]) : [0, 0];

	  if (container.className === 'desktop') {
	    if (item[0] + iconSize < position[0] && item[1] < position[1] && position[0] < containerSize[0] && position[1] < containerSize[1]) {
	      return true;
	    } else if (item[1] + iconSize < position[1] + 10 && position[0] < containerSize[0] && position[1] < containerSize[1]) {
	      return true;
	    } else {
	      return false;
	    }
	  } else {
	    if (item[0] + iconSize < position[0] && configs.containerSize[1] - containerSize[1] < position[1] && position[1] < configs.containerSize[1]) {
	      return true;
	    } else if (configs.desktopSize[1] > position[1] && configs.desktopSize[1] - sliderNav.offsetHeight < position[1]) {
	      return true;
	    }{
	      return false;
	    }
	  }
	};

	var target, times, mouseIsdown, startIndex, downIsIndex;
	var desktopItem, dockItem, modelItem, modelIndex, modelDesktopIndex;

	document.addEventListener('mousedown', function (event) {
	  mouseIsdown = true;
	  target = event.target;
	  if (target.className === 'item') {
	    times = setTimeout(function () {
	      sliderDesktopIndexEndPositionRender();
	      container.classList.add('animate');
	    }, 1500);
	  }

	  if ((0, _closest.closest)(target, '.hidden animate') && target.className === 'item') {
	    (function () {
	      var position = getTransformPosition(target.parentNode);
	      var dockpos = [position[0], position[1] + configs.desktopSize[1] - configs.dockTop];
	      var pos = (0, _closest.closest)(target, '.desktop') !== null ? position : dockpos;
	      css.transformPosition(box, pos);

	      (0, _drag.drag)(event, function (offsetPosition) {
	        return css.transformPosition(box, offsetPosition, pos);
	      });

	      if (box.firstChild === null) {
	        desktopItem = (0, _closest.closest)(target, '.desktop');
	        dockItem = (0, _closest.closest)(target, '.dock');
	        modelDesktopIndex = desktopItem !== null ? Number(desktopItem.dataset.i) : null;
	        modelIndex = Number(target.dataset.index);
	        modelItem = desktopItem !== null ? _model2.default.desktops[modelDesktopIndex].splice(modelIndex, 1)[0] : _model2.default.dock.splice(modelIndex, 1)[0];
	        target.classList.remove('animate');
	        target.classList.add('add');
	        target.parentNode.style.transform = '';
	        box.appendChild(target.parentNode);
	        startIndex = Number(target.dataset.index);
	        downIsIndex = true;
	      }
	    })();
	  }

	  // if( closest( target, '.hidden animate' ) && closest( target, '.dock' ) && target.className === 'item' ){
	  //   let dockpos = getTransformPosition( target.parentNode )
	  //   drag( event, offsetPosition => css.transformPosition( target.parentNode, offsetPosition, dockpos ) );  
	  //   if( box.firstChild === null ){
	  //     css.translate3dScale( box, [ 0, 0 ], [ 1, 1 ] );

	  //     target.classList.remove( 'animate' );
	  //     target.classList.add( 'add' );
	  //     dockBox.appendChild( target.parentNode );
	  //     startIndex = Number( target.dataset.index );
	  //   }
	  // }

	  if (target.className === 'desktop-app-off') {
	    var desktopElement = (0, _closest.closest)(target, '.desktop');
	    css.reduce(desktopElement, target);
	  }

	  if (target.className === 'dock-app-off') {
	    reduce(target);
	  }
	}, false);

	var desktopIndex = void 0,
	    dockIndex = void 0,
	    index = void 0,
	    desktopArr = void 0;
	document.body.addEventListener('mousemove', function (event) {
	  var target = event.target;
	  var className = target.className;
	  var containerArr = void 0;

	  if (box.firstChild) {
	    if (!downIsIndex) return;

	    if (className === 'desktop' || className === 'dock') {
	      desktopArr = Array.from(target.children);
	    }

	    var mousePosition = [event.clientX + window.pageXOffset, event.clientY + window.pageYOffset];
	    var limit = className === 'desktop' || className === 'dock' ? positionTest(target, mousePosition) : false;

	    if (limit) {
	      var length = desktopArr.length - 1;
	      index = length !== -1 ? Number(desktopArr[length].firstChild.dataset.index) + 1 : 0;
	      sequence(startIndex, index, target);
	      downIsIndex = false;
	    }
	  }
	}, false);

	var endIndex = void 0,
	    pageTurning = void 0,
	    latency = true;
	document.addEventListener('mouseover', function (event) {
	  var overOut = event.target;
	  var desktop = (0, _closest.closest)(overOut, '.desktop');
	  var dock = (0, _closest.closest)(overOut, '.dock');
	  var container = desktop !== null ? desktop : dock;
	  var leng = void 0,
	      itemIndex = void 0,
	      index = void 0,
	      containerArr = void 0;
	  var lastDesktopIndex = Number(_model2.default.desktops[_model2.default.desktops.length - 1].desktop.dataset.index);
	  var firstDesktopIndex = Number(_model2.default.desktops[0].desktop.dataset.index);

	  if (overOut.className === 'slider-next' && lastDesktopIndex !== 0) itemIndex = -1;

	  if (overOut.className === 'slider-prev' && firstDesktopIndex !== 0) itemIndex = 1;

	  if ((overOut.className === 'slider-next' || overOut.className === 'slider-prev') && itemIndex) {
	    for (var i = 0; i < _model2.default.desktops.length; i++) {
	      leng = Number(_model2.default.desktops[i].desktop.getAttribute('data-index')) + itemIndex;
	      _model2.default.desktops[i].sliderItem.className = leng === 0 ? 'slider-item checked' : 'slider-item';
	      _model2.default.desktops[i].desktop.setAttribute('data-index', leng);

	      if (leng === 0) desktopArr = _model2.default.desktops[i].desktop.children;
	    }

	    if (box.firstChild) startIndex = desktopArr.length;

	    desktopRender();
	  }

	  if (box.firstChild && !downIsIndex) {
	    if (overOut.className === 'desktop' || overOut.className === 'dock') {
	      containerArr = Array.from(overOut.children);
	      var length = containerArr.length - 1;
	      index = length !== -1 ? Number(containerArr[length].firstChild.dataset.index) + 1 : 0;
	      startIndex = index;
	    }
	  }

	  if (box.firstChild && (overOut.className === 'before-space' || overOut.className === 'after-space') && latency) {
	    if (overOut.className === 'before-space') {
	      endIndex = Number(overOut.parentNode.dataset.index);
	      endIndex = (endIndex === colNum || endIndex === colNum * 2 || endIndex === colNum * 3) && startIndex < endIndex ? endIndex + 1 : endIndex;
	      downIsIndex = true;
	      latency = false;
	    }

	    if (overOut.className === 'after-space') {
	      endIndex = typeof endIndex === 'number' && startIndex < endIndex ? Number(overOut.parentNode.dataset.index) + 1 : Number(overOut.parentNode.dataset.index);
	      downIsIndex = true;
	    }

	    sequence(startIndex, endIndex, container);
	    setTimeout(function () {
	      latency = true;
	    }, 200);
	  }

	  // if( box.firstChild && overOut.className === 'item animate' ){
	  //     let title = closest( overOut, '.title' );
	  //     let inlineBox = closest( overOut, '.inline-box hidden' )
	  //     let close = closest( overOut, '.close' );
	  //     let inlineBoxName = closest( overOut, '.inline-box-name hidden' );
	  //     inlineBoxName.classList.remove( 'hidden' );
	  //     title.classList.add( 'hidden' );
	  //     inlineBox.classList.remove( 'hidden' )
	  //     close.classList.add( 'hidden' );
	  //     let app = closest( overOut, '.app hidden' );
	  //     time = setTimeout( () => {
	  //       css.size( inlineBox, [
	  //         configs.containerSize[ 0 ] - iconSize * 2,
	  //         180
	  //       ] );
	  //       overOut.parentNode.style.zIndex = 4;
	  //       css.position( inlineBox, [ 
	  //         -overOut.getBoundingClientRect().left + iconSize,
	  //         configs.containerSize[ 1 ] / 2 - inlineBox.offsetHeight / 2 - 
	  //         overOut.getBoundingClientRect().top
	  //       ] );

	  //       inlineBox.style.opacity = 1;
	  //       inlineBox.style.zIndex = 8;
	  //       inlineBox.style.pointerEvents = '';
	  //       app.classList.remove( 'hidden' );
	  //       css.translate3dScale( app, [
	  //         configs.containerSize[ 0 ] / 2 - ( overOut.getBoundingClientRect().left + overOut.offsetWidth / 2 ),
	  //         configs.containerSize[ 1 ] / 2 - ( overOut.getBoundingClientRect().top + overOut.offsetHeight / 2 )
	  //       ],[
	  //         configs.containerSize[ 0 ] / app.offsetWidth,
	  //         configs.containerSize[ 1 ] / app.offsetHeight
	  //       ] );
	  //       css.position( inlineBoxName, [
	  //         ( configs.containerSize[ 0 ] - inlineBoxName.offsetWidth ) / 2 - 
	  //         overOut.getBoundingClientRect().left,
	  //         configs.containerSize[ 1 ] / 2 - inlineBox.offsetHeight / 2 - 
	  //         overOut.getBoundingClientRect().top - inlineBoxName.offsetHeight
	  //       ] );

	  //       inlineBox.appendChild( overOut );
	  //     }, 1000 );
	  // }

	  // document.addEventListener( 'mouseout', () => {
	  //   if( box.firstChild && overOut.className === 'item animate' ){
	  //     clearTimeout( time )
	  //   }
	  // }, false );
	}, false);

	var size = void 0;

	document.addEventListener('mouseup', function (event) {
	  var target = event.target;
	  clearTimeout(times);

	  if (mouseIsdown && (0, _closest.closest)(target, '.hidden animate') === null && target.className === 'item' && (0, _closest.closest)(target, '.desktop')) {
	    css.enlarge((0, _closest.closest)(target, '.desktop'), target);
	    mouseIsdown = false;
	  }

	  if (mouseIsdown && (0, _closest.closest)(target, '.dock') && target.className === 'item' && (0, _closest.closest)(target, '.hidden animate') === null) {
	    enlarge(target);
	  }

	  if (box.firstChild) {
	    rowNumLast = null;
	    (0, _closest.closest)(target, '.desktop') !== null ? css.transformPosition(box.firstChild, getTransformPosition(box)) : css.transformPosition(box.firstChild, getTransformPosition(box), [0, -configs.desktopSize[1] + configs.dockTop]);
	    box.firstChild.firstChild.dataset.index = startIndex;
	    box.firstChild.firstChild.classList.remove('add');

	    if (target.className === 'desktop' || target.className === 'dock') {
	      var itemArr = Array.from(target.children);
	      var length = itemArr.length - 1;

	      if (length === -1) {
	        target.appendChild(box.firstChild);
	      }

	      itemArr.forEach(function (item, index) {
	        if (Array.from(target.children).length === startIndex) target.appendChild(box.firstChild);

	        if (index === startIndex) target.insertBefore(box.firstChild, item);
	      });

	      target.className === 'desktop' ? _model2.default.desktops[Number(target.dataset.i)].splice(startIndex, 0, modelItem) : _model2.default.dock.splice(startIndex, 0, modelItem);
	      target.className === 'desktop' ? setTimeout(function () {
	        return sliderDesktopIndexEndPositionRender();
	      }, 40) : setTimeout(function () {
	        return sliderDockIndexEndPositionRender();
	      }, 40);
	      startIndex = null, endIndex = null;
	    }

	    if (target.className === 'before-space') {
	      var itemContainer = (0, _closest.closest)(target, '.item-container');
	      var desktop = (0, _closest.closest)(target, '.desktop');
	      var _dock = (0, _closest.closest)(target, '.dock');
	      var _container = desktop !== null ? desktop : _dock;

	      _container.insertBefore(box.firstChild, itemContainer);
	      target.className === 'desktop' ? _model2.default.desktops[Number(target.dataset.i)].splice(startIndex, 0, modelItem) : _model2.default.dock.splice(startIndex, 0, modelItem);
	      _container.className === 'desktop' ? setTimeout(function () {
	        return sliderDesktopIndexEndPositionRender();
	      }, 40) : setTimeout(function () {
	        return sliderDockIndexEndPositionRender();
	      }, 40);
	      startIndex = null, endIndex = null;
	    }
	  }
	}, false);

	document.addEventListener('keydown', function (event) {

	  switch (window.event.keyCode) {
	    case 13:
	    case 32:
	      container.classList.remove('animate');
	      container.classList.add('hidden');
	      break;
	  }
	}, false);

	var start = void 0,
	    ends = void 0,
	    end = void 0;

	var sequence = function sequence(indexA, indexB, desktop) {

	  if (indexA - indexB === -1 || indexA - indexB === 0) {
	    return;
	  }
	  start = indexA < indexB ? indexA : indexB;
	  ends = indexA < indexB ? indexB : indexA;
	  end = indexA < indexB ? ends - 1 : ends;

	  var sub = Array.from(desktop.children).slice(start, end);

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = sub[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var item = _step.value;

	      var itemChild = item.firstChild;
	      itemChild.dataset.index = indexA < indexB ? Number(itemChild.dataset.index) - 1 : Number(itemChild.dataset.index) + 1;
	      css.transform(item, [desktopSpaceSize[0] + Number(itemChild.dataset.index) % colNum * desktopSpaceSize[0], desktopSpaceSize[1] + (Number(itemChild.dataset.index) / colNum | 0) * desktopSpaceSize[1]]);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  startIndex = indexA < indexB ? indexB - 1 : indexB;
	  desktop.className === 'desktop' ? setTimeout(function () {
	    return sliderDesktopIndexEndPositionRender();
	  }, 40) : setTimeout(function () {
	    return sliderDockIndexEndPositionRender();
	  }, 40);
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.drag = drag;

	var _distance = __webpack_require__(2);

	var _eventHelps = __webpack_require__(3);

	var currentPosition, movingPosition;
	function drag(event, move) {
	  currentPosition = [event.clientX, event.clientY];
	  event.preventDefault();
	  move = move || Function();

	  function moving(event) {
	    movingPosition = [event.clientX, event.clientY];
	    var offsetPosition = [movingPosition[0] - currentPosition[0], movingPosition[1] - currentPosition[1]];
	    if ((0, _distance.distance)(currentPosition, movingPosition) > 6) {
	      move(offsetPosition);
	    }
	  }

	  function up(event) {
	    _eventHelps.eventHelps.off(document, 'mousemove', moving);
	    _eventHelps.eventHelps.off(document, 'mouseup', up);
	  }

	  _eventHelps.eventHelps.on(document, 'mousemove', moving);

	  _eventHelps.eventHelps.on(document, 'mouseup', up);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.distance = distance;
	function distance(positionA, positionB) {
	  return Math.sqrt(Math.pow(positionA[0] - positionB[0], 2) + Math.pow(positionA[0] - positionB[0], 2));
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var eventHelps = exports.eventHelps = {
	  on: function on(element, type, fn) {
	    if (element.addEventListener) {
	      element.addEventListener(type, fn, false);
	    } else if (element.attachEvent) {
	      element.attachEvent('on' + type, fn);
	    } else {
	      element['on' + type] = fn;
	    }
	  },
	  off: function off(element, type, fn) {
	    if (element.removeEventListener) {
	      element.removeEventListener(type, fn, false);
	    } else if (element.detachEvent) {
	      element.detachEvent('on' + type, fn);
	    } else {
	      element['on' + type] = null;
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.closest = closest;
	function closest(el, string) {
	  var regexp = /^\./;
	  var initialEl = el;
	  if (regexp.test(string)) {
	    while (el && el.tagName && el.className !== string.replace(regexp, '')) {
	      el = el.parentNode;
	    }if (!el.tagName) {
	      [].slice.call(initialEl.parentNode.children, 0).forEach(function (item) {
	        if (item.className === string.replace(regexp, '')) el = item;
	      });
	    }
	    if (!el.tagName) {
	      [].slice.call(initialEl.children, 0).forEach(function (item) {
	        if (item.className === string.replace(regexp, '')) el = item;
	      });
	    }
	  } else {
	    while (el && el.tagName && el.tagName.toLowerCase() !== tagName.toLowerCase()) {
	      el = el.parentNode;
	    }
	  }

	  return el.tagName ? el : null;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"desktops": [
			[
				{
					"title": "微信",
					"pic": "./images/weixin.png"
				},
				{
					"title": "高德地图",
					"pic": "./images/gaode.png"
				},
				{
					"title": "冰雪奇缘",
					"pic": "./images/bingxueqiyan.png"
				},
				{
					"title": "设置",
					"pic": "./images/settings.png"
				},
				{
					"title": "大众点评",
					"pic": "./images/dazhongdianping.png"
				},
				{
					"title": "豆瓣",
					"pic": "./images/douban.png"
				},
				{
					"title": "淘宝",
					"pic": "./images/taobao.png"
				},
				{
					"title": "UC浏览器",
					"pic": "./images/uc.png"
				},
				{
					"title": "有道词典",
					"pic": "./images/youdao.png"
				},
				{
					"title": "支付宝",
					"pic": "./images/zhifubao.png"
				},
				{
					"title": "星盘",
					"pic": "./images/xingpan.png"
				},
				{
					"title": "smule",
					"pic": "./images/smule.png"
				},
				{
					"title": "相片",
					"pic": "./images/photos.png"
				},
				{
					"title": "提醒事项",
					"pic": "./images/reminders.png"
				}
			],
			[
				{
					"title": "微信",
					"pic": "./images/weixin.png"
				},
				{
					"title": "QQ",
					"pic": "./images/qq.png"
				},
				{
					"title": "冰雪奇缘",
					"pic": "./images/bingxueqiyan.png"
				},
				{
					"title": "设置",
					"pic": "./images/settings.png"
				},
				{
					"title": "大众点评",
					"pic": "./images/dazhongdianping.png"
				},
				{
					"title": "豆瓣",
					"pic": "./images/douban.png"
				}
			],
			[
				{
					"title": "淘宝",
					"pic": "./images/taobao.png"
				},
				{
					"title": "UC浏览器",
					"pic": "./images/uc.png"
				},
				{
					"title": "有道词典",
					"pic": "./images/youdao.png"
				},
				{
					"title": "支付宝",
					"pic": "./images/zhifubao.png"
				},
				{
					"title": "星盘",
					"pic": "./images/xingpan.png"
				},
				{
					"title": "smule",
					"pic": "./images/smule.png"
				},
				{
					"title": "相片",
					"pic": "./images/photos.png"
				},
				{
					"title": "提醒事项",
					"pic": "./images/reminders.png"
				},
				{
					"title": "网易新闻",
					"pic": "./images/wangyinew.png"
				},
				{
					"title": "网易音乐",
					"pic": "./images/wangyiyun.png"
				},
				{
					"title": "查找",
					"pic": "./images/find.png"
				}
			],
			[
				{
					"title": "ICloud",
					"pic": "./images/icloud.png"
				},
				{
					"title": "爱奇艺",
					"pic": "./images/iqiyi.png"
				},
				{
					"title": "邮箱",
					"pic": "./images/mail.png"
				},
				{
					"title": "美颜相机",
					"pic": "./images/meiyanxiangji.png"
				},
				{
					"title": "备忘录",
					"pic": "./images/notes.png"
				},
				{
					"title": "新浪",
					"pic": "./images/sina.png"
				}
			]
		],
		"dock": [
			{
				"title": "电话",
				"pic": "./images/call.png"
			},
			{
				"title": "通信录",
				"pic": "./images/contacts.png"
			},
			{
				"title": "UC浏览器",
				"pic": "./images/uc.png"
			},
			{
				"title": "QQ",
				"pic": "./images/qq.png"
			},
			{
				"title": "多米音乐",
				"pic": "./images/duomi.png"
			}
		]
	};

/***/ }
/******/ ]);