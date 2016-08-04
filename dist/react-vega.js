(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("vega"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "vega"], factory);
	else if(typeof exports === 'object')
		exports["ReactVega"] = factory(require("react"), require("vega"));
	else
		root["ReactVega"] = factory(root["React"], root["vg"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.createClassFromSpec = createClassFromSpec;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _vega = __webpack_require__(2);

	var _vega2 = _interopRequireDefault(_vega);

	var _util = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function listenerName(signalName) {
	  return 'onSignal' + (0, _util.capitalize)(signalName);
	}

	function checkSpec(spec) {
	  return (0, _util.isFunction)(spec) ? spec() : spec;
	}

	var propTypes = {
	  spec: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
	  width: _react.PropTypes.number,
	  height: _react.PropTypes.number,
	  padding: _react.PropTypes.object,
	  viewport: _react.PropTypes.array,
	  renderer: _react.PropTypes.string,
	  data: _react.PropTypes.object
	};

	var Vega = function (_React$Component) {
	  _inherits(Vega, _React$Component);

	  function Vega(props) {
	    _classCallCheck(this, Vega);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Vega).call(this, props));

	    _this.state = {
	      spec: null
	    };
	    return _this;
	  }

	  _createClass(Vega, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var spec = checkSpec(this.props.spec);
	      this._initialize(spec);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (!this.props.isSpecFixed) {
	        var newSpec = checkSpec(nextProps.spec);
	        var newSpecString = JSON.stringify(newSpec);
	        var isNewSpec = this.state.specString !== newSpecString;

	        if (isNewSpec) {
	          this._clearListeners(this.state.vis, this.state.spec);
	          this._initialize(newSpec);
	        }

	        this.setState({ isNewSpec: isNewSpec });
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (!this.state.isNewSpec) {
	        this._update(this.state.vis, this.state.spec);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this._clearListeners(this.state.vis, this.state.spec);
	    }
	  }, {
	    key: '_initialize',
	    value: function _initialize(spec) {
	      var self = this;

	      // Parse the vega spec and create the vis
	      _vega2.default.parse.spec(spec, function (chart) {
	        var vis = chart({ el: self.refs.chartContainer });

	        // Attach listeners onto the signals
	        if (spec.signals) {
	          spec.signals.forEach(function (signal) {
	            vis.onSignal(signal.name, function () {
	              var listener = self.props[listenerName(signal.name)];
	              if (listener) {
	                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	                  args[_key] = arguments[_key];
	                }

	                listener.apply(self, args);
	              }
	            });
	          });
	        }

	        self._update(vis, spec);
	        // store the vis object to be used on later updates
	        if (self.props.isSpecFixed) {
	          self.setState({ vis: vis, spec: spec });
	        } else {
	          var specString = JSON.stringify(spec);
	          self.setState({ vis: vis, spec: spec, specString: specString });
	        }
	      });
	    }
	  }, {
	    key: '_clearListeners',
	    value: function _clearListeners(vis, spec) {
	      // Remove listeners from the signals
	      if (vis && spec && spec.signals) {
	        spec.signals.forEach(function (signal) {
	          return vis.offSignal(signal.name);
	        });
	      }
	    }
	  }, {
	    key: '_update',
	    value: function _update(vis, spec) {
	      var props = this.props;
	      if (vis && spec) {
	        vis.width(props.width || spec.width).height(props.height || spec.height).padding(props.padding || spec.padding).viewport(props.viewport || spec.viewport);
	        if (props.renderer) {
	          vis.renderer(props.renderer);
	        }
	        this._updateData(vis, spec);
	        vis.update();
	      }
	    }
	  }, {
	    key: '_updateData',
	    value: function _updateData(vis, spec) {
	      // TODO: Can check if data changes
	      var props = this.props;
	      if (vis && spec && spec.data && props.data) {
	        vis.update();
	        spec.data.forEach(function (d) {
	          var newData = props.data[d.name];
	          if (newData) {
	            if ((0, _util.isFunction)(newData)) {
	              newData(vis.data(d.name));
	            } else {
	              vis.data(d.name).remove(function () {
	                return true;
	              }).insert(newData);
	            }
	          }
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return(
	        // Create the container Vega draws inside
	        _react2.default.createElement('div', { ref: 'chartContainer', __self: this
	        })
	      );
	    }
	  }]);

	  return Vega;
	}(_react2.default.Component);

	Vega.propTypes = propTypes;

	exports.default = Vega;
	function createClassFromSpec(name, spec) {
	  spec = checkSpec(spec);

	  var propTypes = {
	    width: _react.PropTypes.number,
	    height: _react.PropTypes.number,
	    padding: _react.PropTypes.object,
	    viewport: _react.PropTypes.array,
	    renderer: _react.PropTypes.string,
	    data: _react.PropTypes.object
	  };
	  if (spec.signals) {
	    spec.signals.forEach(function (signal) {
	      propTypes[listenerName(signal.name)] = _react.PropTypes.func;
	    });
	  }

	  return _react2.default.createClass({
	    displayName: name,
	    propTypes: propTypes,
	    statics: {
	      getSpec: function getSpec() {
	        return spec;
	      }
	    },
	    getInitialState: function getInitialState() {
	      return { spec: spec };
	    },
	    render: function render() {
	      return _react2.default.createElement(Vega, _extends({ spec: this.state.spec, isSpecFixed: true }, this.props, {
	        __self: this
	      }));
	    }
	  });
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.capitalize = capitalize;
	exports.isFunction = isFunction;
	function capitalize(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	}

	function isFunction(functionToCheck) {
	  var getType = {};
	  return !!functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

/***/ }
/******/ ])
});
;