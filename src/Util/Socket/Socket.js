export default class Socket{
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

    static init(){
        Socket.socket = new WebSocket('ws://localhost:4000');

        Socket.socket.onopen = function(event){
            console.log('웹 소켓 연결 성공');
        }
        Socket.socket.onmessage = function (event) {
            const msg = JSON.parse(event.data);
            const { type, data } = msg;
            if (type !== "timeUpdate") console.log(msg);
            switch (type) {
                case "resNewId":
                    break;
                case "newPlayer":
                    break;
                case "gameMatched":
                    break;
                case "shopUpdate":
                    break;
                case "expUpdate":
                    break;
                case "levelUpdate":
                    break;
                case "resGiveItem":
                    break;
                case "stateUpdate":
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