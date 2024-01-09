import React, { useState } from 'react';
import Card from "./Card";
import { Socket } from '../../Util/Socket/Socket';

export default function StartModal({ windowWidth, windowHeight }) {
    const [modalOpen, setModalOpen] = useState(true);

    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = ''; // 모달이 닫힐 때 body의 overflow 스타일을 초기화
    };

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = 'hidden'; // 모달이 열릴 때 body의 overflow 스타일을 숨김
    };

    const scaleRatio = 1;
    const width = 100;

    const modalStyle = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%) scale(${scaleRatio})`,
        width: `${width * 12 + 20 * 2}px`,
        height: `${windowHeight / 2}px`,
        padding: "10px",
        color: "black",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        transition: "backdrop-filter 0.3s ease",
    };

    const handleCardClick=()=>{
        Socket.sendMsg("startWaiting", "");
        if (!Socket.id) Socket.sendMsg("reqNewId", null);
    }

    return (
        <>
            {modalOpen ? <div onClick={closeModal} style={modalStyle}>
                <Card name='게임 시작' content='하려면 클릭' onClick={handleCardClick} />
            </div> : null}
        </>
    );
}
