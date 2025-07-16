// ---register gsap
import {ScrollTrigger, SplitText} from 'gsap/all'
import React from 'react';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <div>App</div>
  );
};

export default App;