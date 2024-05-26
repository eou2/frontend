import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useAuth } from "../../hooks/useAuth";
import { userState } from "../../recoil/atoms/userState";
import {
    GlobalStyles,
    Wrapper,
    FormContainer,
    Input,
    Button,
    SelectButton,
    StepHeader,
    Header,
    TitleContainer,
    Label,
    ArrowButton,
    GenderButtonContainer,
} from "./signupStyle";
import ArrowLeft from "../../images/ArrowLeft.svg";
import ArrowRight from "../../images/ArrowRight.svg";

const Signup = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useRecoilState(userState);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleNext = () => {
        const stepsValidation = [
            () =>
                formData.email &&
                formData.password &&
                formData.confirmPassword &&
                formData.password === formData.confirmPassword,
            () => formData.nickname,
            () => formData.sex && formData.age && formData.job,
            () => formData.hobby,
            () => formData.mbti,
            () => formData.image,
            () => formData.city,
        ];

        const isValidStep = stepsValidation[currentStep] && stepsValidation[currentStep]();
        if (isValidStep) {
            setCurrentStep(currentStep + 1);
        } else {
            alert("현재 단계의 필수 정보를 모두 입력해주세요.");
        }
    };

    const handlePrev = () => {
        if (currentStep === 0) {
            navigate("/login");
        } else {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result }); // 단일 문자열로 저장
        };
        reader.readAsDataURL(file);
    };

    const handleGenderSelect = (sex) => {
        setFormData({ ...formData, sex });
    };

    const handleSubmit = async () => {
        try {
            console.log("Form Data:", formData);
            const response = await signup(formData); // JSON 형태로 전송
            console.log("회원가입 성공:", response);
            navigate("/welcome");
        } catch (error) {
            console.error("회원가입 실패:", error);
            alert("회원가입에 실패했습니다. 다시 시도해 주세요.");
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                            <ArrowButton
                                src={ArrowRight}
                                alt="Next"
                                onClick={handleNext}
                                disabled={
                                    !formData.email ||
                                    !formData.password ||
                                    formData.password !== formData.confirmPassword
                                }
                            />
                        </StepHeader>
                        <Header>
                            <h2>이메일과 비밀번호를 입력해주세요</h2>
                        </Header>
                        <Label>
                            이메일
                            <Input
                                type="email"
                                placeholder="예) example@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Label>
                        <Label>
                            비밀번호
                            <Input
                                type="password"
                                placeholder="비밀번호"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Label>
                        <Label>
                            비밀번호 확인
                            <Input
                                type="password"
                                placeholder="비밀번호 확인"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button
                            disabled={
                                !formData.email || !formData.password || formData.password !== formData.confirmPassword
                            }
                            onClick={handleNext}
                        >
                            다음
                        </Button>
                    </div>
                );
            case 1:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                            <ArrowButton
                                src={ArrowRight}
                                alt="Next"
                                onClick={handleNext}
                                disabled={!formData.nickname}
                            />
                        </StepHeader>
                        <Header>
                            <h2>닉네임을 입력해주세요</h2>
                        </Header>
                        <Label>
                            닉네임
                            <Input
                                type="text"
                                placeholder="예) 김이프"
                                name="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button disabled={!formData.nickname} onClick={handleNext}>
                            다음
                        </Button>
                    </div>
                );
            case 2:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                            <ArrowButton
                                src={ArrowRight}
                                alt="Next"
                                onClick={handleNext}
                                disabled={!formData.sex || !formData.age || !formData.job}
                            />
                        </StepHeader>
                        <Header>
                            <h2>기본정보를 입력해주세요</h2>
                        </Header>
                        <Label>
                            성별
                            <GenderButtonContainer>
                                <SelectButton
                                    onClick={() => handleGenderSelect("남성")}
                                    active={formData.sex === "남성"}
                                >
                                    남성
                                </SelectButton>
                                <SelectButton
                                    onClick={() => handleGenderSelect("여성")}
                                    active={formData.sex === "여성"}
                                >
                                    여성
                                </SelectButton>
                            </GenderButtonContainer>
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
                        <Button disabled={!formData.sex || !formData.age || !formData.job} onClick={handleNext}>
                            다음
                        </Button>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                            <ArrowButton src={ArrowRight} alt="Next" onClick={handleNext} disabled={!formData.hobby} />
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
            case 4:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                            <ArrowButton src={ArrowRight} alt="Next" onClick={handleNext} disabled={!formData.mbti} />
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
                        <Button disabled={!formData.mbti} onClick={handleNext}>
                            다음
                        </Button>
                    </div>
                );
            case 5:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                            <ArrowButton src={ArrowRight} alt="Next" onClick={handleNext} disabled={!formData.image} />
                        </StepHeader>
                        <Header>
                            <h2>프로필 사진을 업로드해주세요</h2>
                        </Header>
                        <Label>
                            프로필 사진
                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </Label>
                        <Button disabled={!formData.image} onClick={handleNext}>
                            다음
                        </Button>
                    </div>
                );
            case 6:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                        </StepHeader>
                        <Header>
                            <h2>사는 지역을 입력해주세요</h2>
                        </Header>
                        <Label>
                            사는 지역
                            <Input
                                type="text"
                                placeholder="예) 서울"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button disabled={!formData.city} onClick={handleSubmit}>
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
