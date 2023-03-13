import { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function KakaoMap() {
  useEffect(() => {
    let container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //확대 수준 (기본값: 3)
      draggable: true,
      scrollwheel: true, //마우스 휠, 모바일 터치를 이용한 확대 및 축소 가능 여부
    };

    let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, []);

  function zoomIn() {
    var level = new window.kakao.map.getLevel(); // 현재 지도의 레벨
    window.kakao.map.setLevel(level - 1); // 지도가 확대
  }
  function zoomOut() {
    var level = window.kakao.map.getLevel(); // 현재 지도의 레벨
    window.kakao.map.setLevel(level + 1); // 지도가 축소
  }

  return (
    <MapContainer id="map">
      <ZoomControler>
        <ZoomBtn>
          <AiOutlinePlus className="icon plus" onClick={zoomIn} />
        </ZoomBtn>
        <span className="partition" />
        <ZoomBtn>
          <AiOutlineMinus className="icon minus" onClick={zoomOut} />
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
