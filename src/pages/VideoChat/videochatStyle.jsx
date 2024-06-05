import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f0f0f0;
`;

export const VideoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 3;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin-right: 20px;
`;

export const VideoWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
`;

export const RemoteVideo = styled.video`
    width: 100%;
    height: 100%;
    background-color: black;
`;

export const LocalVideo = styled.video`
    position: absolute;
    width: 280px;
    height: 210px;
    bottom: 20px;
    right: 20px;
    background-color: black;
    border: 2px solid white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 10px;
    img {
        width: 50px;
        height: 50px;
    }
`;

export const ChatSection = styled.div`
    flex: 1;
    width: 200px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

export const ChatBox = styled.div`
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    overflow-y: auto;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; /* TopicBtn을 중앙에 정렬 */
`;

export const MessageInput = styled.textarea`
    width: 100%;
    height: 100px;
    border-radius: 8px;
    border: 1px solid #ddd;
    padding: 10px;
    resize: none;
`;

export const TopicBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column; /* flex-direction을 column으로 변경 */
    align-items: center; /* TopicBtn과 TopicList를 중앙에 정렬 */
    border: 0.5px solid;
    border-radius: 10px;
    border-color: #c9c9c9;
    width: calc(100% - 20px); /* 부모 요소와 일정한 간격을 유지 (10px 패딩을 고려) */
    margin: 10px; /* 부모 요소와의 간격을 설정 */
    min-height: 80px; /* 고정된 세로 크기 설정 */
`;

export const TopicBtn = styled.button`
    margin-bottom: 20px;
    margin-top: 10px;
    border-radius: 12px; /* 모서리를 둥글게 */
    font-family: "Arial", sans-serif; /* 이쁜 폰트 적용 (Arial 예시) */
    font-weight: bold; /* 글자 굵기 굵게 */
    font-size: 14px; /* 글자 크기 키우기 */
    padding: 10px 20px; /* 버튼 크기 키우기 */
    background-color: #852fdc; /* 버튼 배경색 */
    color: white; /* 글자 색상 */
    border: none; /* 테두리 제거 */
    cursor: pointer; /* 커서 변경 */
    transition: background-color 0.3s ease; /* 부드러운 전환 효과 */

    &:hover {
        background-color: #561e8d; /* hover 시 배경색 변경 */
    }
`;

export const TopicList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 5px;
`;

export const TopicItem = styled.li`
    margin-bottom: 5px;
`;

export const EndCallButton = styled.button`
    margin-left: 1%;
    border: 2px solid black;
    background-color: white;
    padding: 8px 16px; /* 크기 줄이기 */
    cursor: pointer;
    border-radius: 8px; /* 모서리 둥글게 */
    &:hover {
        background-color: lightgray;
    }
`;
