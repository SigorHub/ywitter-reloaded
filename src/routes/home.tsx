import styled from "styled-components";
import PostYweetForm from "../components/post-yweet-form";
import TimeLine from "../components/timeline";

const Wrapper = styled.div`
    display:grid;
    gap:50px;
    overflow-y:scroll;
    grid-template-rows:1fr 5fr;
`;

export default function Home() {
    return (
        <Wrapper>
            <PostYweetForm />
            <TimeLine />
        </Wrapper>
    );
}