//홈화면 옆에 약국 리스트
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import Tag from "../Ul/Tag";
import PharmRank from "../Ul/PharmRank";

//데이터 들어오면 map으로 돌리기전에 하드코딩으로 두개해놨음
export default function PharmLists() {
  /* 조건부로 할려고 임의로 해놓은 것!
  나중에 데이터 넘어오면 바꿀것*/

  const heart: boolean = true;

  return (
    <Container>
      <ContainerWrap>
        <SearchContainer>
          <div>
            <BsSearch className="searchIcon" />
          </div>
          <SearchInput placeholder="약국 검색.." />
        </SearchContainer>
        <PharmHeadContainer>
          <div>
            <Button>
              <img className="ourpharm_img" alt="pharm" src="Images/OurPharmGo.png" />
              <span className="ourpharm">우리 약국</span>
            </Button>
          </div>
          <FilterButtons>
            <FilterButton className="filter_close">가까운순</FilterButton>
            <FilterButton className="filter_popular">리뷰많은순</FilterButton>
            <FilterButton className="filter_star">별점높은순</FilterButton>
          </FilterButtons>
        </PharmHeadContainer>
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
            <Tag />
          </TagContainer>
        </PharmCard>
        <PharmCard>
          <img className="pharm_img" />
          <PharmTitleBox>
            <PharmName>킹갓 약국</PharmName>
            <PharmRank />
          </PharmTitleBox>
          <TagContainer>
            <Tag />
          </TagContainer>
        </PharmCard>
      </ContainerWrap>
    </Container>
  );
}

//전체 컨테이너
const Container = styled.div`
  width: 37.5rem;
  display: block;
  position: relative;
  background-color: var(--white);
  box-shadow: var(--bs-lg);
  height: 100%;
`;

const ContainerWrap = styled.div`
  display: list-item;
`;

//input 컨테이너
const SearchContainer = styled.div`
  width: 36.688rem;
  display: flex;
  justify-content: center;
  padding: 2rem 1.5rem 1rem 1.5rem;
  .searchIcon {
    width: 1.5rem;
    height: 1.5rem;
    display: inline-block;
    position: absolute;
    opacity: 0.5;
    margin: 0.8rem;
  }
`;

//input 창
const SearchInput = styled.input`
  width: 24rem;
  height: 3rem;
  border-radius: 10px;
  border: 5px solid var(--blue-500);
  outline: none;
  font-size: 1.1rem;
  padding-left: 2.8rem;
`;

//필터부분
const PharmHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 3.1rem;
  margin-top: 1.8rem;
  margin-left: 6.25rem;
`;
//필터 버튼들
const FilterButtons = styled.div`
  vertical-align: baseline;
  border: 1px solid var(--black-350);
  border-radius: 5px;
  border: none;
`;
//필터버튼
const FilterButton = styled.button`
  background-color: var(--white);
  border: none;
  color: var(--black-350);
  font-size: 0.9rem;
  width: 6.25rem;
  &.filter_close {
    border-top-left-radius: 8px 8px;
    border-bottom-left-radius: 8px 8px;
    border-right: 1px solid var(--black-350);
  }
  &.filter_popular {
    border-right: 1px solid var(--black-350);
  }
  &.filter_star {
    border-top-right-radius: 8px 8px;
    border-bottom-right-radius: 8px 8px;
  }
  &:hover {
    color: var(--blue-500);
  }
`;

//약국카드
const PharmCard = styled.div`
  width: 35rem;
  height: 25rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--black-100);
  .pharm_img {
    background-color: var(--black-200);
    width: 23.75rem;
    height: 15.625rem;
    display: flex;
    justify-content: center;
    margin: auto;
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
    right: 6rem;
    top: 3rem;
  }
`;

//약국 타이틀
const PharmTitleBox = styled.div`
  display: flex;
  justify-content: center;
`;

const PharmName = styled.div`
  font-size: 1.56rem;
  font-weight: bold;
  margin-right: 4rem;
`;

//태그전체
const TagContainer = styled.div`
  margin-top: 0.5rem;
  margin-left: 5rem;
  margin-bottom: 0.5rem;
`;

//우리약국 가기
const Button = styled.button`
  all: unset;
  cursor: pointer;
  .ourpharm_img {
    margin-right: 0.3rem;
  }
  .ourpharm {
    font-size: 1rem;
    color: var(--blue-500);
  }
`;
