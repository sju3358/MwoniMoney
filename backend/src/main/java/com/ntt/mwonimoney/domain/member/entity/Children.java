package com.ntt.mwonimoney.domain.member.entity;

import com.ntt.mwonimoney.domain.member.model.dto.ChildrenDto;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "children")
public class Children {

	@EmbeddedId
	private ChildrenKey childrenKey;

	@Builder
	public Children(Long parentIdx, Long childrenIdx) {
		this.childrenKey = new ChildrenKey(parentIdx, childrenIdx);
	}

	public ChildrenDto convertToDto() {
		return ChildrenDto.builder()
			.parentIdx(this.childrenKey.getParentIdx())
			.childUIdx(this.childrenKey.getChildIdx())
			.build();
	}
}
