import { useState } from "react";
import styled from "styled-components";
import Tag from "../Ul/Tag";
import PharmRank from "../Ul/PharmRank";
import PharmDetail from "../Modal/PharmDetail";

export default function PharmItem() {
  const [isModalUp, setIsModalUp] = useState(false);
  const [like, setLike] = useState(false);

  return (
    <PharmCard>
      {isModalUp ? (
        <PharmDetail isModalUp={isModalUp} setIsModalUp={setIsModalUp} like={like} setLike={setLike} />
      ) : null}
      <InfoImgContainer>
        <Img src="./Images/random.png" alt="고심약국" onClick={() => setIsModalUp(!isModalUp)} />
        <LikeButton onClick={() => setLike(!like)}>
          {like ? <img src="./Images/Heart.png" /> : <img src="./Images/UnHeart.png" />}
        </LikeButton>
      </InfoImgContainer>
      <PharmTitleBox>
        <PharmName onClick={() => setIsModalUp(!isModalUp)}>킹갓 약국</PharmName>
        <PharmRank />
      </PharmTitleBox>
      <TagContainer>
        <Tag idx={0} />
        <Tag idx={1} />
        <Tag idx={2} />
        <Tag idx={3} />
      </TagContainer>
    </PharmCard>
  );
}

//약국카드
const PharmCard = styled.div`
  width: 25rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
  margin-top: 35px;
  border-bottom: 1px solid var(--black-100);
  .pharm_img {
    background-color: var(--black-200);
    width: 23.75rem;
    height: 15.625rem;
    display: flex;
    justify-content: center;
    margin: 30px auto 20px auto;
    border-radius: 10px;
  }
`;

const InfoImgContainer = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 1px solid var(--black-100);
`;
const Img = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
`;
const LikeButton = styled.span`
  position: absolute;
  right: 36px;
  top: 12px;
  width: 20px;
  @media (max-width: 768px) {
    right: 60px;
    top: 11px;
  }
`;

//약국 타이틀
const PharmTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 15px;
`;

const PharmName = styled.div`
  cursor: pointer;
  font-size: 1.56rem;
  font-weight: bold;
`;

//태그전체
const TagContainer = styled.div`
  margin: 15px 0 10px 0;
  padding: 0 15px;
  & > * {
    margin: 0 2px;
  }
`;
