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

  /**
   window data state
   */
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  /**
   Socket data state 
   */
  const [time, setTime] = useState();
  const [money, setMoney] = useState();
  const [stage, setStage] = useState();
  const [state, setState] = useState();
  const [shop, setShop] = useState();
  const [exp, setExp] = useState();
  const [hp, setHp] = useState();
  const [level, setLevel] = useState();
  const [boardUpdate, setBoardUpdate] = useState();
  const [players, setPlayers] = useState([]);
  const [items, setItems] = useState();
  const [battleUpdate,setBattleBoard] = useState();
  const [winning,setWinning]= useState();
  const [losing,setLosing] = useState();
  const [battleMove,setBattleMove] = useState();

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
          localStorage.setItem('id', msg.data)
          break;
        }
        case "gameMatched": {
          setPlayers(msg.data.players);
          console.log(msg.data.players);
          break;
        }
        case "shopUpdate": {
          setShop(msg.data.shop);
          break;
        }
        case "expUpdate": {
          setExp(msg.data);
          break;
        }
        case "levelUpdate": {
          setLevel(msg.data.level);
          break;
        }
        case "resGiveItem": {
          break;
        }
        case "stateUpdate": {
          setState(msg.data.state);
          break;
        }
        case "stageUpdate": {
          setStage(msg.data)
          break;
        }
        case "battle_attack": {
          break;
        }
        case "battle_move": {
          setBattleMove(msg.data);
          break;
        }
        case "itemUpdate": {
          break;
        }
        case "moneyUpdate": {
          setMoney(msg.data.money);
          break;
        }
        case "boardUpdate": {
          if (msg.data.player == localStorage.getItem('id')) {
            setBoardUpdate(msg.data);
          }
          break;
        }
        case "hpUpdate": {
          setHp(msg.data.hp);
          break;
        }
        case "battleUpdate": {
          setBattleBoard(msg.data);
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
          if(msg.data.player==localStorage.getItem('id')){
            setWinning(msg.data.winning);
          }
          break;
        }
        case "losingUpdate": {
          if(msg.data.player==localStorage.getItem('id')){
            setLosing(msg.data.losing);
          }
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
          windowHeight={windowHeight}
          players={players}
        />
        <BottomSide
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          shop={shop}
          level={level}
          exp={exp}
          money={money}
          winning={winning}
          losing={losing}
        />
        <TopSide
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          time={time}
          stage={stage}
          state={state}
        />
        <LeftSide
          windowWidth={windowWidth}
          windowHeight={windowHeight}
        />
      </div>
      {React.cloneElement(children, {
        windowWidth,
        windowHeight,
        boardUpdate,
        battleUpdate,
        battleMove,
        state,
      })}
    </>
  );
}


export default App;
