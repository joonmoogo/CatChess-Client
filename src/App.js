import logo from './logo.svg';
import './App.css';
import LeftSide from './Components/LeftSide/LeftSide';
import RightSide from './Components/RightSide/RightSide';
import TopSide from './Components/TopSide/TopSide';
import BottomSide from './Components/BottomSide/BottomSide';
import DefaultGameScene from './Scene/DefaultGameScene';
import React from 'react';
import { useEffect, useState } from 'react';
import CardModal from './Components/Modal/CardModal';
import StartModal from './Components/Modal/StartModal';
import { Socket } from './Util/Socket/Socket';

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

  const [time, setTime] = useState();
  const [money, setMoney] = useState();
  const [stage, setStage] = useState();


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    window.addEventListener('mousemove', (event) => { });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    Socket.init();
    Socket.onMessage((msg) => {
      console.log(msg);
      const type = msg.type
      switch (type) {
        case "resNewId": {
          break;
        }
        case "gameMatched": {
          break;
        }
        case "shopUpdate": {
          break;
        }
        case "expUpdate": {
          break;
        }
        case "levelUpdate": {
          break;
        }
        case "resGiveItem": {
          break;
        }
        case "stateUpdate": {
          break;
        }
        case "stageUpdate": {
          setStage(msg.data)
          break;
        }
        case "battle_attack": {
          break;
        }
        case "battle_dead": {
          break;
        }
        case "itemUpdate": {
          break;
        }
        case "moneyUpdate": {
          break;
        }
        case "boardUpdate": {
          break;
        }
        case "hpUpdate": {
          break;
        }
        case "battleUpdate": {
          break;
        }
        case "battleResult": {
          break;
        }
        case "timeUpdate": {
          setTime(msg.data.time);
          break;
        }
        case "winningUpdate": {
          break;
        }
        case "losingUpdate": {
          break;
        }
      }
    })
  }, [])

  return (
    <>
      <StartModal
        windowWidth={windowWidth}
        windowHeight={windowHeight}
      />
      <div>
        <RightSide
          windowWidth={windowWidth}
          windowHeight={windowHeight} />
        <BottomSide
          windowWidth={windowWidth}
          windowHeight={windowHeight} />
        <TopSide
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          time={time}
          stage={stage}
          
          />
        <LeftSide
          windowWidth={windowWidth}
          windowHeight={windowHeight} />
      </div>
      {React.cloneElement(children, { windowWidth, windowHeight })}
    </>
  );
}


export default App;
