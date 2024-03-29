import { useEffect } from "react";
import BuyXP from "./BuyXP";
import CharacterCard from "./CharacterCard";
import Reload from "./Reload";
import Level from "./Level";
import Money from "./Money";
import Winning from "./Winning";
import { Socket } from "../../Util/Socket/Socket";

export default function BottomSide({ windowWidth, windowHeight, shop, level, exp, money,winning,losing, }) {

  const scaleRatio = 1;
  const height = 150;

  const bottomSideStyle = {
    position: "fixed",
    bottom: 0,
    left: "48%",
    width: `${windowWidth / 1.9}px`,
    height: `${height}px`,
    marginLeft: `-${windowWidth / 4}px`,
    padding: "10px",
    color: "black",
    boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.1)",
    // border:'1px solid white',
    borderRadius:'10px',
    display: "flex", // 수정된 부분
    transform: `scale(${scaleRatio})`,
    transformOrigin: "bottom left",
  };

  const stackBoxStyle = {
    border: "1px solid #ccc",
    width: '20%',
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  };

  const characterCardContainerStyle = {
    display: "flex",
    flexDirection: "row", // 수정된 부분
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1, // 수정된 부분
    marginLeft: "10px", // 수정된 부분
  };

  const moneyBoxStyle={
    position: "fixed",
    bottom: 160,
    left: "48%",
    padding: "10px",
  }

  const winningBoxStyle={
    position: "fixed",
    bottom: 160,
    left: "53%",
    padding: "10px",
  }

  return (
    <>
    <div style={moneyBoxStyle}>
        <Money money={money}/>
    </div>
    <div style={winningBoxStyle}>
        <Winning winning={winning} losing={losing}/>
    </div>
    <div style={bottomSideStyle}>
      <div style={stackBoxStyle}>
        <Level level={level} exp={exp}/>
        <BuyXP />
        <Reload />
        {/* <Money money={money}/> */}
      </div>
      <div style={characterCardContainerStyle}>
        {shop && shop.map((e, i) => {
          return (
            <CharacterCard onClick={()=>{
              console.log('character clicked');
              Socket.sendMsg("reqBuyCat", {
                index: i,
            });
            }} key={i} shop={shop[i]} />
          )
        })}
      </div>
    </div>
    </>
  );
}
