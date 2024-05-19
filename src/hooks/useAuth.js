//인증 관련 커스텀 훅
import { useRecoilState } from "recoil";
import { authState } from "../recoil/atoms/authState";
export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);

    const login = async (email, password) => {
        setAuth({ ...auth, error: "" });
        try {
            const response = await fetch("http://localhost:8080/member/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: email, password }),
            });
            if (!response.ok) {
                throw new Error("Login failed");
            }
            const data = await response.json();
            setAuth({
                isAuthenticated: true,
                token: data.accessToken,
                user: data,
                error: "",
            });
        } catch (error) {
            setAuth({ ...auth, error: error.message });
        }
    };

    return { auth, login };
};
