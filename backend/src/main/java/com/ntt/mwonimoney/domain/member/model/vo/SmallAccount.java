package com.ntt.mwonimoney.domain.member.model.vo;

import org.springframework.beans.factory.annotation.Value;

import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SmallAccount {

	@Value("${aws.s3.image.goal.url}")
	static String S3ImageUrl;

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
