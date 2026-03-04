import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/**
 * Simple reveal: wraps element content in a single inner span and
 * animates it from off-screen to y:0. No text splitting.
 * Use for short text / headings where SplitType breaks layout.
 */
export const animateSimpleReveal = (
  el,
  {
    delay = 0,
    duration = 1,
    ease = "power4.out",
    direction = "bottom",
    start = "top 80%",
    useScrollTrigger = true,
  } = {}
) => {
  if (!el) return () => {};

  const id = `reveal-${Math.random().toString(36).substr(2, 9)}`;
  const innerClass = `inner-${id}`;
  const originalHTML = el.innerHTML;

  el.innerHTML = `<span class="${innerClass}" style="display:block;position:relative;will-change:transform;font:inherit;color:inherit;text-transform:inherit;letter-spacing:inherit;line-height:inherit">${originalHTML}</span>`;

  const inner = el.querySelector(`.${innerClass}`);
  const initialY = direction === "top" ? "-100%" : "100%";
  gsap.set(inner, { y: initialY });

  const tl = gsap.timeline({
    defaults: { ease, duration },
    ...(useScrollTrigger
      ? {
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      : {}),
  });

  tl.to(inner, { y: "0%", delay });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    el.innerHTML = originalHTML;
    el.style.clipPath = "";
    el.style.overflow = "";
  };
};

/**
 * Advanced fade-in reveal for headings.
 * Uses opacity + blur + depth/vertical motion and a soft settle pass.
 */
export const animateAdvancedFadeIn = (
  el,
  {
    delay = 0,
    duration = 1.1,
    ease = "power4.out",
    start = "top 85%",
    useScrollTrigger = true,
  } = {}
) => {
  if (!el) return () => {};

  gsap.set(el, {
    autoAlpha: 0,
    y: 56,
    scale: 0.975,
    rotateX: -18,
    filter: "blur(10px)",
    transformOrigin: "50% 100%",
    willChange: "transform, opacity, filter",
  });

  const tl = gsap.timeline({
    ...(useScrollTrigger
      ? {
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none none",
          },
        }
      : {}),
  });

  tl.to(el, {
    autoAlpha: 1,
    y: -6,
    scale: 1.01,
    rotateX: 0,
    filter: "blur(0px)",
    duration: duration * 0.78,
    ease,
    delay,
  }).to(
    el,
    {
      y: 0,
      scale: 1,
      duration: duration * 0.28,
      ease: "expo.out",
      clearProps: "willChange,filter",
    },
    "-=0.16"
  );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.set(el, { clearProps: "all" });
  };
};

/**
 * Line-reveal animation using SplitType + GSAP.
 * Splits text into lines, wraps each in a clip-path mask + inner span,
 * and animates each line from off-screen to y:0.
 * Best for paragraphs and multi-line text.
 */
const animateTextReveal = (
  el,
  {
    delay = 0,
    duration = 1,
    ease = "power4.out",
    stagger = 0.05,
    direction = "bottom",
    start = "top 80%",
    useScrollTrigger = true,
  } = {}
) => {
  if (!el) return () => {};

  const id = `anim-${Math.random().toString(36).substr(2, 9)}`;
  const lineClass = `line-${id}`;
  const innerClass = `inner-${id}`;

  const split = new SplitType(el, { types: "lines", lineClass });

  el.querySelectorAll(`.${lineClass}`).forEach((line) => {
    line.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
    line.style.overflow = "hidden";
    line.style.display = "block";
    line.style.font = "inherit";
    line.style.color = "inherit";
    line.style.textTransform = "inherit";
    line.style.letterSpacing = "inherit";
    line.innerHTML = `<span class="${innerClass}" style="position:relative;display:block;will-change:transform;font:inherit;color:inherit;text-transform:inherit;letter-spacing:inherit">${line.innerHTML}</span>`;
  });

  const inners = el.querySelectorAll(`.${innerClass}`);
  const initialY = direction === "top" ? "-100%" : "100%";
  gsap.set(inners, { y: initialY });

  const tl = gsap.timeline({
    defaults: { ease, duration },
    ...(useScrollTrigger
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
};

export default animateTextReveal;
