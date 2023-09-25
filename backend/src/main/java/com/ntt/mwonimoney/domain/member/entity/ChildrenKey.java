package com.ntt.mwonimoney.domain.member.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChildrenKey implements Serializable {

	@Column(name = "pk_parent_uuid")
	private String parentUUID;

	@Column(name = "pk_children_uuid")
	private String childUUID;

}
