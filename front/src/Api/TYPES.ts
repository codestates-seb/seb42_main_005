import React from "react";
export interface TYPE_Pharm {
  address: string;
  distance: number;
  imagePath: null | string;
  latitude: number;
  longitude: number;
  modifiedAt: string;
  name: string;
  picked: boolean;
  pickedStoreCount: number;
  rating: number | undefined;
  reviewCount: number;
  storeIdx: number;
}
export interface TYPE_Detail {
  address: string;
  createdAt: string;
  etc: any; //! 이건 뭔지 물어보기
  imagePath: null | string;
  isOperating: boolean;
  isOperatingNight: boolean;
  latitude: number;
  longitude: number;
  modifiedAt: string;
  name: string;
  operatingTime: object;
  pickedStoreCount: number;
  rating: number;
  reviewCount: number;
  storeIdx: number;
  tel: string;
  todayOperatingTime: {
    operatingTime: {
      startTime: string | null;
      endTime: string | null;
      nightOperating: boolean;
    };
  };
}

export interface TYPE_Review {
  content: string;
  createdAt: string;
  modifiedAt: string;
  profileImage: null;
  rating: number;
  replies: object[];
  reviewIdx: number;
  reviewImage: null;
  userIdx: number;
  userName: string;
}

export interface TYPE_Cert {
  address: string;
  businessCertificate: string | null;
  createdAt: string;
  email: string;
  name: string;
  pharmacistCertificate: string | null;
  storeIdx: number;
  userIdx: number;
}

export type TYPE_isModalUp = React.SetStateAction<boolean>;
export type TYPE_setIsModalUp = React.Dispatch<React.SetStateAction<React.SetStateAction<boolean>>>;
export type TYPE_like = React.SetStateAction<boolean>;
export type TYPE_setLike = React.Dispatch<React.SetStateAction<React.SetStateAction<boolean>>>;
export type TYPE_pharmDetail = React.SetStateAction<{}>;
export type TYPE_setPharmDetail = React.Dispatch<React.SetStateAction<React.SetStateAction<{}>>>;
export type TYPE_reviewList = React.SetStateAction<[]>;
export type TYPE_setReviewList = React.Dispatch<React.SetStateAction<React.SetStateAction<[]>>>;
export type TYPE_isReviewFormShown = React.Dispatch<React.SetStateAction<React.SetStateAction<boolean>>>;
export type TYPE_setIsReviewFormShown = React.Dispatch<React.SetStateAction<React.SetStateAction<boolean>>>;
export type TYPE_isImgUp = React.SetStateAction<boolean>;
export type TYPE_setIsImgUp = React.Dispatch<React.SetStateAction<React.SetStateAction<boolean>>>;

