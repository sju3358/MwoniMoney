package com.ntt.mwonimoney.domain.member.util;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;
import software.amazon.ion.NullValueException;

@Component
@RequiredArgsConstructor
public class S3Manager {

	@Value("${spring.data.couchbase.bucket-name}/goal")
	private String goalImageBucket;

	private final AmazonS3Client amazonS3Client;

	/**
	 * Save imgfile in S3/feed
	 * @param file
	 * @return
	 * string[0] : origin FileName (exception : ""),
	 * string[1] : TransFileName (exception : "")
	 * @throws IOException
	 */
	public String[] saveGoalImage(MultipartFile file) throws IOException {

		String[] fileNames = new String[2];

		try {

			if (file == null || file.getOriginalFilename().equals("empty") == true)
				return new String[2];

			String fileName = getRandomFileName(file.getName());

			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentType(file.getContentType());
			metadata.setContentLength(file.getSize());
			amazonS3Client.putObject(goalImageBucket, fileName, file.getInputStream(), metadata);

			fileNames[0] = file.getOriginalFilename();
			fileNames[1] = fileName;

		} catch (NullValueException e) {
			fileNames = new String[] {"", ""};
		} catch (IOException e) {
			e.printStackTrace();
			fileNames = new String[] {"", ""};
		} catch (Exception e) {
			e.printStackTrace();
			fileNames = new String[] {"", ""};
		} finally {
			return fileNames;
		}
	}

	private String getRandomFileName(String fileName) {

		Random generator = new java.util.Random();
		generator.setSeed(System.currentTimeMillis());
		String randomNumber = String.format("%06d", generator.nextInt(1000000) % 1000000);

		return convertDateToString(LocalDateTime.now()) + '_' + randomNumber;
	}

	private String convertDateToString(LocalDateTime nowDate) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
		return nowDate.format(formatter);
	}
}

