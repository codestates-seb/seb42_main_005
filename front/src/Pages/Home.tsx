import {useEffect, useState} from "react";
import KakaoMap from "../Components/Map/KakaoMap";
import PharmLists from "../Components/PharmList/PharmLists";
import {SELECT_HIDDEN, SELECT_OPTION_MAP, SELECT_SORT_LIST} from "../Util/type";
import useGeolocation from "../hooks/useGeolocation";
import {useSearch, useViewMap} from "../hooks/useMapMarker";
import "../hooks/PharmacyOverlay.css";

const { kakao } = window;

export default function Home() {
  const [hidden, setHidden] = useState<SELECT_HIDDEN>(false);
  const [totalPharmList, setTotalPharmList] = useState([]);
  const [makeMap, setMakeMap]: any = useState();
  const [selected, setSelected] = useState<SELECT_OPTION_MAP>("not");
  const [sorted, setSorted] = useState<SELECT_SORT_LIST>("distance");
  const [loading, setLoading] = useState(true);
  const location: any = useGeolocation();

  useEffect(() => {
    if (typeof location != "string" && kakao) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      };
      //* 지도 객체 생성
      const map = new kakao.maps.Map(container as HTMLElement, options);
      const PositionCurrent = new kakao.maps.LatLng(location.latitude, location.longitude);
      const ImageSrcCurrent = "./Images/currentPos.png";
      const ImageSizeCurrent = new kakao.maps.Size(24, 35);
      const MarkerImageCurrent = new kakao.maps.MarkerImage(ImageSrcCurrent, ImageSizeCurrent);
      const MarkerCurrent = new kakao.maps.Marker({
        position: PositionCurrent,
        title: "현 위치",
        image: MarkerImageCurrent,
      });

      const PositionMyPlace = new kakao.maps.LatLng(37.33370506366528, 127.09738924623072); //! user가 가입할 때 작성한 주소의 위도/경도를 get 필요
      const ImageSrcMy = "./Images/myPlace.png";
      const ImageSizeMy = new kakao.maps.Size(24, 35);
      const MarkerImageMy = new kakao.maps.MarkerImage(ImageSrcMy, ImageSizeMy);
      const MarkerMy = new kakao.maps.Marker({
        position: PositionMyPlace,
        title: "우리 집",
        image: MarkerImageMy,
      });
      MarkerCurrent.setMap(map);
      MarkerMy.setMap(map);
      map.setMaxLevel(10);
      setMakeMap(map);
      setLoading(false);
    }
  }, [kakao, location]);

  //! GET : 약국리스트
  useEffect(() => {
    if (makeMap) {
      useViewMap(sorted, selected, totalPharmList, setTotalPharmList, makeMap);
    }
  }, [makeMap]);

  return (
    <>
      <KakaoMap
        loading={loading}
        hidden={hidden}
        sorted={sorted}
        selected={selected}
        setSelected={setSelected}
        totalPharmList={totalPharmList}
        setTotalPharmList={setTotalPharmList}
        makeMap={makeMap}
        useViewMap={useViewMap}
      />
      <PharmLists
        hidden={hidden}
        setHidden={setHidden}
        sorted={sorted}
        setSorted={setSorted}
        selected={selected}
        totalPharmList={totalPharmList}
        setTotalPharmList={setTotalPharmList}
        makeMap={makeMap}
        useViewMap={useViewMap}
        useSearch={useSearch}
      />
    </>
  );
}
