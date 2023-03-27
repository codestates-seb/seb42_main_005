import React, { useState } from "react";
import axios from "axios";
import { APIS } from "../Api/APIs";
import { SELECT_SORT_LIST, SELECT_OPTION_MAP } from "../Api/TYPES";

const { kakao } = window;

let markers: any[] = [];
let clusterer: any = null;

export async function useViewMap(
  sorted: SELECT_SORT_LIST,
  selected: SELECT_OPTION_MAP,
  totalPharmList: never[],
  setTotalPharmList: React.Dispatch<React.SetStateAction<never[]>>,
  makeMap: any,
) {
  if (makeMap) {
    const centerLat = makeMap.getCenter().getLat();
    const centerLng = makeMap.getCenter().getLng();
    const bounds = makeMap.getBounds();
    const swLat = bounds.getSouthWest().getLat();
    const swLng = bounds.getSouthWest().getLng();
    const neLat = bounds.getNorthEast().getLat();
    const neLng = bounds.getNorthEast().getLng();

    try {
      const response = await axios({
        method: "get",
        url: APIS.GET_PHARMLIST,
        params: {
          lat: centerLat,
          lng: centerLng,
          swLat,
          swLng,
          neLat,
          neLng,
          sortCondition: sorted,
          filterCondition: selected,
        },
        headers: { "Content-Type": "application/json" },
      });

      const pharmacies = response.data.response;
      setTotalPharmList(pharmacies);

      const filteredPharmacies = pharmacies.filter((pharmacy: any) => {
        const pharmacyLat = Number(pharmacy.latitude);
        const pharmacyLng = Number(pharmacy.longitude);
        return pharmacyLat > swLat && pharmacyLat < neLat && pharmacyLng > swLng && pharmacyLng < neLng;
      });

      if (markers.length > 0) {
        markers.forEach((marker: any) => marker.setMap(null));
        clusterer.clear();
      }

      markers = filteredPharmacies.map((pharmacy: { latitude: any; longitude: any; name: any }) => {
        const PositionPharmacy = new kakao.maps.LatLng(pharmacy.latitude, pharmacy.longitude);
        const content = '<div class="customoverlay">' + `<span class="title">${pharmacy.name}</span>` + "</div>";
        const MarkerPharmacy = new kakao.maps.CustomOverlay({
          position: PositionPharmacy,
          content: content,
          yAnchor: 1,
          title: pharmacy.name,
        });
        return MarkerPharmacy;
      });

      clusterer = new kakao.maps.MarkerClusterer({
        map: makeMap,
        averageCenter: true,
        minLevel: 6,
        minClusterSize: 1,
        calculator: [10, 30, 50],
        styles: [
          {
            //* calculator 각 사이 값 마다 적용될 스타일을 지정한다
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
      clusterer.setMap(makeMap);
    } catch (error) {
      console.log(error);
    }
  }
}

export async function useSearch(
  keyword: string,
  totalPharmList: never[],
  setTotalPharmList: React.Dispatch<React.SetStateAction<never[]>>,
  makeMap: any,
) {
  if (makeMap) {
    try {
      const response = await axios({
        url: `${APIS.GET_Search}${keyword}`,
        method: "get",
        headers: { "Content-Type": "application/json" },
      });
      const pharmacies = response.data.response;
      setTotalPharmList(pharmacies);

      if (markers.length > 0) {
        markers.forEach((marker: any) => marker.setMap(null));
        clusterer.clear();
      }

      markers = pharmacies.map((pharmacy: { latitude: any; longitude: any; name: any }) => {
        const PositionPharmacy = new kakao.maps.LatLng(pharmacy.latitude, pharmacy.longitude);
        const content = '<div class="customoverlay">' + `<span class="title">${pharmacy.name}</span>` + "</div>";
        const MarkerPharmacy = new kakao.maps.CustomOverlay({
          position: PositionPharmacy,
          content: content,
          yAnchor: 1,
          title: pharmacy.name,
        });
        MarkerPharmacy.setMap(makeMap);
        const searchResultPos = new window.kakao.maps.LatLng(pharmacies[0].latitude, pharmacies[0].longitude);
        makeMap.panTo(searchResultPos);
        return MarkerPharmacy;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
