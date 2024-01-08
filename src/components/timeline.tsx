import { collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase";
import Yweet from "./yweet";
import { Unsubscribe } from "firebase/auth";

export interface IYweet {
    id: string;
    photo: string;
    yweet: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export default function TimeLine() {

    const [yweets, setYweet] = useState<IYweet[]>([]);
    useEffect(() => {
        // 실시간 로드 중지 (이벤트 관리 tear down, cleanup)
        let unsubscribe: Unsubscribe | null = null;
        const fetchYweets = async () => {
            // 쿼리 생성
            const yweetsQuery = query(
                collection(db, "yweets"),
                orderBy("createdAt", "desc"),
                limit(25) // 25개 제한
            );
            /* 쿼리 로드
               const spanshot = await getDocs(yweetsQuery);
               const yweets = spanshot.docs.map((doc) => {
                   const { yweet, createdAt, userId, username, photo } = doc.data();
                   return {
                       yweet, createdAt, userId, username, photo,
                       id: doc.id,
                   };
               });*/
            // 쿼리 실시간 로드
            unsubscribe = await onSnapshot(yweetsQuery, (snapshot) => {
                const yweets = snapshot.docs.map((doc) => {
                    const { yweet, createdAt, userId, username, photo } = doc.data();
                    return {
                        yweet, createdAt, userId, username, photo,
                        id: doc.id,
                    };
                });
                // 상태 저장
                setYweet(yweets);
            });
        };
        fetchYweets();
        // 컴포넌트가 안보일때 이벤트 중지 (로그아웃, 다른 페이지)
        return () => {
            unsubscribe && unsubscribe();
        }
    }, []);

    return <Wrapper>
        {yweets.map((yweet =>
            <Yweet key={yweet.id} {...yweet} />
        ))}
    </Wrapper>
}