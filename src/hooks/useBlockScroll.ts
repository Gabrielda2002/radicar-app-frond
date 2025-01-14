import { useEffect } from "react"

export const useBlockScroll = (isOpen: boolean) => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;

        if (isOpen) document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalStyle;
        };

    }, [isOpen]);
}