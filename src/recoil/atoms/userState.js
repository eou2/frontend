import { atom } from "recoil";

export const userState = atom({
    key: "userState",
    default: {
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
        sex: "",
        age: "",
        job: "",
        hobby: "",
        mbti: "",
        image: "",
        city: "",
    },
});
