import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms/authState";
import axios from "axios";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);

    // 회원가입
    const signup = async (formData) => {
        try {
            const response = await axios.post("http://43.203.209.38:8080/member/sign-up", {
                email: formData.email,
                password: formData.password,
                nickname: formData.name,
                sex: formData.gender,
                hobby: formData.hobby,
                age: formData.age,
                image: [formData.profileImage],
                city: formData.location,
                mbti: formData.mbti,
                job: formData.job,
            });
            setAuth(response.data);
            return response.data;
        } catch (error) {
            console.error("회원가입 오류:", error);
            throw error;
        }
    };

    // 로그인
    const login = async (email, password) => {
        setAuth({ ...auth, error: "" });
        try {
            const response = await axios.post(
                "http://43.203.209.38:8080/member/sign-in",
                {
                    username: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = response.data;
            setAuth({
                isAuthenticated: true,
                token: data.accessToken,
                user: data,
                error: "",
            });
        } catch (error) {
            const errorMsg =
                error.response && error.response.status === 403
                    ? "로그인 실패: 자격 증명이 잘못되었습니다."
                    : `로그인 실패: 서버에서 ${
                          error.response ? error.response.status : "알 수 없는"
                      } 오류가 발생했습니다.`;
            setAuth({ ...auth, error: errorMsg });
        }
    };

    return { auth, login, signup };
};
