package com.ntt.mwonimoney.global.fcm.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.entity.MemberAuth;
import com.ntt.mwonimoney.domain.member.repository.MemberAuthRepository;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;
import com.ntt.mwonimoney.global.fcm.api.request.FCMTokenRequest;
import com.ntt.mwonimoney.global.fcm.model.FCMRequest;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FCMServiceImpl implements FCMService {

	private final FirebaseMessaging firebaseMessaging;
	private final MemberRepository memberRepository;
	private final MemberAuthRepository memberAuthRepository;

	@Override
	@Transactional
	public void updateFCMToken(FCMTokenRequest fcmTokenRequest) {
		MemberAuth memberAuth = memberAuthRepository.findById(fcmTokenRequest.getUserUUID())
			.orElseThrow();
		Member member = memberRepository.findMemberByIdx(memberAuth.getMemberIdx()).orElseThrow();
		member.updateFCMToken(fcmTokenRequest.getFirebaseToken());
		memberRepository.save(member);
	}

	public String sendNotificationByToken(FCMRequest fcmRequest) {
		Optional<Member> member = (Optional<Member>)memberRepository.findMemberByIdx(fcmRequest.getMemberIdx());

		if (member.isPresent()) {
			if (member.get().getFCMToken() != null) {
				Notification notification = Notification
					.builder()
					.setTitle(fcmRequest.getTitle())
					.setBody(fcmRequest.getContent())
					.build();

				Message message = Message
					.builder()
					.putData("title", fcmRequest.getTitle())
					.putData("content", fcmRequest.getContent())
					.setToken(member
						.get()
						.getFCMToken())
					.setNotification(notification)
					.build();
				try {
					firebaseMessaging.send(message);
					return "알림 전송 성공 : " + fcmRequest.getMemberIdx();
				} catch (FirebaseMessagingException e) {
					e.printStackTrace();
					return "알림 전송 실패 : " + fcmRequest.getMemberIdx();
				}
			} else {
				return "Firebase Token이 존재하지 않음 : " + fcmRequest.getMemberIdx();
			}
		} else
			return "유저가 존재하지 않음";
	}
}
