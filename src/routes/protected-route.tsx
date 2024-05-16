import { Navigate } from "react-router-dom";
//import { auth } from "../firebase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    //구조분해 할당 이용 원래는 props.children
    const user = auth.currentUser; //auth 객체의currentUser속성을 통해 현재 로그인된 사용자의 정보를 가져옴
    if (user === null) {
        //로그인 되어있지 않다면
        return <Navigate to="/login" />; //로그인 창으로 이동
    }
    return children; //children prop을 반환하여 보호된 라우트 내부에 자식 컴포넌트들을 그대로 렌더링 ,
}
