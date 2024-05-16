import { useNavigate } from "react-router-dom";
//import PostTweetForm from "../components/post-tweet-form";
import styled from "styled-components";
const Wrapper = styled.div``;
export default function Home() {
    const navigate = useNavigate();
    // const logOut = () => {
    //     console.log("log out!!!");
    //     auth.signOut();
    //     navigate("/login");
    // };
    return <Wrapper></Wrapper>;
}
