import styled from "styled-components";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";

interface ButtonProps {
  _map: any;
}

export default function MapButtons({ _map }: ButtonProps) {
  //* 줌 인/아웃 버튼 클릭 시
  const zoomIn = () => {
    _map.setLevel(_map.getLevel() - 1);
  };
  const zoomOut = () => {
    _map.setLevel(_map.getLevel() + 1);
  };

  //* 현재 위치 버튼 클릭 시
  const getCurrentLocBtn = () => {
    navigator.geolocation.getCurrentPosition(
      (pos: any) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        const currentPos = new window.kakao.maps.LatLng(latitude, longitude);

        _map.panTo(currentPos); // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)

        const currentImageSrc = "./Images/currentPos.png";
        const currentImageSize = new window.kakao.maps.Size(24, 35);
        const currentMarkerImage = new window.kakao.maps.MarkerImage(currentImageSrc, currentImageSize);

        // 기존 marker 삭제
        const markers = _map.getMarkers();
        markers.setMap(null);

        // 새로운 marker 추가
        const marker = new window.kakao.maps.Marker({
          position: currentPos,
          title: "현 위치",
          image: currentMarkerImage,
        });
        marker.setMap(_map);
      },
      (error: any) => {
        alert("위치 정보를 가져오는데 실패했습니다.");
      },
    );
    _map.setLevel(3);
  };

  return (
    <ContainerButtons>
      <ControllerLocation>
        <ButtonLocation onClick={getCurrentLocBtn}>
          <BiTargetLock className="icon" />
        </ButtonLocation>
      </ControllerLocation>
      <ControllerZoom>
        <ButtonZoom onClick={zoomIn}>
          <AiOutlinePlus className="icon plus" />
        </ButtonZoom>
        <span className="partition" />
        <ButtonZoom onClick={zoomOut}>
          <AiOutlineMinus className="icon minus" />
        </ButtonZoom>
      </ControllerZoom>
    </ContainerButtons>
  );
}
const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ControllerLocation = styled.div`
  padding: 4px;
  border-radius: 8px;
  background-color: var(--white);
  box-shadow: var(--bs-lg);
`;
const ButtonLocation = styled.button`
  cursor: pointer;
  width: 36px;
  height: 36px;
  background-color: transparent;
  border: none;
  text-align: center;
  .icon {
    align-items: center;
    margin-top: 1px;
    font-size: 2.2rem;
    color: var(--black-300);
    transition: 0.2s;
    &:hover {
      color: var(--blue-400);
      transition: 0.2s;
    }
  }
`;
const ControllerZoom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
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
const ButtonZoom = styled.span`
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
      font-size: 1.7rem;
      color: var(--blue-400);
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
