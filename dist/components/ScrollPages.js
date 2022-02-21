"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.promise.js");

var _utils = require("../utils");

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const muiItemsName = ['Container', 'Grid', 'IconButton', 'Stack', 'ArrowBackIcon', 'ArrowForwardIcon'];

const ScrollPages = props => {
  const {
    children,
    debounceTime = 250,
    elementStyle = {},
    containerStyle = {},
    buttonStyle = {},
    buttonIconStyle = {},
    iconStyle = {},
    gridItemSize: {
      xs,
      sm,
      md,
      lg
    } = {},
    mui: {
      Container,
      Grid,
      IconButton,
      Stack,
      ArrowBackIcon,
      ArrowForwardIcon
    },
    getElementSizes,
    React = {}
  } = props;
  const {
    isValidElement,
    useRef,
    useMemo,
    useEffect,
    useState,
    useLayoutEffect
  } = React;
  const hookConfig = {
    useState,
    useLayoutEffect,
    useEffect
  };
  const [invalidProps, setInvalidProps] = useState('');
  const [mounted, setMounted] = useState(0);
  useEffect(() => {
    [Container, Grid, IconButton, Stack, ArrowBackIcon, ArrowForwardIcon].forEach((Component, index) => {
      if (!Component || !isValidElement( /*#__PURE__*/React.createElement(Component, null))) {
        setInvalidProps("".concat(muiItemsName[index], " is not a valid react component"));
      }

      setMounted(prev => prev + 1);
    });
  }, [Container, Grid, IconButton, Stack, ArrowBackIcon, ArrowForwardIcon, setInvalidProps, setMounted, isValidElement]);
  const myRef = useRef(null);
  const gridRef = useRef(null);
  const itemRefs = useRef([]);
  const {
    width
  } = (0, _utils.useThisToGetSizesFromRef)(myRef, _objectSpread({
    revalidate: 100,
    timeout: 500
  }, hookConfig));
  const {
    left,
    width: gridWidth,
    height: gridHeight
  } = (0, _utils.useThisToGetPositionFromRef)(gridRef, _objectSpread({
    revalidate: 100,
    timeout: 500
  }, hookConfig));
  const {
    width: windowWidth
  } = (0, _utils.useWindowSize)(hookConfig);
  useEffect(() => {
    if (getElementSizes && typeof getElementSizes === 'function') {
      getElementSizes({
        width,
        height: gridHeight
      });
    }
  }, [width, gridHeight, getElementSizes]);
  const numberOfChildren = (children === null || children === void 0 ? void 0 : children.length) || 0;
  const stackLength = width * numberOfChildren;

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

  const debounceScroll = useMemo(() => (0, _lodash.debounce)(() => {
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
  }, debounceTime), [left, width, windowWidth, debounceTime]);

  const onScroll = () => {
    debounceScroll();
  };

  const EachItem = _ref => {
    let {
      width,
      itemRefs,
      index,
      children,
      elementStyle = {},
      Grid,
      isValidGrid
    } = _ref;

    if (!isValidGrid) {
      return /*#__PURE__*/React.createElement("div", null, "Invalid Grid");
    }

    return /*#__PURE__*/React.createElement(Grid, {
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
      }, elementStyle)
    }, children);
  };

  if (invalidProps !== null && invalidProps !== void 0 && invalidProps.length || mounted !== 6) {
    return /*#__PURE__*/React.createElement("div", null, invalidProps);
  }

  return /*#__PURE__*/React.createElement(Container, {
    maxWidth: "lg",
    disableGutters: true
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row",
    mt: [0, 1, 2, 3],
    sx: _objectSpread({
      position: 'relative'
    }, containerStyle)
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      position: 'absolute',
      top: '50%',
      left: "0px",
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      zIndex: 10
    }, buttonStyle)
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "left",
    onClick: handleBackAction,
    sx: buttonIconStyle
  }, /*#__PURE__*/React.createElement(ArrowBackIcon, {
    fontSize: "large",
    sx: iconStyle
  }))), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      position: 'absolute',
      top: '50%',
      left: "calc(".concat(gridWidth, "px)"),
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      zIndex: 10
    }, buttonStyle)
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "left",
    onClick: handleForwardAction,
    sx: buttonIconStyle
  }, /*#__PURE__*/React.createElement(ArrowForwardIcon, {
    fontSize: "large",
    sx: iconStyle
  }))), /*#__PURE__*/React.createElement(Grid, {
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
  }, /*#__PURE__*/React.createElement(Stack, {
    direction: "row",
    sx: {
      width: stackLength
    }
  }, numberOfChildren > 0 && children.map((eachChild, index) => /*#__PURE__*/React.createElement(EachItem, {
    key: "render-item-list-".concat(index),
    width: width,
    itemRefs: itemRefs,
    index: index,
    elementStyle: elementStyle,
    Grid: Grid,
    isValidGrid: isValidElement( /*#__PURE__*/React.createElement(Grid, null)),
    React: React
  }, eachChild))), /*#__PURE__*/React.createElement(Grid, {
    container: true,
    direction: "row"
  }, /*#__PURE__*/React.createElement(Grid, {
    ref: myRef,
    item: true,
    xs: xs || 12,
    sm: sm || 6,
    md: md || 4,
    lg: lg || 3
  })))));
};

var _default = ScrollPages;
exports.default = _default;