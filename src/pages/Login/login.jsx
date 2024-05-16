import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Error, Form, Input, Switcher, Wrapper } from "../../components/auth-components";
import { Link } from "react-router-dom";
import logoImage from "../../images/EF_Logo.png";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "") return;

        setLoading(true);
        // 여기에 로그인 로직을 구현할 예정
        console.log(email, password);
        setLoading(false);
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
                <Input type="submit" value={isLoading ? "Loading..." : "로그인"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
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
