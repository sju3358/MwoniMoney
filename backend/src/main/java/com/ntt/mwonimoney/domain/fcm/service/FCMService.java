package com.ntt.mwonimoney.domain.fcm.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ntt.mwonimoney.domain.fcm.model.FCMRequestDto;
import com.ntt.mwonimoney.domain.member.entity.Member;
import com.ntt.mwonimoney.domain.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FCMService {

	private final FirebaseMessaging firebaseMessaging;
	private final MemberRepository memberRepository;

	public String sendNotificationByToken(FCMRequestDto fcmRequestDto) {
		Optional<Member> member = memberRepository.findMemberByIdx(fcmRequestDto.getMemberIdx());

		if (member.isEmpty())
			return "유저가 존재하지 않음";

		if (member.get().getFirebaseToken() != null) {
			Notification notification = Notification
				.builder()
				.setTitle(fcmRequestDto.getTitle())
				.setBody(fcmRequestDto.getContent())
				.build();

			Message message = Message
				.builder()
				.putData("title", fcmRequestDto.getTitle())
				.putData("content", fcmRequestDto.getContent())
				.setToken(member
					.get()
					.getFirebaseToken())
				.setNotification(notification)
				.build();
			try {
				firebaseMessaging.send(message);
				return "알림 전송 성공 : " + fcmRequestDto.getMemberIdx();
			} catch (FirebaseMessagingException e) {
				e.printStackTrace();
				return "알림 전송 실패 : " + fcmRequestDto.getMemberIdx();
			}
		} else {
			return "Firebase Token이 존재하지 않음 : " + fcmRequestDto.getMemberIdx();
		}

	}
}
