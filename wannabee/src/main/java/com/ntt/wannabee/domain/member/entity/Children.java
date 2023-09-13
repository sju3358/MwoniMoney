package com.ntt.wannabee.domain.member.entity;

import com.ntt.wannabee.domain.member.model.dto.ChildrenDto;

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
@Table(name = "member")
public class Children {

	@EmbeddedId
	private ChildrenKey childrenKey;

	@Builder
	public Children(String parentUUID, String childUUID) {
		this.childrenKey = new ChildrenKey(parentUUID, childUUID);
	}

	public ChildrenDto convertToDto() {
		return ChildrenDto.builder()
			.parentUUID(this.childrenKey.getParentUUID())
			.childUUID(this.childrenKey.getChildUUID())
			.build();
	}
}
