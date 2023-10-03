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
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
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

	@Override
	public void sendNotificationByToken(FCMRequest fcmRequest) {
		Optional<Member> member = (Optional<Member>)memberRepository.findMemberByUuid(fcmRequest.getMemberUuid());

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
					log.info("알림 전송 성공");
				} catch (FirebaseMessagingException e) {
					e.printStackTrace();
					log.info("알림 전송 실패");
				}
			} else {
				log.info("Firebase Token이 존재하지 않음");
			}
		} else
			log.info("유저가 존재하지 않음");
	}
}
