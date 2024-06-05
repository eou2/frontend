import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    VideoSection,
    VideoWrapper,
    RemoteVideo,
    LocalVideo,
    ButtonContainer,
    Button,
    ChatSection,
    ChatBox,
    MessageInput,
    TopicBox,
    TopicBtn,
    TopicList,
    TopicItem,
    EndCallButton,
} from "./videochatStyle";
import videoOnIcon from "../../images/video-on.svg";
import videoOffIcon from "../../images/video-off.svg";
import micOnIcon from "../../images/mic-on.svg";
import micOffIcon from "../../images/mic-off.svg";
import LoadingComponent from "../../components/loading"; // 로딩 컴포넌트 임포트

function VideoChat() {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null); // 원격 스트림 관리
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [topicRecommendations, setTopicRecommendations] = useState([]); // 주제 추천 목록
    const [clickCount, setClickCount] = useState(0); // 버튼 클릭 횟수
    const ws = useRef(null);
    const roomId = "1"; // 고정된 방 ID로 설정
    const userId = "1"; // 고정된 사용자 ID로 설정
    const countRef = useRef(1); // 업로드 횟수
    const iceCandidatesBuffer = useRef([]); // ICE 후보자를 버퍼에 저장
    const messageBuffer = useRef([]); // WebSocket 메시지를 버퍼에 저장
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리
    const navigate = useNavigate();

    useEffect(() => {
        ws.current = new WebSocket("ws://43.203.209.38:8080/signal");
        ws.current.onopen = () => {
            console.log("WebSocket connection established");
            sendMessage({ type: "join_room", roomId });

            // WebSocket 연결 후 버퍼에 있는 메시지를 전송
            messageBuffer.current.forEach((msg) => {
                ws.current.send(JSON.stringify(msg));
            });
            messageBuffer.current = [];
        };
        ws.current.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            switch (data.type) {
                case "offer":
                    if (data.sender !== ws.current.id && peerConnection) {
                        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                        const answer = await peerConnection.createAnswer();
                        await peerConnection.setLocalDescription(answer);
                        sendMessage({ type: "answer", roomId, answer });

                        // 원격 설명이 설정된 후 버퍼에 있는 모든 후보자를 추가
                        iceCandidatesBuffer.current.forEach((candidate) => {
                            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                        });
                        iceCandidatesBuffer.current = [];
                    }
                    break;
                case "answer":
                    if (data.sender !== ws.current.id && peerConnection) {
                        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));

                        // 원격 설명이 설정된 후 버퍼에 있는 모든 후보자를 추가
                        iceCandidatesBuffer.current.forEach((candidate) => {
                            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                        });
                        iceCandidatesBuffer.current = [];
                    }
                    break;
                case "candidate":
                    if (data.sender !== ws.current.id) {
                        if (peerConnection && peerConnection.remoteDescription) {
                            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                        } else {
                            iceCandidatesBuffer.current.push(data.candidate);
                        }
                    }
                    break;
            }
        };

        return () => {
            ws.current.close();
        };
    }, [peerConnection]);

    useEffect(() => {
        async function getMedia() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                localVideoRef.current.srcObject = stream;
                setLocalStream(stream);

                const pc = new RTCPeerConnection();
                stream.getTracks().forEach((track) => pc.addTrack(track, stream));

                pc.onicecandidate = (event) => {
                    if (event.candidate) {
                        sendMessage({ type: "candidate", roomId, candidate: event.candidate.toJSON() });
                    }
                };

                pc.ontrack = (event) => {
                    if (remoteVideoRef.current && !remoteVideoRef.current.srcObject) {
                        remoteVideoRef.current.srcObject = event.streams[0];
                        setRemoteStream(event.streams[0]); // 원격 스트림 설정
                        // 원격 미디어 레코더 설정
                        const options = { mimeType: "video/webm; codecs=vp9" };
                        const remoteRecorder = new MediaRecorder(event.streams[0], options);
                        remoteRecorder.ondataavailable = handleRemoteDataAvailable;
                        remoteRecorder.start(10000); // 10초마다 데이터 전송
                    }
                };

                pc.oniceconnectionstatechange = () => console.log(`ICE state: ${pc.iceConnectionState}`);
                pc.onconnectionstatechange = () => console.log(`Connection state: ${pc.connectionState}`);

                setPeerConnection(pc);

                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                sendMessage({ type: "offer", roomId, offer });
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        }
        getMedia();
    }, [roomId]);

    const sendMessage = (data) => {
        if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ ...data, sender: ws.current.id }));
        } else {
            messageBuffer.current.push({ ...data, sender: ws.current.id }); // 여기에서 세미콜론을 추가합니다
        }
    };

    const handleRemoteDataAvailable = (event) => {
        if (event.data.size > 0) {
            // Check the data type and size for debugging
            console.log("Data available: ", event.data);
            console.log("Data type: ", event.data.type);
            console.log("Data size: ", event.data.size);
            uploadRemoteData(event.data);
        }
    };

    const uploadRemoteData = async (data) => {
        const formData = new FormData();
        formData.append("audiofile", new Blob([data], { type: "audio/webm" }), "audio.webm");
        formData.append("videofile", new Blob([data], { type: "video/webm" }), "video.webm");

        // Log FormData keys for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            const response = await fetch(
                `http://3.36.131.179:8000/upload-video/${roomId}/${userId}/${countRef.current}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                console.log("Upload successful");
                countRef.current += 1; // 업로드 성공 시 카운트를 증가
            } else {
                console.error("Upload failed", response.statusText);
            }
        } catch (error) {
            console.error("Error uploading data", error);
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks()[0].enabled = !isVideoEnabled;
            setIsVideoEnabled(!isVideoEnabled);
        }
    };

    const toggleAudio = () => {
        if (localStream) {
            localStream.getAudioTracks()[0].enabled = !isAudioEnabled;
            setIsAudioEnabled(!isAudioEnabled);
        }
    };

    const fetchProfileBasedTopics = async () => {
        try {
            const response = await fetch(`http://43.203.209.38:8080/subject/${userId}/profile`);
            if (response.ok) {
                const data = await response.json();
                setTopicRecommendations(data.profileSubject);
            } else {
                console.error("Error fetching profile-based topics:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching profile-based topics:", error);
        }
    };

    const fetchConversationBasedTopics = async () => {
        try {
            const response = await fetch(`http://43.203.209.38:8080/subject/${roomId}/${userId}/scenario`);
            if (response.ok) {
                const data = await response.json();
                setTopicRecommendations(data.profileSubject);
            } else {
                console.error("Error fetching conversation-based topics:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching conversation-based topics:", error);
        }
    };

    const handleTopicButtonClick = () => {
        if (clickCount === 0) {
            fetchProfileBasedTopics();
        } else {
            fetchConversationBasedTopics();
        }
        setClickCount(clickCount + 1);
    };

    const handleEndCall = () => {
        setIsLoading(true); // 로딩 상태 활성화
        setTimeout(() => {
            navigate("/analysis");
        }, 3000); // 3초 후에 페이지 이동
    };

    return (
        <Container>
            {isLoading && <LoadingComponent />}
            <VideoSection>
                <VideoWrapper>
                    <RemoteVideo ref={remoteVideoRef} autoPlay playsInline />
                    <LocalVideo ref={localVideoRef} autoPlay playsInline />
                </VideoWrapper>
                <ButtonContainer>
                    <Button onClick={toggleVideo}>
                        <img src={isVideoEnabled ? videoOnIcon : videoOffIcon} alt="Toggle Video" />
                    </Button>
                    <Button onClick={toggleAudio}>
                        <img src={isAudioEnabled ? micOnIcon : micOffIcon} alt="Toggle Audio" />
                    </Button>
                    <EndCallButton onClick={handleEndCall}>종료</EndCallButton>
                </ButtonContainer>
            </VideoSection>
            <ChatSection>
                <ChatBox>
                    {/* 채팅 메시지를 표시하는 부분 */}
                    <TopicBtn onClick={handleTopicButtonClick}>대화 주제 추천</TopicBtn>
                    <TopicBox>
                        <TopicList>
                            {topicRecommendations.map((topic, index) => (
                                <TopicItem key={index}>{topic}</TopicItem>
                            ))}
                        </TopicList>
                    </TopicBox>
                </ChatBox>
                <MessageInput placeholder="메시지를 입력하세요..." />
            </ChatSection>
        </Container>
    );
}

export default VideoChat;
