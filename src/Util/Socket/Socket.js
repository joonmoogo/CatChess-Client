import { useEffect } from "react";

class Socket {
    static socket = null;
    static id = localStorage.getItem('id');

    static sendMsg(type, data) {
        Socket.socket.send(
            JSON.stringify({
                from: Socket.id,
                type: type,
                data: data,
            })
        );
    }


    static init() {
        Socket.socket = new WebSocket('ws://localhost:4000');

        Socket.socket.onopen = function (event) {
            console.log('웹 소켓 연결 성공');
            Socket.sendMsg("startWaiting", "");
        }
        // 메세지 받았을 때 동작
        Socket.socket.onmessage = function (event) {
            const msg = JSON.parse(event.data);
            const { type, data } = msg;
            if (type !== "timeUpdate") console.log(msg);
            switch (type) {
                case "resNewId": // 새 아이디 받음
                    break;
                case "newPlayer": // 새 플레이어가 대기열 입장함
                    break;
                case "gameMatched": // 게임 매칭 완료
                    break;
                case "shopUpdate": // 총 맞음 
                    break;
                case "expUpdate": // 경험치 업데이트
                    break;
                case "levelUpdate": // 레벨 업데이트
                    break;
                case "resGiveItem": // 보유 아이템 수정
                    break;
                case "stateUpdate": // 
                    break;
                case "stageUpdate":
                    break;
                case "battle_move":
                    break;
                case "battle_attack":
                    break;
                case "battle_dead":
                    break;
                case "creep":
                    break;
                case "dropItem":
                    break;
                case "moneyUpdate":
                    break;
                case "boardUpdate":
                    break;
                case "playerHpUpdate":
                    break;
                case "battleUpdate":
                    break;
                case "battleResult":
                    break;
                case "timeUpdate":
                    break;
                case "winningUpdate":
                    break;
                case "losingUpdate":
                    break;
                default:
                    console.log(msg);
                    break;
            }
        };
        Socket.socket.onclose = function (event) {
            console.log("웹 소켓 연결 해제");
        };
        Socket.socket.onerror = function (event) {
            console.error(event);
        };
    }

}
export default function SocketProvider({ children }) {
    useEffect(() => {
        Socket.init();
    }, []);
    return <>
        {children}
    </>;
}