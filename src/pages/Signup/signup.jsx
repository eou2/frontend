import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        job: "",
        hobby: "",
        mbti: "",
        profileImage: "",
        location: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleNext = () => {
        if (
            currentStep === 0 &&
            formData.email &&
            formData.password &&
            formData.confirmPassword &&
            formData.password === formData.confirmPassword
        ) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 1 && formData.name) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 2 && formData.gender && formData.age && formData.job) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 3 && formData.hobby) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 4 && formData.mbti) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === 5 && formData.profileImage) {
            setCurrentStep(currentStep + 1);
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
            setFormData({ ...formData, profileImage: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleGenderSelect = (gender) => {
        setFormData({ ...formData, gender });
    };

    const handleSubmit = async () => {
        try {
            const response = await signup(formData);
            console.log(response);
            navigate("/welcome");
        } catch (error) {
            console.error("회원가입 실패:", error);
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
                            <ArrowButton src={ArrowRight} alt="Next" onClick={handleNext} disabled={!formData.name} />
                        </StepHeader>
                        <Header>
                            <h2>닉네임을 입력해주세요</h2>
                        </Header>
                        <Label>
                            닉네임
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
            case 2:
                return (
                    <div>
                        <StepHeader>
                            <ArrowButton src={ArrowLeft} alt="Prev" onClick={handlePrev} />
                            <TitleContainer>
                                <h2>회원가입</h2>
                            </TitleContainer>
                            <ArrowButton src={ArrowRight} alt="Next" onClick={handleNext} disabled={!formData.name} />
                        </StepHeader>
                        <Header>
                            <h2>기본정보를 입력해주세요</h2>
                        </Header>
                        <Label>
                            성별
                            <GenderButtonContainer>
                                <SelectButton
                                    onClick={() => handleGenderSelect("남성")}
                                    active={formData.gender === "남성"}
                                >
                                    남성
                                </SelectButton>
                                <SelectButton
                                    onClick={() => handleGenderSelect("여성")}
                                    active={formData.gender === "여성"}
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
                        <Button disabled={!formData.gender || !formData.age || !formData.job} onClick={handleNext}>
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
                            <ArrowButton
                                src={ArrowRight}
                                alt="Next"
                                onClick={handleNext}
                                disabled={!formData.profileImage}
                            />
                        </StepHeader>
                        <Header>
                            <h2>프로필 사진을 업로드해주세요</h2>
                        </Header>
                        <Label>
                            프로필 사진
                            <Input type="file" accept="image/*" onChange={handleImageChange} />
                        </Label>
                        <Button disabled={!formData.profileImage} onClick={handleNext}>
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
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                            />
                        </Label>
                        <Button disabled={!formData.location} onClick={handleSubmit}>
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
