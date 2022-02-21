"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThisToGetPositionFromRef = useThisToGetPositionFromRef;
exports.useThisToGetSizesFromRef = useThisToGetSizesFromRef;
exports.useWindowSize = useWindowSize;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = require("react");

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? _react.useLayoutEffect : _react.useEffect;

function useThisToGetSizesFromRef(elRef) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [sizes, setSizes] = (0, _react.useState)({
    width: 0,
    height: 0
  });
  const {
    revalidate,
    timeout
  } = options;
  useIsomorphicLayoutEffect(() => {
    function updateSize() {
      var _elRef$current, _elRef$current2;

      setSizes({
        width: (elRef === null || elRef === void 0 ? void 0 : (_elRef$current = elRef.current) === null || _elRef$current === void 0 ? void 0 : _elRef$current.clientWidth) || 0,
        height: (elRef === null || elRef === void 0 ? void 0 : (_elRef$current2 = elRef.current) === null || _elRef$current2 === void 0 ? void 0 : _elRef$current2.clientHeight) || 0
      });
    }

    window.addEventListener("resize", updateSize);
    let loop;

    if (revalidate && typeof revalidate === "number") {
      loop = setInterval(() => updateSize(), [revalidate]);

      if (timeout) {
        setTimeout(() => clearInterval(loop), timeout);
      }
    }

    updateSize();
    return () => {
      window && window.removeEventListener("resize", updateSize);

      if (loop) {
        clearInterval(loop);
      }
    };
  }, [elRef]);
  return sizes;
}

function useThisToGetPositionFromRef(elRef) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [position, setPosition] = (0, _react.useState)({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0
  });
  const {
    revalidate,
    timeout
  } = options;
  const [oldWidth, setOldWidth] = (0, _react.useState)(0);
  useIsomorphicLayoutEffect(() => {
    function updatePosition() {
      var _elRef$current3, _elRef$current4;

      let bypass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      const {
        top,
        left,
        right,
        bottom,
        width,
        height,
        x,
        y
      } = (elRef === null || elRef === void 0 ? void 0 : (_elRef$current3 = elRef.current) === null || _elRef$current3 === void 0 ? void 0 : _elRef$current3.getBoundingClientRect()) || {};

      if (bypass || (elRef === null || elRef === void 0 ? void 0 : (_elRef$current4 = elRef.current) === null || _elRef$current4 === void 0 ? void 0 : _elRef$current4.clientWidth) !== oldWidth) {
        var _elRef$current5;

        setPosition({
          top,
          left,
          right,
          bottom,
          width,
          height,
          x,
          y
        });
        setOldWidth(elRef === null || elRef === void 0 ? void 0 : (_elRef$current5 = elRef.current) === null || _elRef$current5 === void 0 ? void 0 : _elRef$current5.clientWidth);
      }
    }

    window.addEventListener("resize", updatePosition);
    let loop;

    if (revalidate && typeof revalidate === "number") {
      loop = setInterval(() => updatePosition(true), [revalidate]);

      if (timeout) {
        setTimeout(() => clearInterval(loop), timeout);
      }
    }

    return () => {
      window && window.removeEventListener("resize", updatePosition);

      if (loop) {
        clearInterval(loop);
      }
    };
  }, [elRef]);
  return position;
}

function useWindowSize() {
  const [size, setSize] = (0, _react.useState)({
    width: 0,
    height: 0
  });
  (0, _react.useLayoutEffect)(() => {
    function updateSize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}