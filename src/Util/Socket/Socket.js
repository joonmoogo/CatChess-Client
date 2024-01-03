import React, { createContext, useEffect, useState } from "react";

export class Socket {
  static socket = null;
  static id = localStorage.getItem("id");
  static globalState = null;

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
    Socket.socket = new WebSocket("ws://localhost:4000");

    Socket.socket.onopen = function (event) {
      console.log("웹 소켓 연결 성공");
    };

    Socket.socket.onmessage = function (event) {
      const msg = JSON.parse(event.data);
      Socket.updateGlobalState(msg);
    };

    Socket.socket.onclose = function (event) {
      console.log("웹 소켓 연결 해제");
    };

    Socket.socket.onerror = function (event) {
      console.error(event);
    };
  }

  static globalStateUpdater(msg){
    this.globalState = msg;
    return this.globalState;
  }

  static updateGlobalState(msg) {
    if (Socket.globalStateUpdater()) {
      Socket.globalStateUpdater(msg);
    }
  }
}

const SocketContext = createContext();

export const useSocket = () => {
  return React.useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  const [msgData, setMsgData] = useState(null);

  // 전역 상태 업데이트 함수 설정
  useEffect(() => {
    Socket.globalStateUpdater = setMsgData;
    return () => {
      // 컴포넌트가 언마운트되면 업데이트 함수 정리
      Socket.globalStateUpdater = null;
    };
  }, []);

  useEffect(() => {
    Socket.init();
  }, []);

  const contextValue = {
    socket: Socket.socket,
    sendMessage: Socket.sendMsg,
    msgData,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
