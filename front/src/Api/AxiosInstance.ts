import { APIS } from "./APIs";
import axios from "axios";
import { getLocalStorage } from "../Api/localStorage";

let token = getLocalStorage("access_token");
export const BaseInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Authorization: token,
  },
});
import { TYPE_UserInfo, TYPE_setLike, TYPE_boolean } from "./TYPES";

//! 공통 ------------------------------------------------------------------------
//* GET : 전체 페이지 수, 전체 데이터 수 가져오기
export const getFinish = (url: string, state: any) => {
  return BaseInstance.get(url)
    .then((response) => state(response.data.pageInfo.isFinish))
    .catch((error) => {
      console.log("페이지 정보 받아오던 중 에러 발생");
      console.log(error);
    });
};
//* GET : 약국상세정보와 약국리뷰 받아오기
export const getDetailsAndReviews = (stateD: React.Dispatch<any>, stateR: React.Dispatch<any>, storeIdx: number) => {
  const getPharmDetail = async () => {
    return BaseInstance.get(`${APIS.GET_PHARMDETAILS}/${storeIdx}`)
      .then((response) => stateD(response.data.response))
      .catch((error) => {
        console.log("약국 상세정보 받아오던 중 에러 발생");
        console.log(error);
      });
  };
  const getReviewList = async () => {
    return BaseInstance.get(`${APIS.GET_REVIEWS}/${storeIdx}/review`)
      .then((response) => stateR(response.data.response.storeReviews))
      .catch((error) => {
        console.log("약국 리뷰 받아오던 중 에러 발생");
        console.log(error);
      });
  };
  axios.all([getPharmDetail(), getReviewList()]);
};
//* POST : 찜하기/찜취소
export const likePharmacy = async (storeidx: number | undefined, value: TYPE_boolean, state: TYPE_setLike) => {
  return BaseInstance.post(`${APIS.POST_LIKE}/${storeidx}/pick`)
    .then(() => state(!value))
    .catch((error) => {
      console.log("찜하기 또는 찜 취소 하던 중 에러 발생");
      console.log(error);
    });
};
//* GET : 계정 정보 받아오기
export const getUser = async (
  userIdx: number,
  state: React.Dispatch<React.SetStateAction<TYPE_UserInfo | undefined>>,
) => {
  return BaseInstance.get(`${APIS.GET_USER_INFO}/${userIdx}`)
    .then((response) => state(response.data.response))
    .catch((error) => {
      console.log("내 정보 다시 가져오던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 유저 이미지 업로드
export const postUserImg = async (data: object) => {
  return BaseInstance.post(APIS.POST_USER_IMG, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("이미지 업로드 하던 중 에러 발생");
      console.log(error);
    });
};
//* PATCH : 비밀번호 찾기
export const findPW = async (findPassword: string) => {
  return BaseInstance.patch(APIS.PATCH_FINDPW, { email: findPassword }).catch((error) => {
    console.log("비밀번호 찾기 요청 보내던 중 에러 발생");
    console.log(error);
  });
};
//! 약국 상세 모달 CRUD ---------------------------------------------------------------
//* GET : 리뷰리스트 불러오기
export const getReview = async (
  storeIdx: number | undefined,
  state: React.SetStateAction<React.SetStateAction<any>>,
  page: any,
) => {
  return (
    BaseInstance.get(`${APIS.GET_REVIEWS}/${storeIdx}/review?page=${page}&size=20`)
      // .then((response) => console.log(response.data))
      .then((response) => {
        state(response.data.response.storeReviews);
      })
      .catch((error) => {
        console.log("리뷰 불러오던 중 중 에러 발생");
        console.log(error);
      })
  );
};
//* POST : 리뷰작성
export const postReview = async (
  storeIdx: number | undefined,
  data: any,
  state: React.SetStateAction<React.SetStateAction<any>>,
) => {
  return BaseInstance.post(`${APIS.POST_REVIEWS}/${storeIdx}/review`, data)
    .then(() => state(false))
    .catch((error) => {
      console.log("리뷰를 작성하던 중 에러 발생");
      console.log(error);
    });
};
//* PATCH : 리뷰수정
export const patchReview = async (
  storeIdx: number | undefined,
  reviewIdx: number | undefined,
  data: any,
  state: any,
) => {
  return BaseInstance.patch(`${APIS.POST_REVIEWS}/${storeIdx}/review/${reviewIdx}`, data)
    .then(() => state(false))
    .catch((error) => {
      console.log("리뷰를 수정하던 중 에러 발생");
      console.log(error);
    });
};
//* DELETE : 리뷰삭제
export const deleteReview = async (storeIdx: number | undefined, reviewIdx: number) => {
  return BaseInstance.delete(`${APIS.DELETE_REVIEWS}/${storeIdx}/review/${reviewIdx}`).catch((error) => {
    console.log("리뷰 삭제하던 중 에러 발생");
    console.log(error);
  });
};
//* POST : 리뷰신고
export const reportReview = async (storeIdx: number | undefined, reviewIdx: number, data: object) => {
  return BaseInstance.post(`${APIS.POST_REPORT_REVIEW}/${storeIdx}/review/${reviewIdx}/report`, data).catch((error) => {
    console.log("리뷰 신고하던 중 에러 발생");
    console.log(error);
  });
};
//* POST : 리뷰의 댓글작성
export const postReply = async (reviewIdx: number, data: object, stateC: any, stateF: any) => {
  return BaseInstance.post(`${APIS.POST_REPLY}/${reviewIdx}/reply`, data)
    .then(() => stateC(""))
    .then(() => stateF(false))
    .catch((error) => {
      console.log("리뷰의 댓글을 작성하던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 리뷰의 댓글수정
export const patchReply = async (reviewIdx: number, replyIdx: number, data: any, stateF: any) => {
  return BaseInstance.patch(`${APIS.PATCH_REPLY}/${reviewIdx}/reply/${replyIdx}`, data)
    .then(() => stateF(false))
    .catch((error) => {
      console.log("리뷰의 댓글을 수정하던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 리뷰의 댓글삭제
export const deleteReply = async (reviewIdx: number, replyIdx: number) => {
  return BaseInstance.delete(`${APIS.DELETE_REPLY}/${reviewIdx}/reply/${replyIdx}`).catch((error) => {
    console.log("리뷰의 댓글을 삭제하던 중 에러 발생");
    console.log(error);
  });
};
//! 일반 계정 ------------------------------------------------------------------------
//* GET : 회원 정보 받아오기
const getUserInfo = async (
  userIdx: number,
  stateI: any,
  stateN: React.Dispatch<React.SetStateAction<string>>,
  stateA: React.Dispatch<React.SetStateAction<string>>,
) => {
  return BaseInstance.get(`${APIS.GET_USER_INFO}/${userIdx}`)
    .then((response) => {
      stateI(response.data.response);
      stateN(response.data.response.name);
      stateA(response.data.response.address);
    })
    .catch((error) => {
      console.log("내 정보 가져오던 중 에러 발생");
      console.log(error);
    });
};
//* PATCH : 회원 정보 수정하기
const patchUserInfo = async (userIdx: number, data: object, state: React.Dispatch<React.SetStateAction<boolean>>) => {
  return BaseInstance.patch(`${APIS.PATCH_USER_INFO}/${userIdx}`, data)
    .then(() => state(false))
    .catch((error) => {
      console.log("내 정보 수정하던 중 에러 발생");
      console.log(error);
    });
};
//* GET : 내가 찜한 약국 리스트
const getLikedPharmList = async (userIdx: number, state: React.Dispatch<React.SetStateAction<never[]>>) => {
  return BaseInstance.get(`${APIS.GET_MY_LIKES}/${userIdx}/pick`)
    .then((response) => state(response.data.response))
    .catch((error) => {
      console.log("내가 찜한 약국리스트 받아오던 중 에러 발생");
      console.log(error);
    });
};
//* GET : 내가 작성한 리뷰 리스트
const getMyReviews = async (userIdx: number, state: React.Dispatch<React.SetStateAction<never[]>>) => {
  return BaseInstance.get(`${APIS.GET_MYREVIEWS}/${userIdx}`)
    .then((response) => state(response.data.response.reviews))
    .catch((error) => {
      console.log("내가 작성한 리뷰리스트 받아오던 중 에러 발생");
      console.log(error);
    });
};
export const UserInstance = {
  getUserInfo,
  patchUserInfo,
  getLikedPharmList,
  getMyReviews,
};
//! 약사 계정 ------------------------------------------------------------------------
//* GET : 약국 정보 받아오기
const getPharmInfo = async (storeIdx: number, state: React.Dispatch<any>) => {
  return BaseInstance.get(`${APIS.GET_PHARMDETAILS}/${storeIdx}`)
    .then((response) => state(response.data.response))
    .catch((error) => {
      console.log("약국 상세정보 받아오던 중 에러 발생");
      console.log(error);
    });
};
//* GET : 약사 정보 받아오기
const getPharmacistInfo = async (userIdx: number, state: any) => {
  return BaseInstance.get(`${APIS.GET_USER_INFO}/${userIdx}`)
    .then((response) => state(response.data.response))
    .catch((error) => {
      console.log("내 정보 다시 가져오던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 약국 이미지 업로드
const postPharmImg = async (data: object) => {
  return BaseInstance.post(APIS.POST_PHARM_IMG, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("약국 사진 보내던 중 에러 발생");
      console.log(error);
    });
};
export const PharmInstance = {
  getPharmInfo,
  getPharmacistInfo,
  postPharmImg,
};
//! 관리자 계정 ------------------------------------------------------------------------
//* GET : 신고리뷰 리스트 불러오기
const getReports = async (state: React.Dispatch<React.SetStateAction<never[]>>) => {
  return (
    BaseInstance.get(APIS.GET_ADMIN_REPORTED)
      // .then((response) => console.log(response.data))
      .then((response) => state(response.data.response.reportedReviews))
      .catch((error) => {
        console.log("신고리뷰리스트 불러오던 중 에러 발생");
        console.log(error);
      })
  );
};
//* DELETE : 신고누적리뷰 삭제
const deleteReportedReview = async (data: object) => {
  return BaseInstance.delete(APIS.DELETE_ADMIN_REVIEW_DELETE, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("신고누적리뷰 삭제하던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 신고누적리뷰 복구
const restoreReview = async (data: object) => {
  return BaseInstance.post(APIS.POST_ADMIN_REVIEW_RESTORE, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("신고누적리뷰 복구하던 중 에러 발생");
      console.log(error);
    });
};
//* GET : 전체 회원 리스트 불러오기
const getUsers = async (state: any, page: any) => {
  return (
    BaseInstance.get(APIS.GET_ADMIN_USERS, { params: { page, size: 20 } })
      // .then((response) => console.log(response.data))
      .then((response) => state(response.data.response))
      .catch((error) => {
        console.log("전체회원리스트 불러오던 중 에러 발생");
        console.log(error);
      })
  );
};
//* POST : 계정 정지
const blockUsers = async (time: number, data: object) => {
  if (time === 0) alert("정지옵션을 선택해주세요");
  return BaseInstance.post(`${APIS.POST_ADMIN_BLOCK}?period=${time}`, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("계정 정지하던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 계정 강퇴
const fireUsers = async (data: object) => {
  return BaseInstance.post(APIS.POST_ADMIN_FIRE, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("계정 강퇴하던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 계정 복구
const restoreUsers = async (data: object) => {
  return BaseInstance.post(APIS.POST_ADMIN_RESTORE, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("계정 복구하던 중 에러 발생");
      console.log(error);
    });
};
//* GET : 약사인증신청 리스트 불러오기
const getCertificates = async (state: React.Dispatch<React.SetStateAction<never[]>>) => {
  return (
    BaseInstance.get(`${APIS.GET_ADMIN_CERTS}`)
      // .then((response) => console.log(response.data))
      .then((response) => state(response.data.response.content))
      .catch((error) => {
        console.log("약사인증신청 리스트 불러오던 중 에러 발생");
        console.log(error);
      })
  );
};
//* POST : 약사인증신청 승인
const successCertify = async (data: object) => {
  return BaseInstance.post(APIS.POST_ADMIN_CERTIFY, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("약사인증 승인하던 중 에러 발생");
      console.log(error);
    });
};
//* POST : 약사인증신청 반려
const deniedCertify = async (data: object) => {
  return BaseInstance.post(APIS.POST_ADMIN_DENY, data)
    .then(() => location.reload())
    .catch((error) => {
      console.log("약사인증 반려하던 중 에러 발생");
      console.log(error);
    });
};
export const AdminInstance = {
  getReports,
  deleteReportedReview,
  restoreReview,
  getUsers,
  blockUsers,
  fireUsers,
  restoreUsers,
  getCertificates,
  successCertify,
  deniedCertify,
};
