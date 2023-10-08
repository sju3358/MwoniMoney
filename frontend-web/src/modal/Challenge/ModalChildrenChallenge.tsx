/**이미지 클릭 모달/!!!!! */
import * as React from "react";
import styled from "styled-components";
import Modal from "@mui/material/Modal";

//recoil
import { useRecoilState } from "recoil";
import { newChallenge } from "../../states/ChallengeState";
import { isProposeChallenge } from "../../states/ChallengeState";

//axios
import api from "../../apis/Api";

interface ModalBackPops {
  height?: string;
}

/**모달 위치 고정을 위한 Container */
export const ModalContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  top: -5px;
  left: 8px;
`;

/**실질적 모달 몸통, 높이 커스텀 가능 */
export const ModalBack = styled.div<ModalBackPops>`
  position: absolute;
  top: 15%;
  left: 7%;
  // transform: translate(-50%, 50%);
  width: 80%;
  height: ${(props) => (props.height ? props.height : "50%")};
  background-color: #ffffff;
  padding: 4px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.1);
`;

interface forBtn {
  justify?: string;
}

/**모달 헤더, 푸터 기능 */
export const ModalTopBottom = styled.div<forBtn>`
  // border: 1px solid black;
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: center;
  font-size: 1.3em;
  font-weight: bold;
`;

/**모달 내용 자리 - 테그 함수 들어갈 수 있도록 수정 */
interface ModalContentProps {
  justify?: string;
  align?: string;
}
export const ModalContent = styled.div<ModalContentProps>`
  // border: 1px solid black;
  padding-top:3%
  width: 100%;
  height: 70%;
  overflow: auto;
  display: flex;
  justify-content: ${(props) => (props.justify ? props.justify : "center")};
  align-items: ${(props) => (props.align ? props.align : "center")};
`;
interface Btn {
  back_color?: string;
  af_back_color?: string;
  border?: string;
}
/**모달 닫기 버튼 */
export const ModalBtn = styled.div<Btn>`
  // border: 1px solid black;
  width: 40%;
  height: 80%;
  background-color: ${(props) =>
    props.back_color ? props.back_color : "#fbd570"};
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;

  border: ${(props) => (props.border ? props.border : "none")};
  &:active {
    background-color: ${(props) =>
      props.af_back_color ? props.af_back_color : props.af_back_color};
    transform: translate(0em, 0.2em);
  }
`;

interface ModalProps {
  modal_title: string;
  modal_content: React.ReactNode;
  modal_btn1: string;
  modal_btn2: string;
  content_justify?: string;
  content_align?: string;
  btn_justify?: string;
  useState_open: boolean;
  set_open: (val: boolean) => void;
}

const ModalChildrenChallenge: React.FC<ModalProps> = ({
  modal_title,
  modal_content,
  modal_btn1,
  modal_btn2,
  content_justify,
  content_align,
  useState_open,
  set_open,
}) => {
  // console.log(useState_open + "455654");
  const [newChallengeData, setNewChallengeData] = useRecoilState(newChallenge);
  const [isProposeState, setisProposeState] =
    useRecoilState(isProposeChallenge);

  const handleSubmit = () => {
    if (newChallengeData.category.length < 1) {
      alert("챌린지 카테고리가 없습니다.");
      return;
    }
    if (newChallengeData.title.length < 1) {
      alert("챌린지 부제가 없습니다.");
      return;
    }
    if (newChallengeData.memo.length < 1) {
      alert("챌린지 제목이 없습니다.");
      return;
    }
    if (newChallengeData.reward < 100) {
      alert("100원보다 크게 설정해주세요");
      return;
    }
    if (newChallengeData.endTime.length < 1) {
      alert("마감기한이 없습니다.");
      return;
    }

    // NewChallengeData에 uuid랑 status설정하기
    const PostData = {
      childUuid: "none",
      title: newChallengeData.title,
      category: newChallengeData.category,
      memo: newChallengeData.memo,
      reward: newChallengeData.reward,
      status: 2,
      endTime: new Date(newChallengeData.endTime).toISOString(),
    };
    console.log(PostData);

    api
      .post("/v1/challenges/propose", PostData)
      .then((response) => {
        // 성공적으로 요청이 완료된 경우 처리할 로직
        console.log("POST 요청 성공:", response.data);
        set_open(false);
        console.log("onclick_Close");
        handleClearNewChallenge();
        setisProposeState(true);
      })
      .catch((error) => {
        // 요청이 실패한 경우 처리할 로직
        if (error.response) {
          // 서버에서 응답이 왔지만, 응답 상태 코드가 실패인 경우
          console.error("POST 요청 실패 - 응답 데이터:", error.response.data);
        } else if (error.request) {
          // 서버로 요청을 보내지 못한 경우
          console.error("POST 요청 실패 - 요청을 보낼 수 없음");
        } else {
          // 요청 준비 과정에서 에러가 발생한 경우
          console.error("POST 요청 실패 - 요청 준비 중 에러 발생");
        }
      });
  };

  //NewChallengeData 초기화하기
  const handleClearNewChallenge = () => {
    setNewChallengeData({
      childUuid: "",
      title: "",
      category: "",
      memo: "",
      reward: 0,
      status: 0,
      endTime: "",
    });
  };

  const handleClose = () => {
    set_open(false);
    console.log("onclick_Close");
    handleClearNewChallenge();
  };

  console.log(useState_open);

  return (
    <Modal
      open={useState_open}
      onClose={() => {
        set_open(false);
      }}
    >
      <ModalContainer>
        <ModalBack>
          <ModalTopBottom>{modal_title}</ModalTopBottom>
          <ModalContent justify={content_justify} align={content_align}>
            {modal_content}
          </ModalContent>
          <ModalTopBottom justify="space-around">
            <ModalBtn af_back_color="#FFC107" onClick={handleSubmit}>
              {modal_btn1}
            </ModalBtn>
            <ModalBtn
              back_color="white"
              af_back_color="#BBBBBB"
              border="1px solid #BBBBBB"
              onClick={handleClose}
            >
              {modal_btn2}
            </ModalBtn>
          </ModalTopBottom>
        </ModalBack>
      </ModalContainer>
    </Modal>
  );
};
export default ModalChildrenChallenge;
