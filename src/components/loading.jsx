import React from "react";
import styled from "styled-components";

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: "Roboto", sans-serif;
    font-size: 2em;
    z-index: 1000;
`;

const LoadingSpinner = styled.div`
    margin-top: 15px;
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
`;

const LoadingComponent = () => (
    <LoadingOverlay>
        <h1>호감도를 분석중입니다.</h1>
        <LoadingSpinner id="loading" />
    </LoadingOverlay>
);

export default LoadingComponent;
