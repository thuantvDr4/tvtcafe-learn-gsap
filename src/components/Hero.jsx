import React, { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);
  const upComingVideo = (currentIndex % totalVideos) + 1;

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    console.log('------vide', loadedVideos);
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#next-video', { visibility: 'visible' });

        gsap.to('#next-video', {
          transformOrigin: 'center center',
          scale: 1,
          duration: 1,
          width: '100%',
          height: '100%',
          ease: 'power1.inOut',
          onStart: () => nextVideoRef.current?.play(),
        });

        gsap.from('#current-video', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true },
  );

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 10%',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  return (
    <div className={'relative h-dvh w-screen overflow-x-hidden'}>
      {isLoading && (
        <div className="absolute z-[100] flex items-center justify-center h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVideoClick}
              className="origin-center scale-50 transition-all duration-500 ease-in opacity-0 hover:opacity-100 hover:scale-100"
            >
              <video
                id="current-video"
                ref={nextVideoRef}
                loop
                src={getVideoSrc(upComingVideo)}
                muted={true}
                className="origin-video scale-150 object-cover object-center size-64"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            id="next-video"
            src={getVideoSrc(currentIndex)}
            ref={nextVideoRef}
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
            loop
            muted
          />

          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute size-full left-0 top-0 z-40 ">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="text-blue-100 mb-5 max-w-64 font-robert-regular">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              title="Watch Trailer"
              id="watch-trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};
export default Hero;
