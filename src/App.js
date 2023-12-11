import logo from './logo.svg';
import './App.css';
import LeftSide from './Components/LeftSide/LeftSide';
import RightSide from './Components/RightSide/RightSide';
import TopSide from './Components/TopSide/TopSide';
import BottomSide from './Components/BottomSide/BottomSide';
import DefaultGameScene from './Scene/DefaultGameScene';
import React from 'react';
import { useEffect, useState } from 'react';
import Modal from './Components/Modal/Modal';

function App() {
  return (
    <GUI>
      <DefaultGameScene />
    </GUI>
  );
}

function GUI({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    window.addEventListener('mousemove',(event)=>{});
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <Modal windowWidth={windowWidth} windowHeight={windowHeight}/>
      <div>
        <RightSide windowWidth={windowWidth} windowHeight={windowHeight} />
        <BottomSide windowWidth={windowWidth} windowHeight={windowHeight} />
        <TopSide windowWidth={windowWidth} windowHeight={windowHeight} />
        <LeftSide windowWidth={windowWidth} windowHeight={windowHeight} />
      </div>
      {React.cloneElement(children, { windowWidth, windowHeight })}
    </>
  );
}

export default App;
