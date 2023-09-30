package com.ntt.mwonimoney.domain.member.service;

public interface ChildService {

	public void addSmallAccountInfo(
		Long memberIdx,
		int goalMoney,
		String goalName,
		String imageFilename,
		int saveRatio);

	public void deleteSmallAccountInfo(Long memberIdx);

	public void editQuizReward(Long memberIdx, int quizReward);

	public void editQuizRewardRemain(Long memberIdx, int quiRewardRemainToAdd);
	
}
