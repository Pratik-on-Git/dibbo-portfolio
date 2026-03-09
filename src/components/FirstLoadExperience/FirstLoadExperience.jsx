import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./FirstLoadExperience.css";

const VISIT_KEY = "dibbo:first-load-complete:v1";
const MIN_VISIBLE_MS = 1650;

const CRITICAL_ASSETS = [
  "/about/hero-1.png",
  "/about/sign-up-card.jpg",
  "/about/team-bg.jpg",
  "/menu/menu-bg.jpg",
  "/menu/menu-pattern.png",
  "/logo.png",
];

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
  });

const FirstLoadExperience = () => {
  const [enabled, setEnabled] = useState(false);
  const [readyToExit, setReadyToExit] = useState(false);
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const numberRef = useRef(null);
  const introTlRef = useRef(null);
  const progressTweenRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasVisited = window.localStorage.getItem(VISIT_KEY) === "true";
    if (!hasVisited) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let isCancelled = false;
    const startedAt = Date.now();
    const progressValue = { value: 0 };

    const updateProgress = (nextValue) => {
      if (progressTweenRef.current) {
        progressTweenRef.current.kill();
      }

      progressTweenRef.current = gsap.to(progressValue, {
        value: Math.max(0, Math.min(100, nextValue)),
        duration: 0.42,
        ease: "power2.out",
        onUpdate: () => {
          const rounded = Math.round(progressValue.value);
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${rounded / 100})`;
          }
          if (numberRef.current) {
            numberRef.current.textContent = `${rounded.toString().padStart(2, "0")}%`;
          }
        },
      });
    };

    const load = async () => {
      updateProgress(6);

      const total = CRITICAL_ASSETS.length;
      let loaded = 0;

      const preloadTasks = CRITICAL_ASSETS.map((asset) =>
        preloadImage(asset).then(() => {
          loaded += 1;
          updateProgress(6 + (loaded / total) * 89);
        })
      );

      await Promise.all(preloadTasks);

      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

      window.setTimeout(() => {
        if (isCancelled) return;

        updateProgress(100);
        window.localStorage.setItem(VISIT_KEY, "true");

        window.setTimeout(() => {
          if (!isCancelled) {
            setReadyToExit(true);
          }
        }, 260);
      }, remaining);
    };

    load();

    return () => {
      isCancelled = true;
      if (progressTweenRef.current) {
        progressTweenRef.current.kill();
      }
    };
  }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled || !rootRef.current) return;

    const context = gsap.context(() => {
      gsap.set(".fxl-title-line", { y: 64, opacity: 0, filter: "blur(6px)" });
      gsap.set(".fxl-meta span", { y: 20, opacity: 0 });
      gsap.set(".fxl-bg-noise", { opacity: 0 });

      introTlRef.current = gsap
        .timeline()
        .to(".fxl-bg-noise", {
          opacity: 0.6,
          duration: 0.8,
          ease: "sine.out",
        })
        .to(
          ".fxl-title-line",
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.95,
            ease: "expo.out",
          },
          "-=0.45"
        )
        .to(
          ".fxl-meta span",
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.35"
        );
    }, rootRef);

    return () => {
      context.revert();
      if (introTlRef.current) {
        introTlRef.current.kill();
      }
    };
  }, [enabled]);

  useLayoutEffect(() => {
    if (!enabled || !readyToExit || !rootRef.current) return;

    const context = gsap.context(() => {
      const outroTimeline = gsap.timeline({
        onComplete: () => setEnabled(false),
      });

      outroTimeline
        .to(".fxl-title-line, .fxl-meta span", {
          y: -24,
          opacity: 0,
          duration: 0.45,
          stagger: 0.03,
          ease: "power2.in",
        })
        .to(
          ".fxl-progress-wrap",
          {
            y: 20,
            opacity: 0,
            duration: 0.38,
            ease: "power2.in",
          },
          "-=0.3"
        )
        .to(
          ".fxl-bg-noise",
          {
            opacity: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          "-=0.2"
        )
        .to(
          rootRef.current,
          {
            autoAlpha: 0,
            duration: 0.25,
          },
          "-=0.2"
        );
    }, rootRef);

    return () => {
      context.revert();
    };
  }, [enabled, readyToExit]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="first-load-experience" aria-hidden="true">
      <div className="fxl-bg-noise" />

      <div className="fxl-content">
        <div className="fxl-title">
          <p className="fxl-title-line">Loading</p>
        </div>

        <div className="fxl-progress-wrap">
          <div className="fxl-progress-track">
            <div className="fxl-progress-fill" ref={progressRef} />
          </div>
          <div className="fxl-meta">
            <span ref={numberRef}>00%</span>
            <span>Initializing experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstLoadExperience;
