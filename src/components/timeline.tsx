import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase";
import Yweet from "./yweet";

export interface IYweet {
    id: string;
    photo: string;
    yweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div``;

export default function TimeLine() {

    const [yweets, setYweet] = useState<IYweet[]>([]);
    // 배열 안에 doc 정보 저장
    const fetchYweets = async () => {
        const yweetsQuery = query(
            collection(db, "yweets"),
            orderBy("createdAt", "desc")
        );
        const spanshot = await getDocs(yweetsQuery);
        const yweets = spanshot.docs.map((doc) => {
            const { yweet, createdAt, userId, username, photo } = doc.data();
            return {
                yweet, createdAt, userId, username, photo,
                id: doc.id,
            };
        });
        // 상태 저장
        setYweet(yweets);
    };
    useEffect(() => {
        fetchYweets();
    }, []);

    return <Wrapper>
        {yweets.map((yweet =>
            <Yweet key={yweet.id} {...yweet} />
        ))}
    </Wrapper>
}