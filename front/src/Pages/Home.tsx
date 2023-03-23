import { useState, useEffect } from "react";
import axios from "axios";
import PharmLists from "../Components/PharmList/PharmLists";
import KakaoMap from "../Components/Map/KakaoMap";
import { SELECT_HIDDEN } from "../Util/type";
import { API_PharmLists } from "../Api/APIs";
import useGeolocation from "../hooks/useGeolocation";
import "../hooks/PharmacyOverlay.css";

const { kakao } = window;

export default function Home() {
  const [hidden, setHidden] = useState<SELECT_HIDDEN>(false);
  const [totalPharmList, setTotalPharmList] = useState([]);
  const [_map, setMap]: any = useState();
  const [mapCenter, setMapCenter] = useState({ latitude: 0, longitude: 0 });

  const location: any = useGeolocation();
  // const API_URL = "https://apis.data.go.kr/B552657";

  useEffect(() => {
    if (typeof location != "string" && kakao) {
      const container = document.getElementById("map");
      const options = {
        // center: new kakao.maps.LatLng(location.latitude, location.longitude),
        center: new kakao.maps.LatLng(37.50123567, 127.0266307826),
        level: 3,
      };
      // 지도 객체 생성
      const map = new kakao.maps.Map(container as HTMLElement, options);
      const PositionCurrent = new kakao.maps.LatLng(37.50123567, 127.0266307826);
      // const PositionCurrent = new kakao.maps.LatLng(location.latitude, location.longitude);
      const ImageSrcCurrent = "./Images/currentPos.png";
      const ImageSizeCurrent = new kakao.maps.Size(24, 35);
      const MarkerImageCurrent = new kakao.maps.MarkerImage(ImageSrcCurrent, ImageSizeCurrent);
      const MarkerCurrent = new kakao.maps.Marker({
        position: PositionCurrent,
        title: "현 위치",
        image: MarkerImageCurrent,
      });

      //! user가 가입할때 쓴 주소를 위도,경도를 get해주는 거 필요한
      const PositionMyPlace = new kakao.maps.LatLng(37.33370506366528, 127.09738924623072); // 추후에 유저가 설정한 좌표 들어감
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
      setMap(map);
    }
  }, [location, kakao]);
  // useEffect(() => {
  //   if (_map) {
  //     kakao.maps.event.addListener(_map, "idle", () => {
  //       const center = _map.getCenter();
  //       setMapCenter({ latitude: center.getLat(), longitude: center.getLng() });
  //       setMap(_map);
  //     });
  //   }
  // }, [_map]);
  //! GET : 약국리스트
  useEffect(() => {
    if (_map) {
      const bounds = _map.getBounds();
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      // const filteredPharmacies = totalPharmList.filter((pharmacy: any) => {
      //   const pharmacyLat = Number(pharmacy.lat);
      //   const pharmacyLng = Number(pharmacy.lng);
      //   return pharmacyLat > sw.getLat() && pharmacyLat < ne.getLat() && pharmacyLng > sw.getLng() && pharmacyLng < ne.getLng();
      // });
      const swLat = sw.getLat();
      const swLng = sw.getLng();
      const neLat = ne.getLat();
      const neLng = ne.getLng();

      const getPharmLists = async () => {
        try {
          // const response = await axios.get(`${API_PharmLists.REAL_API}`, {
          //   params: {},
          //   headers: { "Content-Type": "application/json" },
          // data: {
          //   lat: 37.5868624440018,
          //   lng: 127.00060686405,
          //   // lat: location.latitude,
          //   // lng: location.longitude,
          //   swLat: swLat,
          //   swLng: swLng,
          //   neLat: neLat,
          //   neLng: neLng,
          //   // swLat: sw.getLat(),
          //   // swLng: sw.getLng(),
          //   // neLat: ne.getLat(),
          //   // neLng: ne.getLng(),
          //   distance: 2,
          //   sortCondition: "distance",
          //   filterCondition: "operating",
          // },
          // });

          const response = await axios({
            method: "get",
            url: API_PharmLists.REAL_API,
            params: {
              lat: 37.50123567,
              lng: 127.0266307826,
              swLat,
              swLng,
              neLat,
              neLng,
              sortCondition: "distance",
              filterCondition: "not",
              // not | nightOperating | operatingTime
            },
            headers: { "Content-Type": "application/json" },
          });
          console.log(response);
          const pharmacies = response.data.response;
          setTotalPharmList(pharmacies);

          const filteredPharmacies = pharmacies.filter((pharmacy: any) => {
            const pharmacyLat = Number(pharmacy.lat);
            const pharmacyLng = Number(pharmacy.lng);
            return (
              pharmacyLat > sw.getLat() &&
              pharmacyLat < ne.getLat() &&
              pharmacyLng > sw.getLng() &&
              pharmacyLng < ne.getLng()
            );
          });

          const markers = filteredPharmacies.map((pharmacy: { lat: any; lng: any; name: any }) => {
            const PositionPharmacy = new kakao.maps.LatLng(pharmacy.lat, pharmacy.lng);
            const content = '<div class="customoverlay">' + `<span class="title">${pharmacy.name}</span>` + "</div>";
            const MarkerPharmacy = new kakao.maps.CustomOverlay({
              position: PositionPharmacy,
              content: content,
              yAnchor: 1,
              title: pharmacy.name,
            });
            return MarkerPharmacy;
          });

          const clusterer = new kakao.maps.MarkerClusterer({
            map: _map,
            averageCenter: true,
            minLevel: 6,
            minClusterSize: 1,
            calculator: [10, 30, 50],
            styles: [
              {
                // calculator 각 사이 값 마다 적용될 스타일을 지정한다
                width: "70px",
                height: "70px",
                background: "hsla(241, 75%, 86%, 0.8)",
                borderRadius: "50%",
                color: "#000",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "71px",
              },
              {
                width: "80px",
                height: "80px",
                background: "hsla(241, 80%, 80%, 0.75)",
                borderRadius: "50%",
                color: "#000",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "81px",
              },
              {
                width: "90px",
                height: "90px",
                background: "hsla(241, 73%, 68%, 0.7)",
                borderRadius: "50%",
                color: "#000",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "91px",
              },
              {
                width: "100px",
                height: "100px",
                background: "hsla(241, 88%, 67%, 0.65)",
                borderRadius: "50%",
                color: "#000",
                textAlign: "center",
                fontWeight: "bold",
                lineHeight: "101px",
              },
            ],
          });
          clusterer.addMarkers(markers);
          clusterer.setMap(_map);
          kakao.maps.event.addListener(_map, "idle", function () {
            clusterer.clear();
            markers.forEach((marker: { setMap: (arg0: null) => any }) => marker.setMap(null));
          });
        } catch (error) {
          console.log(error);
        }
      };
      getPharmLists();

      // const markers = filteredPharmacies.map((pharmacy: { lat: any; lng: any; name: any }) => {
      //   const PositionPharmacy = new kakao.maps.LatLng(pharmacy.lat, pharmacy.lng);
      //   const content = '<div class="customoverlay">' + `<span class="title">${pharmacy.name}</span>` + "</div>";
      //   const MarkerPharmacy = new kakao.maps.CustomOverlay({
      //     position: PositionPharmacy,
      //     content: content,
      //     yAnchor: 1,
      //     title: pharmacy.name,
      //   });
      //   return MarkerPharmacy;
      // });

      // const clusterer = new kakao.maps.MarkerClusterer({
      //   map: _map,
      //   averageCenter: true,
      //   minLevel: 6,
      //   minClusterSize: 1,
      //   calculator: [10, 30, 50],
      //   styles: [
      //     {
      //       // calculator 각 사이 값 마다 적용될 스타일을 지정한다
      //       width: "70px",
      //       height: "70px",
      //       background: "hsla(241, 75%, 86%, 0.8)",
      //       borderRadius: "50%",
      //       color: "#000",
      //       textAlign: "center",
      //       fontWeight: "bold",
      //       lineHeight: "71px",
      //     },
      //     {
      //       width: "80px",
      //       height: "80px",
      //       background: "hsla(241, 80%, 80%, 0.75)",
      //       borderRadius: "50%",
      //       color: "#000",
      //       textAlign: "center",
      //       fontWeight: "bold",
      //       lineHeight: "81px",
      //     },
      //     {
      //       width: "90px",
      //       height: "90px",
      //       background: "hsla(241, 73%, 68%, 0.7)",
      //       borderRadius: "50%",
      //       color: "#000",
      //       textAlign: "center",
      //       fontWeight: "bold",
      //       lineHeight: "91px",
      //     },
      //     {
      //       width: "100px",
      //       height: "100px",
      //       background: "hsla(241, 88%, 67%, 0.65)",
      //       borderRadius: "50%",
      //       color: "#000",
      //       textAlign: "center",
      //       fontWeight: "bold",
      //       lineHeight: "101px",
      //     },
      //   ],
      // });
      // clusterer.addMarkers(markers);
      // clusterer.setMap(_map);
      // kakao.maps.event.addListener(_map, "idle", function () {
      //   clusterer.clear();
      //   markers.forEach((marker: { setMap: (arg0: null) => any }) => marker.setMap(null));
      // });
    }
  }, [_map, location, mapCenter]);

  return (
    <>
      <KakaoMap
        hidden={hidden}
        setHidden={setHidden}
        totalPharmList={totalPharmList}
        setTotalPharmList={setTotalPharmList}
        _map={_map}
      />
      <PharmLists
        hidden={hidden}
        setHidden={setHidden}
        totalPharmList={totalPharmList}
        setTotalPharmList={setTotalPharmList}
      />
    </>
  );
}
