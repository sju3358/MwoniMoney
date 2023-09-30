package com.ntt.mwonimoney.domain.quiz.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ntt.mwonimoney.domain.quiz.model.dto.QuizDto;
import com.ntt.mwonimoney.domain.quiz.service.QuizService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class QuizApi {

	private final QuizService quizService;

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
}
