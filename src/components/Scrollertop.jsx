import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // or "smooth"
    });
  }, [pathname]); // fires on route change and also on mount

  // To make absolutely sure it works on page refresh:
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // fires once on mount

  return null;
};

export default ScrollToTop;
