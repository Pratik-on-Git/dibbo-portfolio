import { forwardRef, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxVideo = forwardRef(function ParallaxVideo(
  { speed = 0.2, scale = 1.25, className = "", children, ...videoProps },
  ref
) {
  const videoRef = useRef(null);
  const bounds = useRef(null);
  const currentTranslateY = useRef(0);
  const targetTranslateY = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const updateBounds = () => {
      if (videoRef.current) {
        const rect = videoRef.current.getBoundingClientRect();
        bounds.current = {
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        };
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);

    const videoElement = videoRef.current;
    videoElement?.addEventListener("loadedmetadata", updateBounds);

    const animate = () => {
      if (videoRef.current) {
        currentTranslateY.current = lerp(
          currentTranslateY.current,
          targetTranslateY.current,
          0.1
        );

        if (
          Math.abs(currentTranslateY.current - targetTranslateY.current) > 0.01
        ) {
          videoRef.current.style.transform = `translateY(${currentTranslateY.current}px) scale(${scale})`;
        }
      }

      rafId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateBounds);
      videoElement?.removeEventListener("loadedmetadata", updateBounds);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [scale]);

  useLenis(({ scroll }) => {
    if (!bounds.current) return;
    const relativeScroll = scroll - bounds.current.top;
    targetTranslateY.current = relativeScroll * speed;
  });

  const setRefs = (element) => {
    videoRef.current = element;

    if (!ref) return;
    if (typeof ref === "function") {
      ref(element);
      return;
    }
    ref.current = element;
  };

  return (
    <video
      ref={setRefs}
      className={className}
      style={{
        willChange: "transform",
        transform: `translateY(0) scale(${scale})`,
      }}
      {...videoProps}
    >
      {children}
    </video>
  );
});

export default ParallaxVideo;
