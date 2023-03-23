import React, { useState } from "react";
import styled from "styled-components";
import ImageUp from "./ImageUp";

interface Props {
  cert: any;
}

export default function Cert({ cert }: Props) {
  const [isImgUp, setIsImgUp] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  return (
    <Contaniner>
      {isImgUp ? <ImageUp isImgUp={isImgUp} setIsImgUp={setIsImgUp} imgUrl={imgUrl} /> : null}
      <Values className="nickname">{cert.nickname as any}</Values>
      <Values className="email">{cert.email}</Values>
      <Values className="requested">{cert.requested}</Values>
      <Values
        className="businessCert link"
        onClick={() => {
          setIsImgUp(!isImgUp);
          setImgUrl(cert.businessCert);
        }}
      >
        {cert.businessCert}
      </Values>
      <Values
        className="licenceCert link"
        onClick={() => {
          setIsImgUp(!isImgUp);
          setImgUrl(cert.licenceCert);
        }}
      >
        {cert.licenceCert}
      </Values>
    </Contaniner>
  );
}

const Contaniner = styled.div`
  display: flex;
  align-items: center;
`
const Values = styled.span`
  display: flex;
  justify-content: center;
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
