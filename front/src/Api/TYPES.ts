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
  picked: boolean;
  distance: number;
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
  operatingTime: TYPE_Working;
  pickedStoreCount: number;
  rating: number;
  reviewCount: number;
  storeIdx: number;
  tel: string;
  todayOperatingTime: {
    operatingTime: TYPE_Hours;
  };
}

export interface TYPE_Review {
  content: string;
  createdAt: string;
  modifiedAt: string;
  profileImage: null | string;
  rating: number;
  replies: object[];
  reviewIdx: number;
  reviewImage: null | string;
  userIdx: number;
  userName: string;
}

export interface TYPE_UserInfo {
  address: string;
  businessCertificate?: string | null;
  createdAt: string;
  email: string;
  name: string;
  pharmacistCertificate?: string | null;
  storeIdx?: number;
  userIdx?: number;
  imagePath?: string;
  reportCount?: number;
  reviewCount?: number;
  [prop: string]: any;
}

export interface TYPE_AllUserInfo {
  address: string;
  bannedRestoreDate: null | string;
  createdAt: string;
  email: string;
  imagePath: string | null;
  name: string;
  reportCount: number;
  reviewCount: number;
  userIdx: number;
  userStatus: string;
  userType: string;
}

export interface TYPE_Working {
  monday: TYPE_Hours | null;
  tuesday: TYPE_Hours | null;
  wednesday: TYPE_Hours | null;
  thursday: TYPE_Hours | null;
  friday: TYPE_Hours | null;
  saturday: TYPE_Hours | null;
  sunday: TYPE_Hours | null;
  holiday: TYPE_Hours | null;
}
interface TYPE_Hours {
  endTime: string;
  startTime: string;
  nightOperating: string | boolean;
}

export interface User {
  address?: string | null;
  name?: string | null;
  storeIdx?: number | null;
  userIdx?: number | null;
  userType?: string | null;
  userRole?: string | null;
  [prop: string]: any;
}

export interface Form {
  email: string;
  password: string;
  name: string;
  address: string;
}

export type Check = {
  userIdx: string | undefined;
};

export type TYPE_boolean = React.SetStateAction<boolean>;
export type TYPE_setLike = React.Dispatch<React.SetStateAction<boolean>>;
export type TYPE_setBoolean = React.Dispatch<React.SetStateAction<React.SetStateAction<boolean>>>;

export type TYPE_pharmDetail = React.SetStateAction<{}>;
export type TYPE_setPharmDetail = React.Dispatch<React.SetStateAction<React.SetStateAction<{}>>>;
export type TYPE_reviewList = React.SetStateAction<[]>;
export type TYPE_setReviewList = React.Dispatch<React.SetStateAction<TYPE_reviewList[]>>;
export type TYPE_setpSignForms = React.Dispatch<React.SetStateAction<Form>>;

export type SELECT_OPTIONS_TAP = "user" | "pharm";
export type SELECT_OPTION_MAP = "not" | "operatingTime" | "nightOperating" | "bookmarks";
export type SELECT_SORT_LIST = "distance" | "reviewCount" | "rating";
export type SELECT_HIDDEN = true | false;
