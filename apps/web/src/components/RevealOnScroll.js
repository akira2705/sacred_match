import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
export function RevealOnScroll({ children, className, delay = 0, threshold = 0.16, rootMargin = "0px 0px -10% 0px", once = true, }) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === "undefined") {
            setIsVisible(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (once) {
                    observer.unobserve(entry.target);
                }
                return;
            }
            if (!once) {
                setIsVisible(false);
            }
        }, {
            threshold,
            rootMargin,
        });
        observer.observe(node);
        return () => {
            observer.disconnect();
        };
    }, [once, rootMargin, threshold]);
    const style = {
        "--reveal-delay": `${delay}ms`,
    };
    return (_jsx("div", { ref: ref, className: clsx("reveal-on-scroll", isVisible && "is-visible", className), style: style, children: children }));
}
