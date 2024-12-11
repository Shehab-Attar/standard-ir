import { useEffect, useRef, useState } from "react";

const IframeHandler = ({ children }) => {
  const [pageHeight, setPageHeight] = useState(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (!appRef.current) return;

    const observer = new ResizeObserver(() => {
      const newHeight = appRef.current.scrollHeight;
      setPageHeight(newHeight);
    });

    observer.observe(appRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.parent) {
      window.parent.postMessage(
        { type: "contentHeight", height: pageHeight },
        "*"
      );
    }
  }, [pageHeight]);

  return <div ref={appRef}>{children}</div>;
};

export default IframeHandler;