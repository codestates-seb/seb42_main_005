import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import CurrentLocation from "./CurrentLocation";
import "./customOverlay.css";

declare global {
  interface Window {
    kakao: any;
  }
}

export function MapLogic() {
  const { kakao } = window;
  const location: any = CurrentLocation();
  const [_map, setMap]: any = useState();

  useEffect(() => {
    if (typeof location != "string" && kakao) {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(location.latitude, location.longitude),
        level: 3,
      };
      // 지도 객체 생성
      const map = new kakao.maps.Map(container as HTMLElement, options);
      // 마커 생성
      const PositionCurrent = new kakao.maps.LatLng(location.latitude, location.longitude);
      const ImageSrcCurrent = "./Images/currentPos.png";
      const ImageSizeCurrent = new kakao.maps.Size(24, 35);
      const MarkerImageCurrent = new kakao.maps.MarkerImage(ImageSrcCurrent, ImageSizeCurrent);
      const MarkerCurrent = new kakao.maps.Marker({
        position: PositionCurrent,
        title: "현 위치",
        image: MarkerImageCurrent,
      });
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

      axios
        .get("https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyFullDown", {
          params: {
            ServiceKey: "LYki5UdYrhpVu5YPHg03MBzs3WoCetCv02paAeoaDrc01C9rKu5sVO02/i6dlkmA1+8rxI1HdSK/b8b5cgcTmQ==",
            ServiceType: "json",
            numOfRows: 1000,
          },
        })
        .then((response) => {
          const pharmacies = response.data.response.body.items.item;
          for (let i = 0; i < pharmacies.length; i++) {
            const PositionPharmacy = new kakao.maps.LatLng(pharmacies[i].wgs84Lat, pharmacies[i].wgs84Lon);
            const content =
              '<div class="customoverlay">' + `<span class="title">${pharmacies[i].dutyName}</span>` + "</div>";
            const MarkerPharmacy = new kakao.maps.CustomOverlay({
              map: map,
              position: PositionPharmacy,
              content: content,
              yAnchor: 1,
              title: pharmacies[i].dutyName,
            });
            MarkerPharmacy.setMap(map);
          }
        });
    }
  }, [location, kakao]);

  return { _map };
}
