import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MapFilter from "./MapFilter";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const { kakao } = window;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    // 지도 객체 생성
    const map = new kakao.maps.Map(container, options);
    map.setMaxLevel(7);
    setMap(map);
  }, []);

  const [_map, setMap]: any = useState();
  const zoomIn = () => {
    _map.setLevel(_map.getLevel() - 1);
  };
  const zoomOut = () => {
    _map.setLevel(_map.getLevel() + 1);
  };

  const locationLoadSuccess = (pos: { coords: { latitude: number; longitude: number } }) => {
    const currentPos = new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
    // 현재 위치 받아오기

    // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
    _map.panTo(currentPos);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: currentPos,
    });
    marker.setMap(null);
    marker.setMap(_map);
  };
  const locationLoadError = (pos: any) => {
    alert("위치 정보를 가져오는데 실패했습니다.");
  };

  // 위치 가져오기 버튼 클릭시
  const getCurrentLocBtn = () => {
    navigator.geolocation.getCurrentPosition(locationLoadSuccess, locationLoadError);
    _map.setLevel(3);
  };
  const [selected, setSelected] = useState<"map_home" | "in_business" | "midnight" | "bookmarks">("map_home");
  return (
    <MapContainer ref={mapRef}>
      <MapFilter selected={selected} setSelected={setSelected} />
      <CurrentLocation>
        <LocaBtn onClick={getCurrentLocBtn}>
          <BiTargetLock className="icon" />
        </LocaBtn>
      </CurrentLocation>
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
  z-index: 1;
  @media (max-width: 768px) {
  }
`;
const ZoomControler = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
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

const CurrentLocation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
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
