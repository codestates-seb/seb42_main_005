import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import MapFilter from "./MapFilter";
import { MapLogic } from "./MapLogic";
import { zIndex_KakaoMap } from "../../Util/z-index";
import { SELECT_HIDDEN, SELECT_OPTION_MAP } from "../../Util/type";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

interface Props {
  hidden: SELECT_HIDDEN;
  setHidden: Dispatch<SetStateAction<SELECT_HIDDEN>>;
}

export default function KakaoMap({ hidden, setHidden }: Props) {
  const { _map } = MapLogic();
  const [selected, setSelected] = useState<SELECT_OPTION_MAP>("map_home");

  //* 줌 인/아웃 버튼 클릭 시
  const zoomIn = () => {
    _map.setLevel(_map.getLevel() - 1);
  };
  const zoomOut = () => {
    _map.setLevel(_map.getLevel() + 1);
  };

  //* 현재 위치 버튼 클릭 시
  const getCurrentLocBtn = () => {
    navigator.geolocation.getCurrentPosition(
      (pos: any) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const currentPos = new window.kakao.maps.LatLng(latitude, longitude);

        _map.panTo(currentPos); // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)

        const currentImageSrc = "./Images/currentPos.png";
        const currentImageSize = new window.kakao.maps.Size(24, 35);
        const currentMarkerImage = new window.kakao.maps.MarkerImage(currentImageSrc, currentImageSize);

        // 기존 marker 삭제
        const markers = _map.getMarkers();
        markers.setMap(null);

        // 새로운 marker 추가
        const marker = new window.kakao.maps.Marker({
          position: currentPos,
          title: "현 위치",
          image: currentMarkerImage,
        });
        marker.setMap(_map);
      },
      (error: any) => {
        alert("위치 정보를 가져오는데 실패했습니다.");
      },
    );
    _map.setLevel(3);
  };

  return (
    <MapContainer id="map" className={hidden ? "close" : ""}>
      <TopControler className={hidden ? "close" : ""}>
        <MapFilter
          selected={selected}
          onClickMapHome={() => setSelected("map_home")}
          onClickInBusiness={() => setSelected("in_business")}
          onClickMidnight={() => setSelected("midnight")}
          onClickBookmarks={() => setSelected("bookmarks")}
        />
      </TopControler>
      <LocaControler>
        <LocaBtn onClick={getCurrentLocBtn}>
          <BiTargetLock className="icon" />
        </LocaBtn>
      </LocaControler>
      <ZoomControler>
        <ZoomBtn onClick={zoomIn}>
          <AiOutlinePlus className="icon plus" />
        </ZoomBtn>
        <span className="partition" />
        <ZoomBtn onClick={zoomOut}>
          <AiOutlineMinus className="icon minus" />
        </ZoomBtn>
      </ZoomControler>
    </MapContainer>
  );
}

const MapContainer = styled.div`
  background-color: var(--black-200);
  position: fixed;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 30rem);
  height: 100vh;
  top: 0;
  right: 0;
  z-index: ${zIndex_KakaoMap.MapContainer};
  transition: 0.2s;
  &.close {
    width: 100vw;
    transition: 0.2s;
  }
  @media (max-width: 768px) {
  }
`;
const ZoomControler = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: ${zIndex_KakaoMap.ZoomControler};
  bottom: 40px;
  right: 30px;
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
const ZoomBtn = styled.span`
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
      color: var(--blue-400);
      transition: 0.2s;
      font-size: 1.7rem;
    }
  }
  .plus {
    margin-top: 4px;
  }
  .minus {
    margin-top: 5px;
  }
`;
const TopControler = styled.div`
  position: fixed;
  z-index: ${zIndex_KakaoMap.CtrlContainer};
  top: 70px;
  left: 750px;
  transition: 0.2s;
  @media (max-width: 1200px) {
    left: 650px;
    transition: 0.2s;
    &.close {
      left: 280px;
      transition: 0.2s;
    }
  }
  @media (max-width: 768px) {
    left: 540px;
    transition: 0.2s;
    &.close {
      left: 80px;
      transition: 0.2s;
    }
  }
`;
const LocaControler = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: ${zIndex_KakaoMap.CurrentLocation};
  bottom: 140px;
  right: 30px;
  padding: 4px;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: var(--bs-lg);
`;
const LocaBtn = styled.span`
  cursor: pointer;
  display: block;
  width: 36px;
  height: 36px;
  text-align: center;
  .icon {
    align-items: center;
    font-size: 2.2rem;
    color: var(--black-300);
    margin-top: 1px;
    transition: 0.2s;
    &:hover {
      color: var(--blue-400);
      transition: 0.2s;
    }
  }
`;
