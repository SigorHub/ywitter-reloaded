import { addDoc, collection, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../routes/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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

export default function PostYweetForm() {
    const [isLoading, setLoading] = useState(false);
    const [yweet, setYweet] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setYweet(e.target.value);
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (!user || isLoading || yweet === "" || yweet.length > 180) return;

        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "yweets"), { // db, 테이블
                yweet,
                createdAt: Date.now(),
                username: user.displayName || "익룡", // 사용자 확인용
                userId: user.uid,
            });
            // 파일 첨부 firebase storage (경로 : 유저ID-유저Name / 문서ID)
            if (file) {
                const locationRef = ref(storage, `yweets/${user.uid}-${user.displayName}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                // yweet문서(doc)에 사진 url 추가
                await updateDoc(doc, {
                    photo: url,
                });
            }
            // 게시물 작성 후 초기화
            setYweet("");
            setFile(null);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <TextArea onChange={onChange} value={yweet} rows={5} maxLength={180} placeholder="무엇 입니까 우연한 사건" required />
            <AttachFileButton htmlFor="file">{file ? "사진 추가됨" : "추가 사진"}</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={isLoading ? "게시물 중..." : "게시물 Yweet"} />
        </Form>
    );
}