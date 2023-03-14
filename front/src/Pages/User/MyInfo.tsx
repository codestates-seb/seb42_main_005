import PharmRank from "../../Components/Ul/PharmRank";

export default function MyInfo() {
  return (
    <section>
      <section>
        <header>내 정보</header>
        <section>
        <aside>이미지 자리</aside>
        <main>
          <div>
            <h3>가입일</h3>
            <span>2023.03.06</span>
          </div>
          <div>
            <h3>닉네임</h3>
            <span>caffeine</span>
          </div>
          <div>
            <h3>email</h3>
            <span>JudiPark0426@github.com</span>
          </div>
          <div>
            <h3>주소</h3>
            <span>서울시 종로구 대학로 101</span>
          </div>
          <button>수정하기</button>
        </main>
        </section>
      </section>
      <section>
        <header>내가 찜한 약국</header>
        <section>
          <h3>
            <span>번호</span>
            <span>약국명</span>
            <span>주소</span>
            <span>전화번호</span>
            <span>삭제</span>
          </h3>
          <div>
            <span>1</span>
            <span>킹갓 약국</span>
            <span>서울시 종로구 대학로 101</span>
            <span>1599-5700</span>
            <span>삭제</span>
          </div>
        </section>
      </section>
      <section>
      <header>내가 남긴 리뷰</header>
        <section>
          <h3>
            <span>아이콘</span>
            <span>약국명</span>
            <span>내용</span>
            <span>삭제</span>
          </h3>
          <div>
            <span>아이콘</span>
            <span>약국명</span>
            <span>내용</span>
            <span>삭제</span>
          </div>
        </section>
      </section>
    </section>
  );
}
