import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Error, Form, Input, Switcher, Wrapper } from "../../components/auth-components";
import { Link } from "react-router-dom";
import logoImage from "../../images/EF_Logo.png";
import { useAuth } from "../../hooks/useAuth";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, login } = useAuth();

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (auth.isLoading || email === "" || password === "") return;

        try {
            console.log("Sending login request...", { email, password });
            await login(email, password);
            console.log("Login response:", auth);

            if (auth.isAuthenticated) {
                navigate("/");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <Wrapper>
            <Logo src={logoImage} alt="EF Logo" />
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input
                    onChange={onChange}
                    name="password"
                    value={password}
                    placeholder="Password"
                    type="password"
                    required
                />
                <Input type="submit" value={auth.isLoading ? "Loading..." : "로그인"} />
            </Form>
            {auth.error && <Error>{auth.error}</Error>}
            <Switcher>
                계정이 없으신가요? <Link to="/signup">가입하기 &rarr;</Link>
            </Switcher>
        </Wrapper>
    );
}

const Logo = styled.img`
    width: 300px;
    height: auto;
    display: block;
    margin: 0 auto 20px;
`;
