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
    margin-bottom: 20px;
`;

export const TopicBtn = styled.button`
    margin-bottom: 10px;
`;

export const TopicList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const TopicItem = styled.li`
    margin-bottom: 5px;
`;
export const EndCallButton = styled.button`
    margin-left: 15px;
    border: 2px solid black;
    background-color: white;
    padding: 8px 16px; /* 크기 줄이기 */
    cursor: pointer;
    border-radius: 8px; /* 모서리 둥글게 */
    &:hover {
        background-color: lightgray;
    }
`;
