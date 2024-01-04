import React, { useEffect } from "react";

export class Socket {
    static socket = null;
    static id = localStorage.getItem("id");

    static sendMsg(type, data) {
        Socket.socket.send(
            JSON.stringify({
                from: Socket.id,
                type: type,
                data: data,
            })
        );
    }

    static onMessage(callback) {
        Socket.onMessageCallback = callback;
      }

    static init() {
        Socket.socket = new WebSocket("ws://localhost:4000");

        Socket.socket.onopen = function (event) {
            console.log("웹 소켓 연결 성공");
        };

        Socket.socket.onmessage = function (event) {
            const msg = JSON.parse(event.data);
            if (Socket.onMessageCallback) {
                Socket.onMessageCallback(msg);
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

