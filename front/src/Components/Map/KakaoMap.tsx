import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import MapFilter from "./MapFilter";
import MapButtons from "./MapButtons";
import { useMap } from "../../hooks/useMap";
import { zIndex_KakaoMap } from "../../Util/z-index";
import { SELECT_HIDDEN, SELECT_OPTION_MAP } from "../../Util/type";

declare global {
  interface Window {
    kakao: any;
  }
}
interface Props {
  hidden: SELECT_HIDDEN;
  setHidden: Dispatch<SetStateAction<SELECT_HIDDEN>>;
}

export default function KakaoMap({ hidden, setHidden }: Props) {
  const [selected, setSelected] = useState<SELECT_OPTION_MAP>("map_home");
  const { _map } = useMap();

  return (
    <ContainerMap id="map" className={hidden ? "close" : ""}>
      <ControllerTop className={hidden ? "close" : ""}>
        <MapFilter
          selected={selected}
          onClickMapHome={() => setSelected("map_home")}
          onClickInBusiness={() => setSelected("in_business")}
          onClickMidnight={() => setSelected("midnight")}
          onClickBookmarks={() => setSelected("bookmarks")}
        />
      </ControllerTop>
      <ControllerBottom>
        <MapButtons _map={_map} />
      </ControllerBottom>
    </ContainerMap>
  );
}

const ContainerMap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  width: calc(100vw - 30rem);
  height: 100vh;
  background-color: var(--black-200);
  z-index: ${zIndex_KakaoMap.MapContainer};
  transition: 0.2s;
  &.close {
    width: 100vw;
    transition: 0.2s;
  }
  @media (max-width: 768px) {
  }
`;

const ControllerTop = styled.div`
  position: fixed;
  top: 70px;
  left: calc(50vw - 3rem);
  z-index: ${zIndex_KakaoMap.MapFilter};
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
      left: 60px;
      transition: 0.2s;
    }
  }
`;
const ControllerBottom = styled.div`
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: ${zIndex_KakaoMap.MapButtons};
  transition: 0.2s;
`;
