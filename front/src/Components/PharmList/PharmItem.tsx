import styled from "styled-components";
import Tag from "../Ul/Tag";
import PharmRank from "../Ul/PharmRank";

import Input from "../Ul/Input";
import Textarea from "../Ul/Textarea";

export default function PharmItem() {
  const heart: boolean = true;
  return (
    <ItemContainer>
      <PharmCard>
        <HeartPosition>
          <HeartButton>
            {heart ? (
              <img className="heart_img" alt="heart" src="Images/Heart.png" />
            ) : (
              <img className="unheart_img" alt="unheart" src="Images/UnHeart.png" />
            )}
          </HeartButton>
        </HeartPosition>
        <img className="pharm_img" />
        <PharmTitleBox>
          <PharmName>킹갓 약국</PharmName>
          <PharmRank />
        </PharmTitleBox>
        <TagContainer>
          <Tag idx={0} />
          <Tag idx={1} />
          <Tag idx={2} />
          <Tag idx={3} />
        </TagContainer>
      </PharmCard>
      <PharmCard>
        <img className="pharm_img" />
        <PharmTitleBox>
          <PharmName>킹갓 약국</PharmName>
          <PharmRank />
        </PharmTitleBox>
        <TagContainer>
          <Tag idx={0} />
          <Tag idx={1} />
          <Tag idx={2} />
          <Tag idx={3} />
        </TagContainer>
      </PharmCard>
      <PharmCard>
        <img className="pharm_img" />
        <PharmTitleBox>
          <PharmName>킹갓 약국</PharmName>
          <PharmRank />
        </PharmTitleBox>
        <TagContainer>
          <Tag idx={0} />
          <Tag idx={1} />
          <Tag idx={2} />
          <Tag idx={3} />
        </TagContainer>
      </PharmCard>

      <PharmCard>
        <img className="pharm_img" />
        <PharmTitleBox>
          <PharmName>킹갓 약국</PharmName>
          <PharmRank />
        </PharmTitleBox>
        <TagContainer>
          <Tag idx={0} />
          <Tag idx={1} />
          <Tag idx={2} />
          <Tag idx={3} />
        </TagContainer>
      </PharmCard>
    </ItemContainer>
  );
}
const ItemContainer = styled.div``;
//약국카드
const PharmCard = styled.div`
  width: 25rem;
  height: 25rem;
  display: flex;
  flex-direction: column;
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
//하트 버튼!!
const HeartPosition = styled.div`
  position: relative;
`;
const HeartButton = styled.button`
  all: unset;
  cursor: pointer;

  img {
    position: absolute;
    right: 1rem;
    top: 2.5rem;
  }
`;

//약국 타이틀
const PharmTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
`;

const PharmName = styled.div`
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
