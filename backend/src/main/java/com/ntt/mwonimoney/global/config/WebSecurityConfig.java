package com.ntt.mwonimoney.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.ntt.mwonimoney.domain.member.repository.MemberAuthRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.domain.member.service.MemberAuthService;
import com.ntt.mwonimoney.global.security.jwt.JwtAuthenticationFilter;
import com.ntt.mwonimoney.global.security.jwt.JwtTokenProvider;
import com.ntt.mwonimoney.global.security.jwt.TokenAccessDeniedHandler;
import com.ntt.mwonimoney.global.security.oauth.exception.RestAuthenticationEntryPoint;
import com.ntt.mwonimoney.global.security.oauth.handler.OAuth2AuthenticationFailureHandler;
import com.ntt.mwonimoney.global.security.oauth.handler.OAuth2AuthenticationSuccessHandler;
import com.ntt.mwonimoney.global.security.oauth.repository.OAuth2AuthorizationRequestBasedOnCookieRepository;
import com.ntt.mwonimoney.global.security.oauth.service.CustomOAuth2UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
@Slf4j
public class WebSecurityConfig {

	private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
	private final CustomOAuth2UserService customOAuth2UserService;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final MemberAuthRepository memberAuthRepository;
	private final MemberAuthService memberAuthService;
	private static final String[] GET_LIST = {"/api/oauth2/authorization", "/api/login/oauth2/code/**",
		"/swagger-ui/**", "/v3/api-docs/**", "/api-docs/**", "/api-docs/swagger-config", "/api/v1/balances/*/chatting"};

	private static final String[] POST_LIST = {"/api/v1/balances/*/chatting"};

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf(AbstractHttpConfigurer::disable)
			.httpBasic(AbstractHttpConfigurer::disable)
			.formLogin(AbstractHttpConfigurer::disable)
			.cors(c -> c.configurationSource(corsConfigurationSource()))
			.exceptionHandling(c -> c.authenticationEntryPoint(new RestAuthenticationEntryPoint())
				.accessDeniedHandler(tokenAccessDeniedHandler))
			.sessionManagement(c -> c.sessionCreationPolicy((SessionCreationPolicy.STATELESS)))
			.authorizeHttpRequests(auth -> auth.requestMatchers(HttpMethod.GET, GET_LIST)
				.permitAll()
				.requestMatchers(HttpMethod.POST, POST_LIST)
				.permitAll()
				.requestMatchers("/**")
				.hasAnyRole("PARENT", "CHILD", "GUEST")
				.anyRequest()
				.authenticated())
			.oauth2Login()
			.authorizationEndpoint()
			.baseUri("/api/oauth2/authorization")
			.authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
			.and()
			.redirectionEndpoint()
			.baseUri("/api/login/oauth2/code/*").and()
			.userInfoEndpoint()
			.userService(customOAuth2UserService)
			.and()
			.successHandler(oAuth2AuthenticationSuccessHandler())
			.failureHandler(oAuth2AuthenticationFailureHandler())
			.permitAll()
			.and()
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider, memberRepository, memberAuthRepository),
				UsernamePasswordAuthenticationFilter.class);

		return httpSecurity.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration corsConfiguration = new CorsConfiguration();

		corsConfiguration.addAllowedOriginPattern("*");
		corsConfiguration.addAllowedHeader("*");
		corsConfiguration.addAllowedMethod("*");
		corsConfiguration.setAllowCredentials(true);
		source.registerCorsConfiguration("/**", corsConfiguration);
		return source;
	}

	@Bean
	public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
		return new OAuth2AuthorizationRequestBasedOnCookieRepository();
	}

	@Bean
	public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
		return new OAuth2AuthenticationSuccessHandler(oAuth2AuthorizationRequestBasedOnCookieRepository(),
			jwtTokenProvider, memberRepository, memberAuthService);
	}

	@Bean
	public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
		return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
	}
}