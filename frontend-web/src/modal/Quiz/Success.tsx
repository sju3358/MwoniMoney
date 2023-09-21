import * as React from "react";
import ModalBody from "../ModalBack";
import ChallengeList from "../../components/Parents/Challenge/ChallengeList";

export default function BasicModal() {
  return (
    <div>
      <ModalBody
        modal_start_text="모달띄우는 버튼에 적을 말"
        modal_title="모달 제목"
        modal_content={<ChallengeList />} /**테그 넣는 방법*/
        modal_btn="모달 닫는 버튼"
      />
    </div>
  );
}
