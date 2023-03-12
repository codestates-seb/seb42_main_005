import { Link } from "react-router-dom";
import styled from "styled-components";

interface ThisTab {
  current?: string;
}

export default function AdminTabs({ current }: ThisTab) {
  return (
    <TabContainer>
      <Tabs to="/admin-reports" className={current==="reports"?"this":""}>신고리뷰 관리</Tabs>
      <Tabs to="/admin-users" className={current==="users"?"this":""}>전체회원 관리</Tabs>
      <Tabs to="/admin-certify" className={current==="certify"?"this":""}>약사인증 관리</Tabs>
    </TabContainer>
  );
}

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 1;
  height: 3rem;
`;
const Tabs = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
  padding: 0 3rem 0 1.5rem;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  color: var(--black-500);
  border: 1px solid var(--black-100);
  border-bottom: none;
  border-radius: 10px 10px 0px 0px;
  background-color: var(--black-050);
  :hover {
    background-color: var(--black-075);
  }
  &.this {
    color: var(--black);
    background-color: var(--white);
  }
`;
