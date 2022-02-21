const useIsomorphicLayoutEffect = (useEffect, useLayoutEffect) =>
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const init = { width: 0, height: 0 };

export function useThisToGetSizesFromRef(elRef, options = {}) {
  const { revalidate, timeout, useState, useLayoutEffect, useEffect } = options;

  const [sizes, setSizes] = useState ? useState(init) : [init, () => {}];

  useLayoutEffect &&
    useEffect &&
    useIsomorphicLayoutEffect(useEffect, useLayoutEffect)(() => {
      function updateSize() {
        setSizes({
          width: elRef?.current?.clientWidth || 0,
          height: elRef?.current?.clientHeight || 0,
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

const init2 = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
};

export function useThisToGetPositionFromRef(elRef, options = {}) {
  const { revalidate, timeout, useState, useLayoutEffect, useEffect } = options;

  const [position, setPosition] = useState
    ? useState(init2)
    : [init2, () => {}];

  const [oldWidth, setOldWidth] = useState ? useState(0) : [0, () => {}];

  useLayoutEffect &&
    useEffect &&
    useIsomorphicLayoutEffect(useEffect, useLayoutEffect)(() => {
      function updatePosition(bypass = false) {
        const { top, left, right, bottom, width, height, x, y } =
          elRef?.current?.getBoundingClientRect() || {};

        if (bypass || elRef?.current?.clientWidth !== oldWidth) {
          setPosition({ top, left, right, bottom, width, height, x, y });
          setOldWidth(elRef?.current?.clientWidth);
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

const init3 = {
  width: 0,
  height: 0,
};

export function useWindowSize(options) {
  const { useState, useLayoutEffect, useEffect } = options;

  const [size, setSize] = useState ? useState(init3) : [init, () => {}];

  useLayoutEffect &&
    useEffect &&
    useIsomorphicLayoutEffect(useEffect, useLayoutEffect)(() => {
      function updateSize() {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
      window.addEventListener("resize", updateSize);
      updateSize();
      return () => window.removeEventListener("resize", updateSize);
    }, []);
    
  return size;
}
