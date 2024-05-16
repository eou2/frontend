import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import styled from "styled-components";

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
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
`;

const FormContainer = styled.div`
    width: 100%;
    max-width: 400px;
`;

const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin: 15px 0;
    border: 2px solid #9b59b6;
    border-radius: 6cqmax;
    &::placeholder {
        color: #ccc;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px 20px;
    margin-top: 50px;
    border: none;
    border-radius: 6px;
    background-color: #9b59b6;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
`;

const StepHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 80px;

    h2 {
        font-size: 28px;
        color: #9b59b6;
        margin: 0;
        font-weight: 800;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const ArrowButton = styled.button`
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
`;

const Label = styled.label`
    display: block;
    margin: 15px 0;
    font-size: 16px;
`;

const Signup = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        gender: "",
        age: "",
        job: "",
        hobby: "",
        mbti: "",
    });
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep === 0 && formData.gender && formData.age && formData.job) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 1 && formData.hobby) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep === 0) {
            navigate("/login"); // 로그인 화면으로 이동
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // form 제출 로직 추가
        console.log(formData);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton onClick={handlePrev}>←</ArrowButton>
                            <TitleContainer>
                                <h2>기본정보</h2>
                            </TitleContainer>
                            <ArrowButton
                                disabled={!formData.gender || !formData.age || !formData.job}
                                onClick={handleNext}
                            >
                                →
                            </ArrowButton>
                        </StepHeader>
                        <Header>
                            <h2>회원정보를 입력해주세요</h2>
                        </Header>
                        <Label>
                            성별
                            <Input
                                type="text"
                                placeholder="예) 여자"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            />
                        </Label>
                        <Label>
                            나이
                            <Input
                                type="text"
                                placeholder="예) 26"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </Label>
                        <Label>
                            직업
                            <Input
                                type="text"
                                placeholder="예) 직장인, 학생"
                                name="job"
                                value={formData.job}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button disabled={!formData.gender || !formData.age || !formData.job} onClick={handleNext}>
                            다음
                        </Button>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton onClick={handlePrev}>←</ArrowButton>
                            <TitleContainer>
                                <h2>기본정보</h2>
                            </TitleContainer>
                            <ArrowButton disabled={!formData.hobby} onClick={handleNext}>
                                →
                            </ArrowButton>
                        </StepHeader>
                        <Header>
                            <h2>취미를 입력해주세요</h2>
                        </Header>
                        <Label>
                            취미
                            <Input
                                type="text"
                                placeholder="예) 요리, 운동, 피아노 연주"
                                name="hobby"
                                value={formData.hobby}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button disabled={!formData.hobby} onClick={handleNext}>
                            다음
                        </Button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton onClick={handlePrev}>←</ArrowButton>
                            <TitleContainer>
                                <h2>기본정보</h2>
                            </TitleContainer>
                        </StepHeader>
                        <Header>
                            <h2>MBTI를 입력해주세요</h2>
                        </Header>
                        <Label>
                            MBTI
                            <Input
                                type="text"
                                placeholder="예) ENFP"
                                name="mbti"
                                value={formData.mbti}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button disabled={!formData.mbti} onClick={handleSubmit}>
                            회원가입
                        </Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Wrapper>
            <GlobalStyles />
            <FormContainer>{renderStep()}</FormContainer>
        </Wrapper>
    );
};

export default Signup;
