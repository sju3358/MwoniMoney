package com.ntt.mwonimoney.domain.member.model.vo;

import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SmallAccount {

	@Column(name = "smallaccount_goalmoney")
	private int goalMoney;

	@Column(name = "smallaccount_goalName")
	private String goalName;

	@Column(name = "smallaccount_imagefilename")
	private String imageFilename;

	@Column(name = "smallaccount_saveratio")
	private byte saveRatio;

	public SmallAccount createVo() {
		return new SmallAccount(
			this.getGoalMoney(),
			this.goalName,
			this.imageFilename,
			this.saveRatio
		);
	}
}
