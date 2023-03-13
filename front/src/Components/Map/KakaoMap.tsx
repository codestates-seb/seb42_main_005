import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

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
    setMap(map);
    map.setMaxLevel(7);
  }, []);

  const [_map, setMap]: any = useState();
  // console.log(_map);

  const zoomIn = () => {
    _map.setLevel(_map.getLevel() - 1);
  };

  const zoomOut = () => {
    _map.setLevel(_map.getLevel() + 1);
  };

  return (
    <MapContainer ref={mapRef}>
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
      color: var(--blue-500);
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
