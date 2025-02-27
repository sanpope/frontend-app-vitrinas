import { useState, useEffect } from "react";

export default function useNormalize() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = dimensions.width / 390;

  function normalize(fontSize) {
    const newSize = fontSize * scale;

    return Math.round(newSize);
  }

  return normalize;
}
