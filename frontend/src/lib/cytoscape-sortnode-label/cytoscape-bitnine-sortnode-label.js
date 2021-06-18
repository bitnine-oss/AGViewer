/* eslint-disable */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cytoscapeBitnineSortnodeLabel"] = factory();
	else
		root["cytoscapeBitnineSortnodeLabel"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Copyright 2021 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var extend = __webpack_require__(2);
var defaults = __webpack_require__(1);

// constructor
// options : object containing layout options
function SortNodeLabel(options) {
  this.options = extend({}, defaults, options);
}

// runs the layout
SortNodeLabel.prototype.run = function () {
  var options = this.options;
  var eles = options.eles; // elements to consider in the layout
  var layout = this;

  // cy is automatically populated for us in the constructor
  // (disable eslint for next line as this serves as example layout code to external developers)
  // eslint-disable-next-line no-unused-vars
  var cy = options.cy;

  layout.emit('layoutstart');

  // puts all nodes at (0, 0)
  // n.b. most layouts would use layoutPositions(), instead of positions() and manual events  

  var onlyUnique = function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  };

  var labels = eles.nodes().map(function (node) {
    return node.data().label;
  });
  labels = labels.filter(onlyUnique);
  var lablesSortNumber = labels.map(function () {
    return 0;
  });

  eles.nodes().positions(function (node) {
    var verticalLineIndex = labels.indexOf(node.data().label);
    lablesSortNumber[verticalLineIndex] = lablesSortNumber[verticalLineIndex] + 1;
    return {
      x: 300 * verticalLineIndex + 100,
      y: lablesSortNumber[verticalLineIndex] * 100
    };
  });

  // trigger layoutready when each node has had its position set at least once
  layout.one('layoutready', options.ready);
  layout.emit('layoutready');

  // trigger layoutstop when the layout stops (e.g. finishes)
  layout.one('layoutstop', options.stop);
  layout.emit('layoutstop');

  return this; // chaining
};

// called on continuous layouts to stop them before they finish
SortNodeLabel.prototype.stop = function () {
  return this; // chaining
};

module.exports = SortNodeLabel;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Copyright 2021 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// default layout options
var defaults = {
  ready: function ready() {}, // on layoutready
  stop: function stop() {} // on layoutstop
};

module.exports = defaults;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Copyright 2021 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var extend = Object.assign != null ? Object.assign.bind(Object) : function (tgt) {
  var args = arguments;

  for (var i = 1; i < args.length; i++) {
    var obj = args[i];

    if (obj == null) {
      continue;
    }

    var keys = Object.keys(obj);

    for (var j = 0; j < keys.length; j++) {
      var k = keys[j];

      tgt[k] = obj[k];
    }
  }

  return tgt;
};

module.exports = extend;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Copyright 2021 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var impl = __webpack_require__(0);

// registers the extension on a cytoscape lib ref
var register = function register(cytoscape) {
  if (!cytoscape) {
    return;
  } // can't register if cytoscape unspecified

  cytoscape('layout', 'SortNodeLabel', impl); // register with cytoscape.js
};

if (typeof cytoscape !== 'undefined') {
  // expose to global cytoscape (i.e. window.cytoscape)  
  // eslint-disable-next-line no-undef
  register(cytoscape);
}

module.exports = register;

/***/ })
/******/ ]);
});