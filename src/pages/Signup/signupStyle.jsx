import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

export const FormContainer = styled.div`
    width: 100%;
    max-width: 400px;
`;

export const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin: 15px 0;
    border: 2px solid #852fdc;
    border-radius: 6px;
    &::placeholder {
        color: #ccc;
    }
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px 20px;
    margin-top: 50px;
    border: none;
    border-radius: 6px;
    background-color: #852fdc;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
`;

export const StepHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 80px;

    h2 {
        font-size: 28px;
        color: #852fdc;
        margin: 0;
        font-weight: 800;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

export const ArrowButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

export const Label = styled.label`
    display: block;
    margin: 15px 0;
    font-size: 16px;
`;
