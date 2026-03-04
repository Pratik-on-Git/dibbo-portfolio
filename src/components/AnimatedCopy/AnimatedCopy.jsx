import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import "./AnimatedCopy.css";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCopy = ({
  children,
  className = "",
  delay = 0,
  duration = 1,
  ease = "power4.out",
  stagger = 0.05,
  animateOnScroll = true,
  direction = "bottom",
  start = "top 80%",
  tag = "p",
}) => {
  const ref = useRef(null);
  const idRef = useRef(`copy-${Math.random().toString(36).substr(2, 9)}`);
  const Tag = tag;

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
    <Tag ref={ref} className={`animated-copy ${className}`}>
      {children}
    </Tag>
  );
};

export default AnimatedCopy;
