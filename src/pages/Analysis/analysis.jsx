import React, { useState, useEffect } from "react";
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
    margin-bottom: 40px;
`;

const HeartText = styled.span`
    margin-right: 5px;
    margin-top: 10px;
    font-size: 24px;
    color: #852fdc;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
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
    background-color: #f3f3f3;
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
// 10초, 20초, 30초, 40초, 50초, 60초, 70초 표시
const labels = ["10초", "20초", "30초", "40초", "50초", "60초", "70초", "80초"];

const data = {
    labels: labels,
    datasets: [
        {
            label: "호감도",
            data: [54, 51, 63, 82, 62, 32, 58, 52], // 7개의 데이터
            fill: true,
            backgroundColor: "rgba(93, 63, 211, 0.2)",
            borderColor: "#852fdc",
            tension: 0.3, // 곡선형으로 만듦
        },
    ],
};

const dialogData = [
    "나: 안녕하세요<br/>상대방: 안녕하세요 반갑습니다",
    "나: 전 이서진입니다 <br/>상대방: 어 전 심재호입니다 혹시 나이가 어떻게 되시나요",
    "나: 저는 24살이에요 재호님은 몇살이세요<br/>상대방: 아 저는 27살입니다<br/>나: 음 영화보는거 좋아하세 어떤영화 좋아하세요<br/>",
    "상대방: 오 저는 마블영화 좋아해요<br/>나: 어 저도 마블 좋아하는데 저는 어벤저스 좋아해요 캐릭터 누구 좋아하세요",
    "상대방: 저는 그루트요",
    "나: 아이엠 그루투<br/>상대방: 하 진짜 똑같은데요 흐 그루투 귀여워서 저도 좋아하거든요",
    "나: 아 서진님은 취미가 어떻게 되시나요<br/>상대방: 저는 아이돌 음악 듣는거 좋아해요",
    "나:  아이돌 좋아하시는구나 어떤 그룹 좋아하세요<br/>상대방: 저는 라이즈 원빈이요 원빈이 라이즈 센터인데 진짜 잘생겼거든요 진짜 잘생긴거밖에 생각이 안나요",
    "나: 아 그렇구나 저는 잘 모르겠네요<br/>상대방: 그루트 많이 좋아하시나봐요",
    "나: 맞아요 피규어도 엄청 많아요<br/>상대방: 피규어 되게 비쌀텐데 진짜 많이 좋아하시나보네요",
    "나: 맞아요 하 제가 소개팅이 처음이라 좀 어색하네요<br/>상대방: 저도 소개팅이 처음이라 무슨 말해야할지 모르겠어요",
];

const Analysis = () => {
    const [dialogIndex, setDialogIndex] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [averageHeartRate, setAverageHeartRate] = useState(0);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const sum = data.datasets[0].data.reduce((acc, value) => acc + value, 0);
        const average = Math.floor(sum / data.datasets[0].data.length); // 소수점 버림
        setAverageHeartRate(average);
    }, []);

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
                    <HeartText>{averageHeartRate}</HeartText>
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
