import { useEffect } from "react";

export const useBlockScroll = (isOpen: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {

      const shouldRestore = originalStyle === "visible" || originalStyle === "auto" || originalStyle === "";
      document.body.style.overflow = shouldRestore ? "" : originalStyle;

      document.body.style.overflow = "";
    };
  }, [isOpen]);
};
