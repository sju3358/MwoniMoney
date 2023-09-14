package com.ntt.wannabee.domain.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SmallAccount {

	private int goalMoney;
	private String goalName;
	private String imageFilename;
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
