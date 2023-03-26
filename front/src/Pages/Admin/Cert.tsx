import styled from "styled-components";
import { useState } from "react";
import ImageUp from "./ImageUp";
import { TYPE_Cert } from "../../Api/TYPES";

interface Props {
  cert: TYPE_Cert;
}

export default function Cert({ cert }: Props) {
  const [isImgUp, setIsImgUp] = useState<React.SetStateAction<boolean>>(false);
  const [imgUrl, setImgUrl] = useState<React.SetStateAction<string|any>>("");
  return (
    <Contaniner>
      {isImgUp ? <ImageUp isImgUp={isImgUp} setIsImgUp={setIsImgUp} imgUrl={imgUrl} /> : null}
      <Values className="nickname">{cert.name as any}</Values>
      <Values className="email">{cert.email}</Values>
      <Values className="requested">{new Date(cert.createdAt).toLocaleDateString()}</Values>
      <Values
        className="businessCert link"
        onClick={() => {
          setIsImgUp(!isImgUp);
          setImgUrl(cert.businessCertificate);
        }}
      >
        {cert.businessCertificate}
      </Values>
      <Values
        className="licenceCert link"
        onClick={() => {
          setIsImgUp(!isImgUp);
          setImgUrl(cert.pharmacistCertificate);
        }}
      >
        {cert.pharmacistCertificate}
      </Values>
    </Contaniner>
  );
}

const Contaniner = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 8px;
  width: 100%;
`;
const Values = styled.span`
  display: flex;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &.checkBox {
    padding-left: 7px;
  }
  &.nickname {
    width: 200px;
  }
  &.email {
    width: 200px;
  }
  &.requested {
    width: 100px;
  }
  &.businessCert {
    width: 200px;
  }
  &.licenceCert {
    width: 200px;
  }
  &.link {
    cursor: pointer;
    text-decoration: underline;
    color: var(--blue-300);
    :hover {
      color: var(--blue-600);
    }
  }
`;
