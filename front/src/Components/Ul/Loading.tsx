import styled from "styled-components";
import HashLoader from "react-spinners/HashLoader";
import {zIndex_Loading} from "../../Util/z-index";

export default function Loading() {
  return (
    <WrapLoading>
      <HashLoader color="#7472e9" size={60} speedMultiplier={1} />
    </WrapLoading>
  );
}
const WrapLoading = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${zIndex_Loading.Loading};
`;
