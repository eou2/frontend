import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    GlobalStyles,
    Wrapper,
    FormContainer,
    Input,
    Button,
    StepHeader,
    Header,
    TitleContainer,
    ArrowButton,
    Label,
} from "./signupStyle";

const Signup = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        job: "",
        hobby: "",
        mbti: "",
    });
    const navigate = useNavigate();

    const handleNext = () => {
        if (currentStep === 0 && formData.name) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 1 && formData.gender && formData.age && formData.job) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2 && formData.hobby) {
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
                            <ArrowButton disabled={!formData.name} onClick={handleNext}>
                                →
                            </ArrowButton>
                        </StepHeader>
                        <Header>
                            <h2>이름을 입력해주세요</h2>
                        </Header>
                        <Label>
                            이름
                            <Input
                                type="text"
                                placeholder="예) 김이프"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button disabled={!formData.name} onClick={handleNext}>
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
            case 2:
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
            case 3:
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
