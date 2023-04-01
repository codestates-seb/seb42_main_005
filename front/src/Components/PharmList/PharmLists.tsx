//홈화면 옆에 약국 리스트
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import axios from "axios";
import PharmItem from "./PharmItem";
import SearchBar from "./SearchBar";
import SortButtons from "./SortButtons";
import { APIS } from "../../Api/APIs";
import { zIndex_PharmList } from "../../Util/z-index";
import { VscTriangleLeft } from "react-icons/vsc";
import { RiHomeLine } from "react-icons/ri";
import { useAppSelector } from "../../Redux/hooks";
import { getLocalStorage } from "../../Api/localStorage";
import { useNavigate } from "react-router-dom";
import { SELECT_HIDDEN, SELECT_SORT_LIST, SELECT_OPTION_MAP } from "../../Api/TYPES";

interface Props {
  hidden: SELECT_HIDDEN;
  setHidden: Dispatch<SetStateAction<SELECT_HIDDEN>>;
  sorted: SELECT_SORT_LIST;
  setSorted: React.Dispatch<React.SetStateAction<SELECT_SORT_LIST>>;
  selected: SELECT_OPTION_MAP;
  totalPharmList: object[];
  setTotalPharmList: React.Dispatch<React.SetStateAction<never[]>>;
  makeMap: any;
  useViewMap: any;
  useSearch: any;
  kakao: any;
  myAdress: any;
  setMyAdress: any;
}

export default function PharmLists({
  hidden,
  setHidden,
  sorted,
  setSorted,
  selected,
  totalPharmList,
  setTotalPharmList,
  makeMap,
  useViewMap,
  useSearch,
  kakao,
  myAdress,
  setMyAdress,
}: Props) {
  const [keyword, setKeyword] = useState("");
  const [displayedList, setDisplayedList] = useState(totalPharmList.slice(0, 10));
  const listRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state: any) => {
    return state.userInfo.response;
  });

  const API = import.meta.env.VITE_APP_API_URL;
  useEffect(() => {
    const userNewInfo = async () => {
      try {
        const response = await axios.get(`${API}${APIS.GET_USER_INFO}/${user?.userIdx}`, {
          headers: { Authorization: token },
        });
        setMyAdress(response.data.response.address);
      } catch (error) {
        console.log(error);
      }
    };
    userNewInfo();
  }, []);

  const token = getLocalStorage("access_token");
  const navigate = useNavigate();

  const gologin = () => {
    navigate("/login");
    alert("로그인을 먼저 해주세요!");
  };

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight && displayedList.length < totalPharmList.length) {
      setDisplayedList((prevList) => [...prevList, ...totalPharmList.slice(prevList.length, prevList.length + 10)]);
    }
  };
  useEffect(() => {
    setDisplayedList(totalPharmList.slice(0, 10));
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [totalPharmList]);

  //* 정렬기준 클릭 시
  const ClickedSort = () => {
    if (makeMap) {
      useViewMap(sorted, selected, totalPharmList, setTotalPharmList, makeMap);
    }
  };

  //* 우리집,우리약국 클릭 시
  const MoveToMyPlace = () => {
    const address = myAdress;
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, function (result: any, status: any) {
      if (status === kakao.maps.services.Status.OK) {
        const myPlacePos = new kakao.maps.LatLng(result[0].y, result[0].x);
        makeMap.panTo(myPlacePos);
        makeMap.setLevel(3);
      }
    });
  };

  return (
    <ContainerList className={hidden ? "hide" : ""}>
      <ContainerWrap className={hidden ? "" : "hide"}>
        <ContainerEmpty>
          <span className="partition" />
        </ContainerEmpty>
        <PharmList>
          <h2 hidden>약국 리스트</h2>
          <ListHead>
            <SearchContainer>
              <SearchBar
                keyword={keyword}
                setKeyword={setKeyword}
                totalPharmList={totalPharmList}
                setTotalPharmList={setTotalPharmList}
                makeMap={makeMap}
                useSearch={useSearch}
              />
              {hidden ? (
                <ButtonShow className="folded">
                  <VscTriangleLeft className={hidden ? "open" : ""} onClick={() => setHidden(false)} />
                </ButtonShow>
              ) : (
                <ButtonShow className="folded">
                  <VscTriangleLeft className={hidden ? "" : "close"} onClick={() => setHidden(true)} />
                </ButtonShow>
              )}
            </SearchContainer>
            <ButtonContainer>
              <ButtonMyPlace>
                {token && user?.userType === "약국회원" ? (
                  <div onClick={() => MoveToMyPlace()}>
                    <RiHomeLine className="logo" />
                    <span className="my_place">우리 약국</span>
                  </div>
                ) : token && user?.userType === "일반회원" ? (
                  <div onClick={() => MoveToMyPlace()}>
                    <RiHomeLine className="logo" />
                    <span className="my_place">우리 집</span>
                  </div>
                ) : (
                  <div onClick={() => gologin()}>
                    <RiHomeLine className="logo" />
                    <span className="my_place">우리 집</span>
                  </div>
                )}
              </ButtonMyPlace>
              <SortButtons
                sorted={sorted}
                onClickDistance={() => [setSorted("distance"), ClickedSort()]}
                onClickReviewCount={() => [setSorted("reviewCount"), ClickedSort()]}
                onClickRating={() => [setSorted("rating"), ClickedSort()]}
              />
            </ButtonContainer>
          </ListHead>
          <ListBody ref={listRef} onScroll={handleScroll}>
            {totalPharmList.length > 0 ? (
              displayedList.map((pharm: any, i: number) => (
                <PharmItem Pharm={pharm} key={i} storeIdx={pharm.storeIdx} />
              ))
            ) : (
              <NoPharm>
                <img className="img" alt="지도를 보고있는 사람" src="Images/map.png" />
                <span className="content">주변에 약국이 없습니다!</span>
                <span className="content">다른 곳에서 검색을 시도해 보세요.</span>
              </NoPharm>
            )}
          </ListBody>
        </PharmList>
      </ContainerWrap>
    </ContainerList>
  );
}

//전체 컨테이너
const ContainerList = styled.aside`
  position: absolute;
  top: 50px;
  left: 0;
  width: 34rem;
  height: calc(100vh - 50px);
  padding: 1.5rem 0 1rem 1.5rem;
  border-radius: 0 15px 15px 0;
  border-top: 1px solid var(--black-150);
  border-right: 1px solid var(--black-150);
  border-bottom: 1px solid var(--black-150);
  background-color: var(--white);
  box-shadow: var(--bs-lg);
  transition: 0.2s;
  &.hide {
    transform: translate(-500px, 0px);
  }
  @media (max-width: 768px) {
    width: 33rem;
    transition: 0.2s;
    &.hide {
      transform: translate(-480px, 0px);
    }
  }
  z-index: ${zIndex_PharmList.ListContainer};
`;
const ContainerWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
const ContainerEmpty = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1 1 0;
  margin-right: 30px;
  &.folded {
    margin-right: 0;
  }
  .partition {
    width: 14px;
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px inset, rgba(0, 0, 0, 0.1) 0px 7px 13px -3px inset,
      rgba(0, 0, 0, 0.1) 0px -3px 0px, hsl(0, 0%, 100%, 0.1) 0 1px 0 0;
    transition: 0.2s;
    @media (max-width: 768px) {
      transition: 0.2s;
    }
  }
`;
const PharmList = styled.main`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 95px);
`;
const ListHead = styled.header`
  margin-bottom: 10px;
  transition: 0.2s;
  @media (max-width: 768px) {
    transition: 0.2s;
  }
`;
const ListBody = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 135px);
  overflow-y: scroll;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 2px 2px 4px inset, rgba(0, 0, 0, 0.05) 0px 7px 7px -3px inset,
    rgba(0, 0, 0, 0.05) 0px -7px 7px -3px inset;
`;
const NoPharm = styled.div`
  position: relative;
  top: 26%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
    opacity: 0.7;
  }
  .content {
    margin-top: 8px;
    font-size: 1.1rem;
    color: var(--black-300);
  }
`;

//input
const SearchContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;
const ButtonShow = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  margin: 3px 5px 0 5px;
  border: none;
  background-color: transparent;
  font-size: 40px;
  font-weight: 600;
  color: var(--black-100);
  transition: 0.2s;
  :hover {
    color: var(--black-300);
    transition: 0.2s;
  }
  .close {
    transform: rotate(0deg);
    transition: transform 0.3s ease-in;
  }
  .open {
    transform: rotate(-180deg);
    transition: transform 0.3s ease-in;
  }
`;
//Buttons
const ButtonContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 25px 60px 3px 5px;
`;
//우리약국 가기
const ButtonMyPlace = styled.button`
  cursor: pointer;
  all: unset;
  margin-right: 88px;
  font-size: 1rem;
  color: var(--blue-400);
  transition: 0.2s;
  .logo {
    margin-right: 0.2rem;
    font-size: 1.1rem;
    vertical-align: -2px;
    transition: 0.2s;
  }
  :hover {
    font-weight: 600;
    color: var(--blue-600);
    transition: 0.2s;
  }
`;
