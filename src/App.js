import logo from './logo.svg';
import './App.css';
import LeftSide from './Components/LeftSide/LeftSide';
import RightSide from './Components/RightSide/RightSide';
import TopSide from './Components/TopSide/TopSide';
import BottomSide from './Components/BottomSide/BottomSide';
import DefaultGameScene from './Scene/DefaultGameScene';
function App() {
  return (
      <GUI>
        <DefaultGameScene />
      </GUI>
  );
}

function GUI() {
  return (
    <>
      <LeftSide />
      <RightSide />
      <BottomSide />
      <TopSide />
    </>
  )
}

export default App;
