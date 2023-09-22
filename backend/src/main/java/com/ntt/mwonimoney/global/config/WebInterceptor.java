package com.ntt.mwonimoney.global.config;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class WebInterceptor implements HandlerInterceptor {
	// 컨트롤러의 메서드에 매핑된 특정 URI가 호출됐을 때 실행되는 메서드로, 컨트롤러를 경유(접근)하기 직전에 실행되는 메서드입니다.
	// 우리는 사용자가 어떠한 기능을 수행했는지를 파악하기 위하여 해당 기능과 매핑된 URI 정보가 콘솔에 로그가 출력되도록 처리합니다.
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws
		Exception {
		log.info("[preHandle] : " + request.getMethod() + " : " + request.getRequestURI() + " request start");

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
		ModelAndView modelAndView) throws Exception {
		log.info("[postHandle] : " + request.getMethod() + " : " + request.getRequestURI() + " request done");
	}
}