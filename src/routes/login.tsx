import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { Error, Input, Swither, Title, Wrapper, Form } from "../components/auth-components";
import GithubButton from "../components/github-btn";



export default function Login() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (isLoading || email === "" || password === "") return;
        try {
            // Click to show as loading
            setLoading(true);

            await signInWithEmailAndPassword(auth, email, password);

            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                // Firebase 에러 콘솔 출력
                console.log(e.code, e.message);
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }

    };

    return <Wrapper>
        <Title>로그인 한다 ✖</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="email" value={email} placeholder="입력 너의 메일 주소" type="email" required />
            <Input onChange={onChange} name="password" value={password} placeholder="입력 암호" type="password" required />
            <Input type="submit" value={isLoading ? "Loading..." : "로그인 한다"} />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Swither>
            가지고 있지 않다 계정이?{" "} <Link to="/create-account">만든다 하나 &rarr;</Link>
        </Swither>
        <GithubButton />
    </Wrapper>
}