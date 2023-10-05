package com.ntt.mwonimoney.domain.quiz.api;

import java.util.List;

import com.ntt.mwonimoney.domain.member.service.MemberService;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerRequestDto;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.domain.quiz.model.dto.PostAnswerResponseDto;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ntt.mwonimoney.domain.quiz.model.dto.QuizDto;
import com.ntt.mwonimoney.domain.quiz.service.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class QuizApi {

	private final QuizService quizService;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberAuthService memberAuthService;
	private final MemberService memberService;

	//뱅크서비스

	@GetMapping("/quizes")
	public ResponseEntity getQuizes() {

		List<QuizDto> responseData = quizService.getRandom5QuizSet();

		return ResponseEntity.ok().body(responseData);
	}

	// @PostMapping("/quizes/")
	// public ResponseEntity gradeAnswers(@RequestBody List<GradeAnswerRequest> requests) {
	//
	// 	List<Integer> userSelectedAnswers = new ArrayList<>();
	//
	// 	if(requests.size() != 5)
	// 		return ResponseEntity.badRequest().body()
	//
	// 	for (GradeAnswerRequest request : requests)
	// 		userSelectedAnswers.add(request.getSelectAnswer());
	// }

	@PostMapping("/quizes")
	public ResponseEntity postAnswer(@RequestHeader("Authorization") String accessToken, @RequestBody PostAnswerRequestDto postAnswerRequestDto) {

		String memberUUID = jwtTokenProvider.getMemberUUID(accessToken);
//		Long memberIdx = memberAuthService.getMemberAuthInfo(memberUUID).getMemberIdx();
		Long memberIdx = memberService.getMemberIdx(memberUUID);

		PostAnswerResponseDto result = quizService.postAnswer(memberIdx, postAnswerRequestDto);

		return ResponseEntity.ok().body(result);
	}
}
