import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid white;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: white;
    background-color: black;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder {
        font-size:16px;
    }
    &:focus {
        outline: none;
        border-color: #1d9bf0;
    }
`;

const AttachFileButton = styled.label`
    padding:10px 0px;
    color:#1d9bf0;
    text-align: center;
    border-radius: 20px;
    border:1px solid #1d9bf0;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display:none;
`;

const SubmitBtn = styled.input`
    background-color: #1d9bf0;
    color:white;
    border: none;
    padding:10px 0px;
    border-radius: 20px;
    cursor: pointer;
    &:hover,
    &:active{
        opacity: 0.8;
    }
`;

export default function PostYweetForm(){
    const [isLoading, setLoading] = useState(false);
    const [yweet,setYweet] = useState("");
    const [file,setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setYweet(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1){
            setFile(files[0]);
        }
    }

    return (
        <Form>
            <TextArea onChange={onChange} value={yweet} rows={5} maxLength={180} placeholder="무엇 입니까 우연한 사건"/>
            <AttachFileButton htmlFor="file">{file ? "사진 추가됨":"추가 사진"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "게시물 중...":"게시물 Yweet"} />
        </Form>
    );
}