import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";

const NavbarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* 다른 요소보다 위에 표시되도록 z-index를 설정 */
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    //padding-top: 40px; /* Navbar 높이만큼 패딩을 추가하여 중앙에 위치하도록 */
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const StartButton = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    color: white;
    background-color: #852fdc;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        background-color: #731bc1;
    }
`;

const Home = () => {
    const navigate = useNavigate();

    const startChat = () => {
        navigate("/videochat");
    };

    return (
        <>
            <NavbarContainer>
                <Navbar />
            </NavbarContainer>
            <Container>
                <Title>화상채팅을 시작해보세요</Title>
                <StartButton onClick={startChat}>채팅 시작</StartButton>
            </Container>
        </>
    );
};

export default Home;
