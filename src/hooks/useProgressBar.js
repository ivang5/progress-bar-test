import { useEffect, useState } from "react";

const useProgressBar = (dataLoaded) => {
  const [progress, setProgress] = useState("");

  useEffect(() => {
    if (dataLoaded) {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [dataLoaded]);

  const handleScroll = () => {
    const scrollBarPos = window.scrollY;
    const scrollBarSize = window.innerHeight;
    const totalSize = document.body.clientHeight;

    setProgress(`${((scrollBarPos + scrollBarSize) / totalSize) * 100}%`);
  };

  return progress;
};

export default useProgressBar;
