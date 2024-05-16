// import { useState } from "react";
// import { useSetRecoilState } from "recoil";
// import { userState } from "../state/atoms";
// import { useNavigate } from "react-router-dom";
// import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
// import GithubButton from "../components/github-btn";
// import axios from "axios"; // axios 라이브러리를 사용하여 API 요청을 보냅니다.

// export default function Signup() {
//     const navigate = useNavigate();
//     const setUser = useSetRecoilState(userState);
//     const [isLoading, setLoading] = useState(false);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     const onChange = (e) => {
//         const { name, value } = e.target;
//         if (name === "name") setName(value);
//         else if (name === "email") setEmail(value);
//         else if (name === "password") setPassword(value);
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         if (isLoading || !name || !email || !password) return;
//         setLoading(true);

//         try {
//             const response = await axios.post("https://your-api-server.com/signup", {
//                 email,
//                 password,
//                 name,
//             });
//             const { token, userData } = response.data;
//             localStorage.setItem("jwtToken", token);
//             setUser(userData); // 사용자 상태 업데이트
//             navigate("/");
//         } catch (error) {
//             console.error(error);
//             setError(error.response?.data?.message || "An error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Wrapper>
//             <Title>Join EF</Title>
//             <Form onSubmit={onSubmit}>
//                 <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" required />
//                 <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
//                 <Input
//                     onChange={onChange}
//                     name="password"
//                     value={password}
//                     placeholder="Password"
//                     type="password"
//                     required
//                 />
//                 <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
//             </Form>
//             {error ? <Error>{error}</Error> : null}
//             <Switcher>
//                 Already have an account? <Link to="/login">Log in →</Link>
//             </Switcher>
//             <GithubButton />
//         </Wrapper>
//     );
// }
