package com.ntt.mwonimoney.domain.member.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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

	@OneToOne
	@JoinColumn(name = "parent_idx")
	private Parent parent;

	@OneToOne
	@JoinColumn(name = "childIdx")
	private Child child;

	@Builder
	public Children(String parentUUID, String childUUID, Parent parent, Child child) {
		this.childrenKey = new ChildrenKey(parentUUID, childUUID);
		this.parent = parent;
		this.child = child;
	}

}
