"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimatedSVGDial =
/*#__PURE__*/
function () {
  function AnimatedSVGDial(element, params) {
    _classCallCheck(this, AnimatedSVGDial);

    if (element === undefined) {
      return;
    } // Conversion of the different types of input


    this.parentElement = {};

    if (typeof element === 'string') {
      this.parentElement = document.querySelector(element);
    } else if (element instanceof jQuery) {
      var _element = _slicedToArray(element, 1);

      this.parentElement = _element[0];
    } else if (this.isObject(element)) {
      this.parentElement = element;
    } // Define option defaults


    this.params = this.extendParams(params);
    this.hideText = this.params.length > 1; // Creates the SVG element

    this.svgElement = this.createSvgElement(); // Creates the element into wich store the styles

    this.styleElement = this.createElement('defs', new Map()); // Creates the whole HTML stucture

    this.initHtml(); // Append the SVG to the HTML

    this.parentElement.appendChild(this.svgElement); // Animation init

    this.initAnimationParams();
  } // Animate all the dials


  _createClass(AnimatedSVGDial, [{
    key: "animate",
    value: function animate() {
      for (var i = 0; i < this.params.length; i++) {
        var progressBar = this.params[i];
        this.animateSvgRadialProgressBar(i, progressBar);
      }
    } // Resets all the dials

  }, {
    key: "reset",
    value: function reset() {
      for (var i = 0; i < this.params.length; i++) {
        this.resetDialParams(i);
      }
    } // Sets the dial's animation params

  }, {
    key: "initAnimationParams",
    value: function initAnimationParams() {
      for (var i = 0; i < this.params.length; i++) {
        var progressBar = this.params[i];
        this.setDialAnimationParams(i, progressBar);
      }
    } // Sets the timout for the animation
    // index: dial index - int
    // progressBar: parameter object - object

  }, {
    key: "animateSvgRadialProgressBar",
    value: function animateSvgRadialProgressBar(index, progressBar) {
      var _this = this;

      if (progressBar.value === undefined || Number.isNaN(progressBar.value)) {
        return;
      }

      if (progressBar.maxValue !== undefined && Number.isNaN(progressBar.maxValue)) {
        return;
      }

      if (progressBar.animationDuration !== undefined && Number.isNaN(progressBar.animationDuration)) {
        return;
      }

      if (progressBar.animationOffset !== undefined && Number.isNaN(progressBar.animationOffset)) {
        return;
      }

      var gauge = this.svgElement.querySelectorAll('.circle')[index];
      var radius = gauge.getAttribute('r');
      var circumference = 2 * radius * Math.PI;
      var maxValue = progressBar.maxValue;
      var textElement = this.svgElement.querySelector('text');
      var offset = circumference / maxValue * (maxValue - progressBar.value);
      setTimeout(function () {
        gauge.setAttribute('stroke-dashoffset', offset);

        if (!_this.hideText && textElement !== undefined && textElement !== null) {
          textElement.textContent = progressBar.text;
        }
      }, progressBar.animationOffset);
    } // Sets the dial's animation params
    // index: dial index - int
    // progressBar: parameter object - object

  }, {
    key: "setDialAnimationParams",
    value: function setDialAnimationParams(index, progressBar) {
      if (progressBar.animationDuration !== undefined && Number.isNaN(progressBar.animationDuration)) {
        return;
      }

      var gauge = this.svgElement.querySelectorAll('.circle')[index];
      var radius = gauge.getAttribute('r'); // get the radius of the circle

      var circumference = 2 * radius * Math.PI; // calculate the circumference

      var transitionCssTime = progressBar.animationDuration / 1000; // divide the time in millisecond by 1000 to have seconds

      var transitionParams = "".concat(transitionCssTime, "s ").concat(progressBar.animationEasing);
      gauge.setAttribute('stroke-dasharray', circumference);
      gauge.setAttribute('stroke-dashoffset', circumference);
      gauge.setAttribute('style', "transition: stroke-dashoffset ".concat(transitionParams, ";"));
    } // Resets the dial to its initial state
    // index: dial index - int

  }, {
    key: "resetDialParams",
    value: function resetDialParams(index) {
      var gauge = this.svgElement.querySelectorAll('.circle')[index];

      if (gauge !== undefined && gauge !== null) {
        gauge.setAttribute('stroke-dashoffset', gauge.getAttribute('stroke-dasharray'));
      }

      if (!this.hideText) {
        var text = this.svgElement.querySelector('text');

        if (text !== undefined && text !== null) {
          text.textContent = '';
        }
      }
    } // Calls the methods to create the HTML structure

  }, {
    key: "initHtml",
    value: function initHtml() {
      this.createSVGDefs(this.params);
      this.createGraphicElements(this.params);
    } // Adds to the SVG tag the element of the dial and the text and it attaches
    // them to the right HTML node
    // params: array of attributes for each dial and for the text - array

  }, {
    key: "createGraphicElements",
    value: function createGraphicElements(params) {
      for (var i = 0; i < params.length; i++) {
        var progressBar = params[i]; // Background circle

        this.svgElement.appendChild(this.createElement('circle', progressBar.backgroundCircleParams)); // Foreground circle

        this.svgElement.appendChild(this.createElement('circle', progressBar.foregroundCircleParams)); // Text - Only if there is only one dial

        if (params.length === 1) {
          var text = this.createElement('text', progressBar.textParams);
          this.svgElement.appendChild(text);
        }
      }
    } // Adds to the SVG tag the correct style definitions
    // params: array of gradients for each dial - array

  }, {
    key: "createSVGDefs",
    value: function createSVGDefs(params) {
      for (var i = 0; i < params.length; i++) {
        var progressBar = params[i]; // If there is no everything is managed by circle params

        if (progressBar.gradient) {
          var gradientElement = void 0;

          if (progressBar.gradient.type === 'linear') {
            gradientElement = this.createElement('linearGradient', progressBar.gradient.params);
          } else {
            gradientElement = this.createElement('radialGradient', progressBar.gradient.params);
          }

          for (var j = 0; j < progressBar.gradient.stops.length; j++) {
            var stop = progressBar.gradient.stops[j];
            gradientElement.appendChild(this.createElement('stop', stop));
          }

          this.styleElement.appendChild(gradientElement);
        }
      } // Append the styles to the SVG


      this.svgElement.appendChild(this.styleElement);
    } // Extends the passed config object with the remaining params
    // params: object or array of parameters for the configuration - array/obj

  }, {
    key: "extendParams",
    value: function extendParams(params) {
      var paramsArray = [];

      if (this.isObject(params)) {
        paramsArray.push(params);
      } else if (Array.isArray(params)) {
        paramsArray = params;
      } else {
        paramsArray = [{}];
      }

      var defaults = []; // Cycle trough every progress bar to get its attributes

      for (var i = 0; i < paramsArray.length; i++) {
        var progressBar = paramsArray[i];
        var defaultProgressBar = {};
        defaults.push(defaultProgressBar); // HTML Elements

        defaultProgressBar.gradient = this.getGradientParams(progressBar);
        defaultProgressBar.backgroundCircleParams = this.getBackgroundDialParams(progressBar);
        defaultProgressBar.foregroundCircleParams = this.getForegroundDialParams(progressBar);
        defaultProgressBar.textParams = this.getTextParams(progressBar); // Animation & Text & Value

        defaultProgressBar.animationDuration = progressBar.animationDuration || 350;
        defaultProgressBar.animationOffset = progressBar.animationOffset || 0;
        defaultProgressBar.animationEasing = progressBar.animationEasing || 'ease-out';
        defaultProgressBar.text = progressBar.text || '';
        defaultProgressBar.value = progressBar.value || 50;
        defaultProgressBar.maxValue = progressBar.maxValue || 100;
        if (defaultProgressBar.value > defaultProgressBar.maxValue) defaultProgressBar.value = defaultProgressBar.maxValue;
      }

      return defaults;
    } // Extends the config object with the remaining params for the background dial
    // progressBar: object of parameters for the configuration - obj

  }, {
    key: "getBackgroundDialParams",
    value: function getBackgroundDialParams(progressBar) {
      if (progressBar === undefined) {
        return new Map();
      }

      var backgroundDialParams = new Map();
      backgroundDialParams.set('cx', '50');
      backgroundDialParams.set('cy', '50');
      backgroundDialParams.set('r', progressBar.r || 40);
      backgroundDialParams.set('fill', progressBar.bkgFill || 'none');
      backgroundDialParams.set('stroke', progressBar.bkgStrokeColor || 'black');
      backgroundDialParams.set('stroke-width', progressBar.bkgStrokeWidth || '10');
      backgroundDialParams.set('stroke-opacity', progressBar.bkgStrokeOpacity || '0.4');
      return backgroundDialParams;
    } // Extends the config object with the remaining params for the foreground dial
    // progressBar: object of parameters for the configuration - obj

  }, {
    key: "getForegroundDialParams",
    value: function getForegroundDialParams(progressBar) {
      if (progressBar === undefined) {
        return new Map();
      }

      var foregroundDialParams = new Map();
      foregroundDialParams.set('class', 'circle');
      foregroundDialParams.set('cx', '50');
      foregroundDialParams.set('cy', '50');
      foregroundDialParams.set('r', progressBar.r || 40);
      foregroundDialParams.set('fill', progressBar.fill || 'none');
      foregroundDialParams.set('stroke', progressBar.strokeColor || 'black');
      foregroundDialParams.set('stroke-width', progressBar.strokeWidth || '10');
      foregroundDialParams.set('stroke-opacity', progressBar.strokeOpacity || '1');
      foregroundDialParams.set('stroke-linecap', progressBar.strokeLineCap || 'round');
      return foregroundDialParams;
    } // Extends the config object with the remaining params for the text
    // progressBar: object of parameters for the configuration - obj

  }, {
    key: "getTextParams",
    value: function getTextParams(progressBar) {
      if (progressBar === undefined) {
        return new Map();
      }

      var textParams = new Map();
      textParams.set('x', progressBar.textX || '50%');
      textParams.set('y', progressBar.textY || '-45');
      textParams.set('style', progressBar.textStyle || 'transform: rotate(90deg);');
      textParams.set('fill', progressBar.textFill || 'black');
      textParams.set('stroke', progressBar.textStrokeColor || 'none');
      textParams.set('stroke-width', progressBar.textStrokeWidth || '0');
      textParams.set('font-size', progressBar.textSize || '18');
      textParams.set('font-weight', progressBar.textWeight || 'normal');
      textParams.set('font-family', progressBar.textFont || 'Verdana');
      textParams.set('text-anchor', progressBar.textAnchor || 'middle');
      return textParams;
    } // Extends the config object with the remaining params for the gradient
    // progressBar: object of parameters for the configuration - obj

  }, {
    key: "getGradientParams",
    value: function getGradientParams(progressBar) {
      if (progressBar.gradient === undefined) {
        return undefined;
      }

      var gradient = {
        type: progressBar.gradient.type,
        params: new Map(),
        stops: []
      };
      gradient.params.set('id', progressBar.gradient.id);

      if (progressBar.gradient.type === 'linear') {
        gradient.params.set('x1', progressBar.gradient.x1 || '0%');
        gradient.params.set('y1', progressBar.gradient.y1 || '0%');
        gradient.params.set('x2', progressBar.gradient.x2 || '100%');
        gradient.params.set('y2', progressBar.gradient.y2 || '100%');
      } else {
        gradient.params.set('cx', progressBar.gradient.cx || '0%');
        gradient.params.set('cy', progressBar.gradient.cy || '0%');
        gradient.params.set('r', progressBar.gradient.r || '5');
        gradient.params.set('fx', progressBar.gradient.fx || '45%');
        gradient.params.set('fy', progressBar.gradient.fy || '45%');
      }

      progressBar.gradient.stops.forEach(function (stop) {
        var stopParams = new Map();
        stopParams.set('offset', stop.offset || '0%');
        stopParams.set('stop-color', stop.color || '#FFFFFF');
        stopParams.set('stop-opacity', stop.opacity || '1');
        gradient.stops.push(stopParams);
      });
      return gradient;
    } // Creates the SVG tag with the correct parameters
    // width: width of the svg element - px or %
    // height: height of the svg element - px or %

  }, {
    key: "createSvgElement",
    value: function createSvgElement() {
      var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      element.setAttribute('viewBox', '0 0 100 100');
      element.setAttribute('height', '100%');
      element.setAttribute('width', '100%');
      element.setAttribute('style', 'transform: rotate(-90deg);');
      return element;
    } // Creates an SVG element tag with the correct parameters
    // tag: tagname - string
    // attributes: map of attributes - Map

  }, {
    key: "createElement",
    value: function createElement(tag, attributes) {
      var element = document.createElementNS('http://www.w3.org/2000/svg', tag);

      if (attributes.size > 0) {
        attributes.forEach(function (value, name) {
          return element.setAttribute(name, value);
        });
      }

      return element;
    }
  }, {
    key: "isObject",
    value: function isObject(value) {
      return value && _typeof(value) === 'object' && value.constructor === Object;
    }
  }]);

  return AnimatedSVGDial;
}();