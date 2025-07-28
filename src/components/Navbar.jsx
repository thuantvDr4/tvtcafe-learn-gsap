import React, { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';
import { TiLocationArrow, TiLocationOutline } from 'react-icons/ti';
import { twMerge } from 'tailwind-merge';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';

const Navbar = () => {
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef?.current?.classList.remove('floating-nav');
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef?.current?.classList.add('floating-nav');
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef?.current?.classList.add('floating-nav');
    }
    //---set value
    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  //--gsap
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setIsAudioPlaying(!isAudioPlaying);

    setIsIndicatorActive(!isIndicatorActive);
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying, isAudioPlaying]);

  const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];
  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex items-center justify-between p-4 size-full ">
          <div className="flex items-center gap-7">
            <img src={'/img/logo.png'} alt="logo" className="w-10" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="hidden md:flex bg-blue-50 items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems?.map((item) => (
                <a key={item} className="nav-hover-btn" href={`#${item?.toLowerCase()}`}>
                  {item}
                </a>
              ))}
            </div>

            <button className="ml-10 flex items-center space-x-0.5 cursor-pointer" onClick={toggleAudioIndicator}>
              <audio ref={audioElementRef} src={'/audio/loop.mp3'} loop className="hidden" />
              {[1, 2, 3, 4]?.map((bar) => (
                <div
                  key={bar}
                  className={twMerge(`indicator-line`, isIndicatorActive && 'active')}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                    // width: 2,
                  }}
                ></div>
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};
export default Navbar;
