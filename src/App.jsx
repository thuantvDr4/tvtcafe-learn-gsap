// ---register gsap
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import React from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Navbar from './components/Navbar.jsx';
import Features from './components/Features.jsx';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main className="w-screen min-h-screen overflow-x-hidden relative">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  );
};

export default App;
