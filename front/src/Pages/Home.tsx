import { useState } from "react";
import PharmLists from "../Components/PharmList/PharmLists";
import KakaoMap from "../Components/Map/KakaoMap";
import { SELECT_HIDDEN } from "../Util/type";

export default function Home() {
  const [hidden, setHidden] = useState<SELECT_HIDDEN>(false);
  return (
    <>
      <KakaoMap hidden={hidden} setHidden={setHidden} />
      <PharmLists hidden={hidden} setHidden={setHidden} />
    </>
  );
}
