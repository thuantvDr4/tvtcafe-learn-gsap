import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AnimatedTitle from './AnimatedTitle.jsx';

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: '#clip',
        start: 'center center',
        end: '+=800 center',
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to('.mask-clip-path', {
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
    });
  });
  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="flex flex-col relative mb-8 mt-36 items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">Welcome to Zentry</p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Game of Games begins-your life, now an epic MMORPG</p>
          <p>Zentry unites every player from countless games and platforms</p>
        </div>
      </div>
      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img src="img/about.webp" alt="Background" className="absolute left-0 top-0 size-full object-cover" />
        </div>
      </div>
    </div>
  );
};
export default About;
