package com.ntt.wannabee.domain.member.model.vo;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SmallAccount {

	private int goalMoney;
	private String goalName;
	private String imageFilename;
	private byte saveRatio;

}
