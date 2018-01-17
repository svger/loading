'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _cefcUiIcon = require('cefc-ui-icon');

var _cefcUiIcon2 = _interopRequireDefault(_cefcUiIcon);

var _index = require('./style/index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultPrefixCls = 'cefc-loading';
var LoadingComponent = '';
var loadingContainer = '';
var createLoadingContainer = function createLoadingContainer(options) {
  loadingContainer = document.createElement('div');
  document.body.appendChild(loadingContainer);
  _reactDom2.default.render(_react2.default.createElement(Loading, options), loadingContainer);
};

var open = function open(options) {
  if (!loadingContainer) {
    createLoadingContainer(options);
  }
};

var close = function close() {
  _reactDom2.default.render(_react2.default.createElement(Loading, { isShow: false }), loadingContainer);
};

var LoadingContainer = function (_Component) {
  _inherits(LoadingContainer, _Component);

  function LoadingContainer(props, context) {
    _classCallCheck(this, LoadingContainer);

    var _this = _possibleConstructorReturn(this, (LoadingContainer.__proto__ || Object.getPrototypeOf(LoadingContainer)).call(this, props, context));

    _this.state = {
      isShow: true
    };
    _this.debounceTimeout = 0;
    _this.delayTimeout = 0;
    return _this;
  }

  _createClass(LoadingContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var isShow = nextProps.isShow;
      var delay = this.props.delay;

      var currentIsShow = this.props.isShow;

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      if (currentIsShow && !isShow) {
        this.debounceTimeout = setTimeout(function () {
          _this2.setState({ isShow: isShow });
          _this2.props.onCallback();
        }, 200);
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
      } else {
        if (isShow && delay && !isNaN(Number(delay))) {
          if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
          }
          this.delayTimeout = setTimeout(function () {
            return _this2.setState({ isShow: isShow });
          }, delay);
        } else {
          currentIsShow !== isShow && this.setState({ isShow: isShow });
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout);
      }
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames2, _classnames3;

      var _props = this.props,
          content = _props.content,
          prefixCls = _props.prefixCls,
          className = _props.className,
          iconType = _props.iconType,
          mask = _props.mask;
      var isShow = this.state.isShow;

      var container = (0, _classnames5.default)(prefixCls, className, _defineProperty({}, prefixCls + '-hiding', !isShow));

      var iconCls = (0, _classnames5.default)((_classnames2 = {}, _defineProperty(_classnames2, prefixCls + '-icon', true), _defineProperty(_classnames2, prefixCls + '-loading-icon', true), _classnames2));

      var loadingCls = (0, _classnames5.default)((_classnames3 = {}, _defineProperty(_classnames3, prefixCls + '-loading', true), _defineProperty(_classnames3, prefixCls + '-transparent', !mask), _classnames3));

      return _react2.default.createElement(
        'section',
        { className: container },
        _react2.default.createElement(
          'div',
          { className: loadingCls },
          _react2.default.createElement(_cefcUiIcon2.default, { type: iconType, className: iconCls }),
          _react2.default.createElement(
            'span',
            null,
            content
          )
        )
      );
    }
  }]);

  return LoadingContainer;
}(_react.Component);

LoadingContainer.propTypes = {
  className: _propTypes2.default.oneOfType([//外部传入类
  _propTypes2.default.string, _propTypes2.default.object]),
  delay: _propTypes2.default.number, //延迟显示加载效果的时间（防止闪烁）
  iconType: _propTypes2.default.string,
  mask: _propTypes2.default.bool, //是否显示遮罩层
  prefixCls: _propTypes2.default.string, //自定义类
  content: _propTypes2.default.string, //loading的内容展示
  isShow: _propTypes2.default.bool, //是否显示Loading
  onCallback: _propTypes2.default.func //loading隐藏后的回调处理函数
};
LoadingContainer.defaultProps = {
  prefixCls: defaultPrefixCls,
  iconType: 'loadingspinner',
  className: '',
  content: '加载中',
  isShow: true,
  mask: true,
  onCallback: function onCallback() {}
};

var Loading = function (_Component2) {
  _inherits(Loading, _Component2);

  function Loading(props) {
    _classCallCheck(this, Loading);

    var _this3 = _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, props));

    if (!LoadingComponent) {
      LoadingComponent = LoadingContainer;
    }
    return _this3;
  }

  _createClass(Loading, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(LoadingComponent, this.props);
    }
  }]);

  return Loading;
}(_react.Component);

Loading.open = open;
Loading.close = close;

exports.default = Loading;