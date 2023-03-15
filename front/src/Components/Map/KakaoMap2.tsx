import { useState, useEffect, useRef, MutableRefObject } from "react";
import styled from "styled-components";
import MapFilter from "./MapFilter";
import Locations from "../../Util/Locations";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  const mapRef = useRef<HTMLElement | null>(null);
  const location: any = Locations();
  const [selected, setSelected] = useState<"map_home" | "in_business" | "midnight" | "bookmarks">("map_home");

  const initMap = () => {
    if (typeof location != "string") {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      };

      var map = new window.kakao.maps.Map(container as HTMLElement, options);
      (mapRef as MutableRefObject<any>).current = map;
    }
  };

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, []);
  const [map, setMap]: any = useState();
  const zoomIn = () => {
    map.setLevel(map.getLevel() - 1);
  };
  const zoomOut = () => {
    map.setLevel(map.getLevel() + 1);
  };

  return (
    <MapContainer id="map">
      <MapFilter selected={selected} setSelected={setSelected} />
      <CurrentLocation>
        <LocaBtn onClick={() => initMap}>
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
