import AppRouter from "./routes/AppRouter";
import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from "styled-components";
import LoadingScreen from "./components/loading-screen";

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
`;

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const init = async () => {
        //await auth.authStateReady();
        setIsLoading(false);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <Wrapper>
            <GlobalStyles />
            {isLoading ? <LoadingScreen /> : <AppRouter />}
        </Wrapper>
    );
}

export default App;
