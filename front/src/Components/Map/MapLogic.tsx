import { useState, useEffect } from "react";
import CurrentLocation from "./CurrentLocation";

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
      const currentPos = new kakao.maps.LatLng(location.latitude, location.longitude);
      const currentImageSrc = "./Images/currentPos.png";
      const currentImageSize = new kakao.maps.Size(24, 35);
      const currentMarkerImage = new kakao.maps.MarkerImage(currentImageSrc, currentImageSize);
      const marker = new kakao.maps.Marker({
        position: currentPos,
        title: "현 위치",
        image: currentMarkerImage,
      });
      const myPlace = new kakao.maps.LatLng(37.33370506366528, 127.09738924623072); // 추후에 유저가 설정한 좌표 들어감
      const imageSrc = "./Images/myPlace.png";
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const myMarker = new kakao.maps.Marker({
        position: myPlace,
        title: "우리 집",
        image: markerImage,
      });
      marker.setMap(map);
      myMarker.setMap(map);
      map.setMaxLevel(10);
      setMap(map);
    }
  }, [location, kakao]);

  return { _map };
}
