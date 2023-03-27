import React from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Form, TYPE_setpSignForms } from "../../Api/TYPES";
import Button from "../Ul/Button";

interface Props {
  scriptUrl?: string;
  setpSignForms: TYPE_setpSignForms;
}

export default function PharmAddress({ scriptUrl, setpSignForms }: Props) {
  const open = useDaumPostcodePopup(scriptUrl);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setpSignForms((prev: Form) => ({ ...prev, address: fullAddress }));
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    open({ onComplete: handleComplete });
    e.preventDefault();
  };
  return (
    <div className="adress_find">
      <Button color="l_blue" size="sm" text="주소 찾기" onClick={handleClick} />
    </div>
  );
}
