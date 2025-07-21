// ---register gsap
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main className="w-screen min-h-screen overflow-x-hidden relative">
      <Hero />
      <About />
    </main>
  );
};

export default App;
