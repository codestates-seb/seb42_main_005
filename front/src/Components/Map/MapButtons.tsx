import styled from "styled-components";
import { MdReplayCircleFilled } from "react-icons/md";
import { SELECT_SORT_LIST, SELECT_OPTION_MAP } from "../../Api/TYPES";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

interface ButtonProps {
  sorted: SELECT_SORT_LIST;
  selected: SELECT_OPTION_MAP;
  totalPharmList: never[];
  setTotalPharmList: React.Dispatch<React.SetStateAction<never[]>>;
  makeMap: any;
  useViewMap: any;
  myAdress: any;
  kakao: any;
}

export default function MapButtons({
  sorted,
  selected,
  totalPharmList,
  setTotalPharmList,
  makeMap,
  useViewMap,
  myAdress,
  kakao,
}: ButtonProps) {
  //* 줌 인/아웃 버튼 클릭 시
  const zoomIn = () => {
    makeMap.setLevel(makeMap.getLevel() - 1);
  };
  const zoomOut = () => {
    makeMap.setLevel(makeMap.getLevel() + 1);
  };

  //* 현재 위치 버튼 클릭 시
  const CurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos: any) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const currentPos = new window.kakao.maps.LatLng(latitude, longitude);

        makeMap.panTo(currentPos); // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)

        const currentImageSrc = "./Images/currentPos.png";
        const currentImageSize = new window.kakao.maps.Size(24, 35);
        const currentMarkerImage = new window.kakao.maps.MarkerImage(currentImageSrc, currentImageSize);

        // 기존 marker 삭제
        const markers = makeMap.getMarkers();
        markers.setMap(null);

        // 새로운 marker 추가
        const marker = new window.kakao.maps.Marker({
          position: currentPos,
          title: "현 위치",
          image: currentMarkerImage,
        });
        marker.setMap(makeMap);
      },
      () => {
        console.log("위치 정보를 가져오는데 실패하여, 회원님의 주소로 이동합니다.");
        const address = myAdress;
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, function (result: any, status: any) {
          if (status === kakao.maps.services.Status.OK) {
            const myPlacePos = new kakao.maps.LatLng(result[0].y, result[0].x);
            makeMap.panTo(myPlacePos);
            makeMap.setLevel(3);
          }
        });
        makeMap.setLevel(3);
      },
    );
  };
  return (
    <ContainerButtons>
      <ControllerReMap>
        <ButtonReMap
          onClick={() => {
            if (makeMap) {
              useViewMap(sorted, selected, totalPharmList, setTotalPharmList, makeMap);
            }
          }}
        >
          <MdReplayCircleFilled className="icon" />
          <div className="label">
            현 지도로
            <br />
            재검색
          </div>
        </ButtonReMap>
      </ControllerReMap>
      <ControllerLocation>
        <ButtonLocation onClick={() => CurrentLocation()}>
          <BiTargetLock className="icon" />
        </ButtonLocation>
      </ControllerLocation>
      <ControllerZoom>
        <ButtonZoom onClick={() => zoomIn()}>
          <AiOutlinePlus className="icon plus" />
        </ButtonZoom>
        <span className="partition" />
        <ButtonZoom onClick={() => zoomOut()}>
          <AiOutlineMinus className="icon minus" />
        </ButtonZoom>
      </ControllerZoom>
    </ContainerButtons>
  );
}
const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ControllerReMap = styled.div`
  padding: 4px;
  border-radius: 30px;
  background-color: var(--blue-600);
  box-shadow: var(--bs-lg);
  transition: 0.2s;
  &:hover {
    background-color: var(--blue-700);
    box-shadow: 0 0 8px 10px hsla(360, 100%, 100%, 0.2);
    transition: 0.2s;
  }
  &:active {
    background-color: var(--blue-800);
  }
`;
const ButtonReMap = styled.button`
  cursor: pointer;
  width: 42px;
  height: 80px;
  background-color: transparent;
  border: none;
  text-align: center;
  .icon {
    align-items: center;
    margin-bottom: 6px;
    font-size: 1.6rem;
    color: var(--white);
  }
  .label {
    align-items: center;
    font-size: 0.7rem;
    color: var(--white);
    transition: 0.2s;
  }
`;
const ControllerLocation = styled.div`
  margin: 10px 0;
  padding: 4px;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: var(--bs-lg);
`;
const ButtonLocation = styled.button`
  cursor: pointer;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: none;
  text-align: center;
  .icon {
    align-items: center;
    margin-top: 1px;
    font-size: 2.2rem;
    color: var(--black-300);
    transition: 0.2s;
    &:hover {
      color: var(--blue-400);
      transition: 0.2s;
    }
  }
`;
const ControllerZoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: var(--bs-lg);

  .partition {
    width: 32px;
    height: 1px;
    background-color: var(--black-300);
  }
`;
const ButtonZoom = styled.span`
  cursor: pointer;
  display: block;
  width: 36px;
  height: 36px;
  text-align: center;
  .icon {
    align-items: center;
    font-size: 1.6rem;
    color: var(--black-300);
    transition: 0.2s;
    &:hover {
      font-size: 1.7rem;
      color: var(--blue-400);
      transition: 0.2s;
    }
  }
  .plus {
    margin-top: 4px;
  }
  .minus {
    margin-top: 5px;
  }
`;
