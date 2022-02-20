import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useThisToGetSizesFromRef(elRef, options = {}) {
  const [sizes, setSizes] = useState({ width: 0, height: 0 });
  const { revalidate, timeout } = options;

  useIsomorphicLayoutEffect(() => {
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

export function useThisToGetPositionFromRef(elRef, options = {}) {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const { revalidate, timeout } = options;
  const [oldWidth, setOldWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
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

export function useWindowSize() {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useLayoutEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
