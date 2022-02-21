"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _material = require("@mui/material");

var _styles = require("@mui/material/styles");

var _ArrowBack = _interopRequireDefault(require("@mui/icons-material/ArrowBack"));

var _ArrowForward = _interopRequireDefault(require("@mui/icons-material/ArrowForward"));

var _utils = require("../utils");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ScrollPages = props => {
  const {
    itemList,
    debounceTime = 250,
    itemStyle,
    containerStyle = {},
    buttonStyle = {},
    BackButton,
    ForwardButton,
    xs,
    sm,
    md,
    lg
  } = props;
  const theme = (0, _styles.useTheme)();
  const myRef = (0, _react.useRef)(null);
  const gridRef = (0, _react.useRef)(null);
  const itemRefs = (0, _react.useRef)([]);
  const {
    width
  } = (0, _utils.useThisToGetSizesFromRef)(myRef, {
    revalidate: 100,
    timeout: 500
  });
  const {
    top,
    height,
    right,
    left
  } = (0, _utils.useThisToGetPositionFromRef)(gridRef, {
    revalidate: 100,
    timeout: 500
  });
  const {
    width: windowWidth
  } = (0, _utils.useWindowSize)();
  const numberOfWords = (itemList === null || itemList === void 0 ? void 0 : itemList.length) || 0;
  const stackLength = width * numberOfWords;

  const handleBackAction = async () => {
    // find which item is in the middle of the screen
    const halfOfScreen = windowWidth / 2;
    const wordIndex = itemRefs.current.findIndex(itemRef => {
      const {
        left: wordLeft
      } = itemRef.getBoundingClientRect();
      return wordLeft < halfOfScreen && wordLeft > 0 || wordLeft + width > halfOfScreen && wordLeft + width < windowWidth;
    }); // scroll left

    if (wordIndex > 0) {
      const itemRef = itemRefs.current[wordIndex - 1];
      const {
        left: wordLeft
      } = itemRef.getBoundingClientRect();
      gridRef.current.scrollTo({
        left: wordLeft + wordIndex * width - left,
        behavior: 'smooth'
      });
    }
  };

  const handleForwardAction = async () => {
    var _itemRefs$current;

    // find which item is in the middle of the screen
    const halfOfScreen = windowWidth / 2;
    const wordIndex = itemRefs.current.findIndex(itemRef => {
      const {
        left: wordLeft
      } = itemRef.getBoundingClientRect();
      return wordLeft < halfOfScreen && wordLeft > 0 || wordLeft + width > halfOfScreen && wordLeft + width < windowWidth;
    }); // scroll left

    if (wordIndex < ((_itemRefs$current = itemRefs.current) === null || _itemRefs$current === void 0 ? void 0 : _itemRefs$current.length) - 1) {
      const itemRef = itemRefs.current[wordIndex + 1];
      const {
        left: wordLeft
      } = itemRef.getBoundingClientRect();
      gridRef.current.scrollTo({
        left: wordLeft + wordIndex * width - left,
        behavior: 'smooth'
      });
    }
  };

  const debounceScroll = (0, _react.useMemo)(() => (0, _lodash.debounce)(() => {
    const autoScroll = async () => {
      var _itemRefs$current2, _itemRefs$current3;

      const halfOfScreen = windowWidth / 2;
      const wordIndex = itemRefs === null || itemRefs === void 0 ? void 0 : (_itemRefs$current2 = itemRefs.current) === null || _itemRefs$current2 === void 0 ? void 0 : _itemRefs$current2.findIndex(itemRef => {
        const {
          left: wordLeft
        } = itemRef === null || itemRef === void 0 ? void 0 : itemRef.getBoundingClientRect();
        return wordLeft < halfOfScreen && wordLeft > 0 || wordLeft + width > halfOfScreen && wordLeft + width < windowWidth;
      });
      const itemRef = itemRefs === null || itemRefs === void 0 ? void 0 : (_itemRefs$current3 = itemRefs.current) === null || _itemRefs$current3 === void 0 ? void 0 : _itemRefs$current3[wordIndex];

      if (itemRef) {
        const {
          left: wordLeft
        } = itemRef === null || itemRef === void 0 ? void 0 : itemRef.getBoundingClientRect();
        const a = Math.abs(wordIndex * width - left);
        const b = Math.abs(wordLeft);
        const whichBigger = Math.max(a, b);
        const different = Math.round(Math.abs(a - b) * 100 / whichBigger);

        if (different > 10) {
          var _gridRef$current;

          gridRef === null || gridRef === void 0 ? void 0 : (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.scrollTo({
            left: wordLeft + (wordIndex * width - wordLeft),
            behavior: 'smooth'
          });
        }
      }
    };

    autoScroll();
  }, debounceTime), [left, width, windowWidth]);

  const onScroll = () => {
    debounceScroll();
  };

  return /*#__PURE__*/_react.default.createElement(_material.Container, {
    maxWidth: "lg",
    disableGutters: true
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "row",
    mt: [0, 1, 2, 3],
    sx: containerStyle
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread({
      position: 'absolute',
      top: Math.round(top + height / 2),
      left: "calc(".concat(left, "px + ").concat(theme.spacing(3), ")"),
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
      backgroundColor: theme.palette.scroll_button.main,
      borderRadius: '50%'
    }, buttonStyle)
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    "aria-label": "left",
    onClick: handleBackAction
  }, BackButton ? /*#__PURE__*/_react.default.createElement(BackButton, null) : /*#__PURE__*/_react.default.createElement(_ArrowBack.default, {
    fontSize: "large"
  }))), /*#__PURE__*/_react.default.createElement("div", {
    style: _objectSpread({
      position: 'absolute',
      top: Math.round(top + height / 2),
      left: "calc(".concat(right, "px - ").concat(theme.spacing(3), ")"),
      transform: 'translate(-50%, -50%)',
      zIndex: 100,
      backgroundColor: theme.palette.scroll_button.main,
      borderRadius: '50%'
    }, buttonStyle)
  }, /*#__PURE__*/_react.default.createElement(_material.IconButton, {
    "aria-label": "left",
    onClick: handleForwardAction
  }, ForwardButton ? /*#__PURE__*/_react.default.createElement(ForwardButton, null) : /*#__PURE__*/_react.default.createElement(_ArrowForward.default, {
    fontSize: "large"
  }))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    ref: gridRef,
    item: true,
    xs: 12,
    sx: {
      mt: 1,
      width: [width],
      overflow: 'auto',
      borderRadius: '10px'
    },
    className: "hideScrollBar",
    onScroll: onScroll
  }, /*#__PURE__*/_react.default.createElement(_material.Stack, {
    direction: "row",
    sx: {
      width: stackLength
    }
  }, (itemList === null || itemList === void 0 ? void 0 : itemList.length) > 0 && itemList.map((item, index) => /*#__PURE__*/_react.default.createElement(EachItem, {
    key: "render-item-list-".concat(index),
    item: item,
    width: width,
    itemRefs: itemRefs,
    index: index,
    itemStyle: itemStyle
  }, item))), /*#__PURE__*/_react.default.createElement(_material.Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/_react.default.createElement(_material.Grid, {
    ref: myRef,
    item: true,
    xs: xs || 12,
    sm: sm || 6,
    md: md || 4,
    lg: lg || 3
  })))));
};

const EachItem = _ref => {
  let {
    width,
    itemRefs,
    index,
    children,
    itemStyle = {}
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_material.Grid, {
    ref: el => itemRefs.current[index] = el,
    container: true,
    direction: "column",
    alignItems: "center",
    wrap: "nowrap",
    sx: _objectSpread({
      p: 1,
      width,
      height: 'auto',
      '&:hover': {
        filter: 'brightness(50%)'
      }
    }, itemStyle)
  }, children);
};

var _default = ScrollPages;
exports.default = _default;