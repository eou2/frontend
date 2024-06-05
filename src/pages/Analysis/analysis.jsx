import React, { useState } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../images/EF_Logo.png";
// Chart.js 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    font-family: "Poppins", sans-serif;
    padding-top: 60px;
`;

const NavbarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px; /* Navbar의 세로길이 수정 */
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`;

const Header = styled.h1`
    color: #852fdc;
    font-size: 25px;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
`;

const HeartContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const HeartText = styled.span`
    margin-right: 5px;
    margin-top: 10px;
    font-size: 24px;
    color: #852fdc;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
`;

const HeartWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
`;

const GraphContainer = styled.div`
    width: 800px;
    max-width: 2800px; /* 가로 길이 더 늘림 */
    height: 300px; /* 세로 길이 고정 */
    margin-bottom: 20px;
`;

const DialogContainer = styled.div`
    width: 100%;
    max-width: 2400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-color: #f0f0f0;
`;

const DialogText = styled.p`
    font-size: 16px;
    line-height: 1.5;
`;

const Logo = styled.img`
    height: 50px;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: ${(props) => (props.show ? "block" : "none")};
`;
const MenuItem = styled(Link)`
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
    &:hover {
        background-color: #f0f0f0;
    }
`;
const MenuButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;
// 8분을 10초 단위로 표시
const labels = Array.from({ length: 49 }, (_, i) => (i * 10).toString()); // 0부터 480초(8분)까지 10초 단위

const data = {
    labels: labels,
    datasets: [
        {
            label: "호감도",
            data: [
                20, 30, 50, 40, 60, 80, 70, 90, 90, 80, 70, 50, 60, 70, 80, 60, 50, 70, 90, 90, 80, 70, 60, 50, 40, 30,
                20, 10, 20, 30, 50, 60, 70, 80, 80, 80, 80, 70, 70, 60, 50, 40, 30, 20, 10, 20, 30, 40, 50,
            ], // 48개의 데이터
            fill: true,
            backgroundColor: "rgba(93, 63, 211, 0.2)",
            borderColor: "#852fdc",
        },
    ],
};

const dialogData = [
    "남자: 안녕하세요.<br/>여자: 안녕하세요.",
    "남자: 아, 혹시 나이가 어떻게 되세요?<br/>여자: 저 저 22살이요. 나이가 어떻게 되세요?",
    "남자: 아 저 26살이요.<br/>여자: 아 엠비티이가 어떻게 배세요?",
    "남자: 저 이에스티제이요.<br/>여자: 아 아 저는 아이엔티피요.",
    "남자: 취미가 어떻게 배세요?<br/>여자: 음, 저는 마블 영화 보는 거 좋아해요.",
    "남자: 오, 마블 저도 마블 되게 좋아하는데.<br/>남자: 그르트 너무 귀엽지 않아요?",
    "여자: 맞아요 저 그루트 피규어도 집에 있어요.", // 여기만 종합 호감도 80으로 설정됨
    "남자: 저는 헬스 좋아해요.<br/>여자: 아, 진짜요? 헬스 좋아하세요, 3대.<br/>여자: 시는지 아세요?",
    "남자: 음, 저 400정도 들어요.<br/>여자: 아, 그래요? 아, 400이면 되게 잘 치시네요.",
    "남자: 장당하죠.<br/>여자: 되게 멋져요.",
    "남자: 그런.",
    // 나머지 대화 데이터 추가
];

const Analysis = () => {
    const [dialogIndex, setDialogIndex] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // 그래프의 비율을 유지하지 않음
        scales: {
            x: {
                type: "category", // 이 부분이 CategoryScale을 사용하도록 설정
                title: {
                    display: false,
                    text: "시간(초)",
                },
                grid: {
                    display: false, // x축 격자선 제거
                },
                ticks: {
                    callback: function (value, index) {
                        // 라벨을 60초(1분) 간격으로만 표시
                        const seconds = parseInt(this.getLabelForValue(value));
                        const minutes = Math.floor(seconds / 60);
                        return seconds % 60 === 0 ? `${minutes}분` : "";
                    },
                    maxRotation: 0, // 라벨을 똑바로 표시
                    minRotation: 0, // 라벨을 똑바로 표시
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: "호감도",
                },
                grid: {
                    display: false, // y축 격자선 제거
                },
            },
        },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const { index } = elements[0];
                setDialogIndex(index);
            }
        },
    };

    return (
        <>
            <NavbarContainer>
                <Logo src={logo} alt="Logo" />
                <MenuButton onClick={toggleMenu}>☰</MenuButton>
                <DropdownMenu show={showMenu}>
                    <MenuItem to="/settings">환경설정</MenuItem>
                    <MenuItem to="/logout">로그아웃</MenuItem>
                </DropdownMenu>
            </NavbarContainer>
            <Container>
                <Header>최종 호감도</Header>
                <HeartContainer>
                    <HeartText>
                        <FiHeart />
                    </HeartText>
                    <HeartText>70</HeartText>
                </HeartContainer>
                <GraphContainer>
                    <Line data={data} options={options} />
                </GraphContainer>
                <DialogContainer>
                    <DialogText
                        dangerouslySetInnerHTML={{
                            __html:
                                dialogIndex !== null
                                    ? dialogData[dialogIndex % dialogData.length]
                                    : "그래프의 특정 부분을 클릭하여 대화내용을 확인하세요.",
                        }}
                    />
                </DialogContainer>
            </Container>
        </>
    );
};

export default Analysis;
