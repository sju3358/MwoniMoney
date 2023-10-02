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

	static String S3ImageUrl = "https://mwonimoney.s3.ap-northeast-2.amazonaws.com/goal/";

	@Column(name = "smallaccount_goalmoney")
	private int goalMoney;

	@Column(name = "smallaccount_goalName")
	private String goalName;

	@Column(name = "smallaccount_imagefilename")
	private String imageFilename;

	@Column(name = "smallaccount_saveratio")
	private int saveRatio;

	public SmallAccount createResponseData() {
		return new SmallAccount(
			this.getGoalMoney(),
			this.goalName,
			S3ImageUrl + this.imageFilename,
			this.saveRatio
		);
	}
}
