import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import videoOnIcon from "../../images/video-on.svg";
import videoOffIcon from "../../images/video-off.svg";
import micOnIcon from "../../images/mic-on.svg";
import micOffIcon from "../../images/mic-off.svg";
import callIcon from "../../images/call-on.svg";
import hangupIcon from "../../images/call-off.svg";

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

const ChatSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
`;

const ChatBox = styled.div`
    width: 100%;
    height: 80%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    overflow-y: auto;
    margin-bottom: 10px;
`;

const ChatInput = styled.input`
    width: calc(100% - 20px);
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
`;

function VideoChat() {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [isCallActive, setIsCallActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const ws = useRef(null);
    const [roomId] = useState("12345"); // Room ID는 실제 환경에 맞게 설정하세요.
    const [username] = useState("user1"); // 사용자 이름은 실제 환경에 맞게 설정하세요.

    useEffect(() => {
        ws.current = new WebSocket("ws://43.203.209.38:8080/signal");
        ws.current.onopen = () => {
            console.log("WebSocket connection established");
            sendMessage({ type: "join_room", roomId, sender: username });
        };
        ws.current.onclose = () => {
            console.log("WebSocket connection closed");
        };
        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            alert("WebSocket connection failed. Please check the server and try again.");
        };

        ws.current.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            switch (data.type) {
                case "offer":
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                    const answer = await peerConnection.createAnswer();
                    await peerConnection.setLocalDescription(answer);
                    sendMessage({ type: "answer", roomId, answer, sender: username });
                    break;
                case "answer":
                    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
                    break;
                case "candidate":
                    await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                    break;
                case "message":
                    setMessages((prev) => [...prev, data.message]);
                    break;
                case "all_users":
                    // Handle displaying all users
                    break;
                case "leave":
                    // Handle user leaving
                    break;
                default:
                    console.log("Unknown message type:", data.type);
            }
        };

        return () => {
            ws.current.close();
        };
    }, [peerConnection, roomId, username]);

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
                        sendMessage({ type: "candidate", roomId, candidate: event.candidate, sender: username });
                    }
                };
                pc.ontrack = (event) => {
                    remoteVideoRef.current.srcObject = event.streams[0];
                };
                setPeerConnection(pc);
            } catch (err) {
                console.error("Error accessing media devices.", err);
            }
        }
        getMedia();
    }, [roomId, username]);

    const sendMessage = (data) => {
        if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify(data));
        } else {
            console.error("WebSocket is not open: ", ws.current.readyState);
        }
    };

    const handleCall = async () => {
        if (isCallActive) {
            if (peerConnection) {
                peerConnection.close();
                setPeerConnection(null);
                setIsCallActive(false);
            }
        } else {
            const pc = new RTCPeerConnection();
            localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
            pc.onicecandidate = (event) => {
                if (event.candidate) {
                    sendMessage({ type: "candidate", roomId, candidate: event.candidate, sender: username });
                }
            };
            pc.ontrack = (event) => {
                remoteVideoRef.current.srcObject = event.streams[0];
            };
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            sendMessage({ type: "offer", roomId, offer, sender: username });
            setPeerConnection(pc);
            setIsCallActive(true);
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

    const handleSendMessage = () => {
        sendMessage({ type: "message", roomId, message: newMessage, sender: username });
        setNewMessage("");
    };

    return (
        <Container>
            <VideoSection>
                <VideoWrapper>
                    <RemoteVideo ref={remoteVideoRef} autoPlay playsInline />
                    <LocalVideo ref={localVideoRef} autoPlay playsInline />
                </VideoWrapper>
                <ButtonContainer>
                    <Button onClick={handleCall}>
                        <img
                            src={isCallActive ? hangupIcon : callIcon}
                            alt={isCallActive ? "End Call" : "Start Call"}
                        />
                    </Button>
                    <Button onClick={toggleVideo}>
                        <img src={isVideoEnabled ? videoOnIcon : videoOffIcon} alt="Toggle Video" />
                    </Button>
                    <Button onClick={toggleAudio}>
                        <img src={isAudioEnabled ? micOnIcon : micOffIcon} alt="Toggle Audio" />
                    </Button>
                </ButtonContainer>
            </VideoSection>
            <ChatSection>
                <ChatBox>
                    {messages.map((msg, index) => (
                        <div key={index}>{msg}</div>
                    ))}
                </ChatBox>
                <ChatInput
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                    }}
                    placeholder="Type a message..."
                />
            </ChatSection>
        </Container>
    );
}

export default VideoChat;
