import styled from "styled-components";
import { toast } from "react-toastify";
import { TYPE_reviewList, TYPE_setBoolean, TYPE_Detail } from "../../Api/TYPES";
import ReviewUnit from "./ReviewUnit";
import { getLocalStorage } from "../../Api/localStorage";
import { useNavigate } from "react-router-dom";
import { AiOutlineExclamationCircle } from "react-icons/ai";

interface Props {
  reviewList: TYPE_reviewList[];
  setReviewList: any;
  setIsReviewFormShown: TYPE_setBoolean;
  storeIdx: number;
  Pharm: TYPE_Detail | undefined;
}

export default function ReviewList({ reviewList, setReviewList, setIsReviewFormShown, storeIdx, Pharm }: Props) {
  const token = getLocalStorage("access_token");
  const navigate = useNavigate();
  const WriteReview = () => {
    if (!token) {
      toast.error("리뷰를 작성하시려면 로그인을 해주세요!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => navigate("/login"), 1000);
    } else setIsReviewFormShown(true)
  };

  return (
    <ReviewContainer>
      <ReviewTitle>리뷰</ReviewTitle>
      {reviewList.length ? (
        <Reviews>
          {reviewList.map((review: any, i: number) => (
            <ReviewUnit
              key={i}
              review={review}
              reviewIdx={review.reviewIdx}
              reviewUserName={review.userName}
              Pharm={Pharm}
              setReviewList={setReviewList}
              reviewList={reviewList}
            />
          ))}
        </Reviews>
      ) : (
        <Instead>
          <AiOutlineExclamationCircle className="bigger" onClick={() => WriteReview()} />
          <p>작성된 리뷰가 없습니다.</p>
          <p>지금 리뷰를 작성해 보세요!</p>
        </Instead>
      )}
    </ReviewContainer>
  );
}

const ReviewContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 510px;
  width: 450px;
  padding: 10px 0px 0px 20px;
  @media (max-width: 768px) {
    position: static;
    display: flex;
    align-items: center;
    height: auto;
    padding: 20px 10px 10px 10px;
    border-bottom: 1px solid var(--black-100);
  }
`;
const ReviewTitle = styled.h2`
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  color: var(--black-500);
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 10px;
    gap: 100px;
    width: 450px;
  }
`;
const Reviews = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  padding: 10px 10px 0 0;
  :active::-webkit-scrollbar-track {
    width: 0.6rem;
    visibility: visible;
  }
  @media (max-width: 768px) {
    flex-grow: 1;
    overflow: visible;
  }
`;
const Instead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  width: 420px;
  height: 500px;
  font-weight: 700;
  color: var(--black-300);
  border-radius: 5px;
  .bigger {
    font-size: 40px;
    margin-bottom: 10px;
    :hover {
      color: var(--black-500);
    }
  }
  @media (max-width: 768px) {
    height: 200px;
  }
`;
