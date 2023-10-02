package com.ntt.mwonimoney.global.security.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.StringTokenizer;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {

	private static final String AUTHORITIES_KEY = "Auth";
	private static final String BEARER_TYPE = "Bearer";
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 20 * 1000L; // 30분
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000L; // 한달
	private static final int REFRESH_TOKEN_EXPIRE_TIME_COOKIE = 12 * 30 * 24 * 60 * 60; // 12개월
	private final Key key;

	public JwtTokenProvider(@Value("${jwt.key}") String secret) {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		this.key = Keys.hmacShaKeyFor(keyBytes);
	}

	public static int getRefreshTokenExpireTimeCookie() {
		return REFRESH_TOKEN_EXPIRE_TIME_COOKIE;
	}

	public Token createToken(String id, String role) {
		long now = new Date().getTime();

		String accessToken = Jwts
			.builder()
			.setSubject(id)
			.setIssuedAt(new Date())
			.claim(AUTHORITIES_KEY, role)
			.signWith(key, SignatureAlgorithm.HS256)
			.setExpiration(new Date(now + ACCESS_TOKEN_EXPIRE_TIME))
			.compact();

		String refreshToken = Jwts
			.builder()
			.setSubject(id)
			.setIssuedAt(new Date())
			.claim(AUTHORITIES_KEY, role)
			.signWith(key, SignatureAlgorithm.HS256)
			.setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
			.compact();

		return Token
			.builder()
			.grantType(BEARER_TYPE)
			.accessToken(accessToken)
			.refreshToken(refreshToken)
			.expireTime(REFRESH_TOKEN_EXPIRE_TIME)
			.build();
	}

	public Authentication getAuthentication(String accessToken) {
		Claims claims = parseClaims(accessToken);

		if (claims.get(AUTHORITIES_KEY) == null) {
			throw new RuntimeException("권한이 없습니다.");
		}

		Collection<? extends GrantedAuthority> authorities = Arrays
			.stream(
				claims
					.get(AUTHORITIES_KEY)
					.toString()
					.split(","))
			.map(authority -> new SimpleGrantedAuthority("ROLE_" + authority))
			.collect(Collectors.toList());

		UserDetails principal = new User(claims.getSubject(), "", authorities);
		return new UsernamePasswordAuthenticationToken(principal, accessToken, authorities);
	}

	public Claims parseClaims(String accessToken) {
		try {
			return Jwts
				.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(accessToken)
				.getBody();
		} catch (ExpiredJwtException e) {
			return e.getClaims();
		}
	}

	public String validateToken(String token) {
		try {
			Jwts
				.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token);
			return "valid";
		} catch (MalformedJwtException e) {
			log.info("MalformedJwtException");
			return "invalid";
		} catch (ExpiredJwtException e) {
			log.info("ExpiredJwtException");
			return "isExpired";
		} catch (UnsupportedJwtException e) {
			log.info("UnsupportedJwtException");
			return "isUnsupporeted";
		} catch (IllegalArgumentException e) {
			log.info("IllegalArgumentException");
			return "isIllegal";
		} catch (SignatureException e) {
			log.info("SignatureException");
		}
		return "isSignature";
	}

	public boolean getIsExipired(String accessToken) {
		Date expiration = Jwts
			.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(accessToken)
			.getBody()
			.getExpiration();

		long now = new Date().getTime();
		return (expiration.getTime() - now) > 0;
	}

	public String getMemberUUID(String accessToken) {
		StringTokenizer st = new StringTokenizer(accessToken);

		if (st.countTokens() >= 2)
			st.nextToken();

		String jwtToken = st.nextToken();

		Claims claims = this.parseClaims(jwtToken);

		return claims.get("sub").toString();
	}
}
