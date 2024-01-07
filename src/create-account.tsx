import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "./routes/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Input, Swither, Title, Wrapper, Form } from "./components/auth-components";


export default function CreateAccount(){

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "name"){
            setName(value);
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }
    };
    const onSubmit =async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if(isLoading || name === "" || email === "" || password ==="") return;
        try{
            // Click to show as loading
            setLoading(true);
            // create an account
            // set the name of the user
            // redirect to the home page
            const credentials = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(credentials.user, {
                displayName: name,
            });
            navigate("/");
        }catch(e){
            if(e instanceof FirebaseError){
                // Firebase 에러 콘솔 출력
                console.log(e.code, e.message);
                setError(e.message);
            }
        }finally{
            setLoading(false);
        }

    };

    return <Wrapper>
        <Title>참여한다 ✖</Title>
        <Form onSubmit={onSubmit}>
            <Input onChange={onChange} name="name"      value={name}        placeholder="입력 너의 이름"       type="text"     required/>
            <Input onChange={onChange} name="email"     value={email}       placeholder="입력 너의 메일 주소"  type="email"    required/>
            <Input onChange={onChange} name="password"  value={password}    placeholder="입력 암호"           type="password" required/>
            <Input type="submit"    value={isLoading ? "Loading..." : "생성하다 계정"}/>
        </Form>
        {error !== "" ? <Error>{error}</Error> : null}
        <Swither>
            이미 가지고있다 계정을? <Link to="/login">로그인 하나 &rarr;</Link>
        </Swither>
    </Wrapper>
}