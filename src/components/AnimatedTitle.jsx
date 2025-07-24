import React, { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import gsap from 'gsap';

const AnimatedTitle = ({ title, containerClass }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '100 bottom',
          end: 'center bottom',
          toggleActions: 'play none none reverse',
        },
      });

      titleAnimation.to(
        '.animated-word',
        {
          opacity: 1,
          transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
          ease: 'power2.inOut',
          stagger: 0.02,
        },
        0,
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className={twMerge('animated-title', containerClass)}>
      {title?.split('<br />').map((line, i) => (
        <div key={i} className="flex-center max-w-full flex-wrap gap-2 md:gap-3">
          {line?.split(' ').map((word, idx) => (
            <span
              key={idx}
              className="animated-word special-font font-zentry font-black opacity-0"
              dangerouslySetInnerHTML={{ __html: word }}
            ></span>
          ))}
        </div>
      ))}
    </div>
  );
};
export default AnimatedTitle;
