import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./AnimatedH1.css";

gsap.registerPlugin(ScrollTrigger);

const AnimatedH1 = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  ease = "power4.out",
  stagger = 0.1,
  animateOnScroll = false,
  direction = "bottom",
  start = "top 75%",
}) => {
  const ref = useRef(null);
  const idRef = useRef(`h1-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const id = idRef.current;
    const lineClass = `line-${id}`;
    const innerClass = `line-inner-${id}`;

    const split = new SplitType(el, { types: "lines", lineClass });

    el.querySelectorAll(`.${lineClass}`).forEach((line) => {
      line.innerHTML = `<span class="${innerClass}">${line.innerHTML}</span>`;
    });

    const inners = el.querySelectorAll(`.${innerClass}`);
    gsap.set(inners, {
      y: direction === "top" ? "-100%" : "100%",
      display: "block",
    });

    const tl = gsap.timeline({
      defaults: { ease, duration },
      ...(animateOnScroll
        ? {
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        : {}),
    });

    tl.to(inners, { y: "0%", stagger, delay });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      split.revert();
    };
  }, [children, delay, duration, ease, stagger, animateOnScroll, direction, start]);

  return (
    <h1 ref={ref} className={`animated-h1 ${className}`}>
      {children}
    </h1>
  );
};

export default AnimatedH1;
