import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Loading from "../Ul/Loading";
import MapFilter from "./MapFilter";
import MapButtons from "./MapButtons";
import { zIndex_KakaoMap } from "../../Util/z-index";
import { SELECT_HIDDEN, SELECT_SORT_LIST, SELECT_OPTION_MAP } from "../../Api/TYPES";

interface Props {
  loading: boolean;
  sorted: SELECT_SORT_LIST;
  selected: SELECT_OPTION_MAP;
  setSelected: any;
  hidden: SELECT_HIDDEN;
  totalPharmList: never[];
  setTotalPharmList: React.Dispatch<React.SetStateAction<never[]>>;
  makeMap: any;
  useViewMap: any;
  myAdress: any;
  kakao: any;
}

export default function KakaoMap({
  loading,
  sorted,
  selected,
  setSelected,
  hidden,
  totalPharmList,
  setTotalPharmList,
  makeMap,
  useViewMap,
  myAdress,
  kakao,
}: Props) {
  //* 필터버튼 클릭 시
  const ClickedFilter = () => {
    if (makeMap) {
      useViewMap(sorted, selected, totalPharmList, setTotalPharmList, makeMap);
    }
  };
  return (
    <>
      <ContainerMap id="map" className={hidden ? "close" : ""}>
        {loading ? (
          <WrapLoading>
            <Loading />
          </WrapLoading>
        ) : (
          <>
            <ControllerTop className={hidden ? "close" : ""}>
              <MapFilter
                selected={selected}
                onClickNot={() => [setSelected("not"), ClickedFilter()]}
                onClickOperatingTime={() => [setSelected("operatingTime"), ClickedFilter()]}
                onClickNightOperating={() => [setSelected("nightOperating"), ClickedFilter()]}
                onClickBookmarks={() => [setSelected("bookmarks"), ClickedFilter()]}
              />
            </ControllerTop>
            <ControllerBottom>
              <MapButtons
                sorted={sorted}
                selected={selected}
                totalPharmList={totalPharmList}
                setTotalPharmList={setTotalPharmList}
                makeMap={makeMap}
                useViewMap={useViewMap}
                myAdress={myAdress}
                kakao={kakao}
              />
            </ControllerBottom>
          </>
        )}
      </ContainerMap>
    </>
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
  left: 37rem;
  z-index: ${zIndex_KakaoMap.MapFilter};
  transition: 0.2s;
  &.close {
    left: 6rem;
    transition: 0.2s;
  }
  @media (max-width: 768px) {
    left: 35rem;
    transition: 0.2s;
    &.close {
      left: 4rem;
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
const WrapLoading = styled.div`
  position: relative;
  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%) !important;
  /* IE에서도 동작하도록 MS 프리픽스 추가 */
  filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70) !important;
  opacity: 0.7 !important;
`;
