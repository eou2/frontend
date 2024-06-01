import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import videoOnIcon from "../../images/video-on.svg";
import videoOffIcon from "../../images/video-off.svg";
import micOnIcon from "../../images/mic-on.svg";
import micOffIcon from "../../images/mic-off.svg";

const Container = styled.div`
    display: flex;
    height: 100vh;
    background-color: #f0f0f0;
`;

const VideoSection = styled.div`
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

const VideoWrapper = styled.div`
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

const RemoteVideo = styled.video`
    width: 100%;
    height: 100%;
    background-color: black;
`;

const LocalVideo = styled.video`
    position: absolute;
    width: 330px;
    height: 250px;
    bottom: 20px;
    right: 20px;
    background-color: black;
    border: 2px solid white;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`;

const ButtonContainer = styled.div`
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

const Button = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin: 0 10px;
    img {
        width: 50px;
        height: 50px;
    }
`;

function VideoChat() {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const ws = useRef(null);
    const roomId = "1"; // 고정된 방 ID로 설정
    const iceCandidatesBuffer = useRef([]); // ICE 후보자를 버퍼에 저장
    const messageBuffer = useRef([]); // WebSocket 메시지를 버퍼에 저장

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
                    if (data.sender !== ws.current.id) {
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
                    if (data.sender !== ws.current.id) {
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
            messageBuffer.current.push({ ...data, sender: ws.current.id });
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

    return (
        <Container>
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
                </ButtonContainer>
            </VideoSection>
        </Container>
    );
}

export default VideoChat;
