import styled from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;
export const Title = styled.h1`
    font-size: 42px;
`;
export const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;
export const Input = styled.input`
    padding: 10px;
    border-radius: 50px;
    border: 2px solid #e1e1e1; // 테두리 스타일 변경
    //border-color: #e1e1e1;
    //background-color: gray;
    width: 100%;
    font-size: 16px;
    &[type="submit"] {
        border: none;
        background-color: #e1e1e1;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;
export const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;
export const Switcher = styled.span`
    margin-top: 20px;
    a {
        color: #852fdc;
    }
`;
