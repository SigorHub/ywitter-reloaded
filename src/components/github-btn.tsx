import { GithubAuthProvider, TwitterAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import styled from "styled-components"
import { auth } from "../routes/firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.span`
    margin-top: 50px;
    background-color: white;
    font-weight: 500;
    width: 100%;
    color:black;
    padding: 10px 20px;
    border-radius: 50px;
    border: 0;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{opacity:0.8;}
`;

const Logo = styled.img`
    height: 25px;

`;

export default function GithubButton(){
    const navigate = useNavigate();
    // 깃허브 provide
    const onClick = async() => {
        try {
            // const tp = new TwitterAuthProvider();

            const provider = new GithubAuthProvider();
            // 리디렉션 로그인
            // await signInWithRedirect(auth, provider);
            // 팝업 로그인
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg" />
            계속 함께 깃허브
        </Button>
    );
}