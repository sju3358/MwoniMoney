package com.ntt.wannabee.domain.member.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberRepositoryCustomImpl {

	private final JPAQueryFactory jpaQueryFactory;

	// private final Optional<MemberDto> findMemberByUuid(String uuid) {
	// 	jpaQueryFactory
	// 		.select()
	// 		.from()
	// 		.where()
	// 		.fetchOne();
	//
	// }
}
