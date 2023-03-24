package com.project.mainproject.utils;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class FileUploader {

    private final AmazonS3Client amazonS3Client;
    private final String UPLOAD_PATH = ""; // TODO: S3로 통일 후 삭제
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    public String saveImage(MultipartFile uploadFile) { // TODO: S3로 통일 후 삭제
        String fileName = createFileName(uploadFile.getOriginalFilename());
        String uploadFilePath = UPLOAD_PATH + fileName;
        try {
            uploadFile.transferTo(new File(uploadFilePath));
        } catch (IOException e) {
            log.info(e.getMessage());
        }
        return uploadFilePath;
    }

    public String saveImage(MultipartFile uploadFile, String uploadDir) {
        String fileName = uploadDir + "/" + createFileName(uploadFile.getOriginalFilename());
        ObjectMetadata metadata = createMetadata(uploadFile);

        try {
            amazonS3Client.putObject(
                    new PutObjectRequest(
                            bucketName, fileName, uploadFile.getInputStream(), metadata
                    ).withCannedAcl(CannedAccessControlList.PublicRead)
            );
        }catch (IOException e) {
            log.error("#### S3 Upload IOException", e.getMessage());
            e.printStackTrace();
        }

        return amazonS3Client.getUrl(bucketName, fileName).toString();
    }

    private ObjectMetadata createMetadata(MultipartFile multipartFile) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(multipartFile.getContentType());
        metadata.setContentLength(multipartFile.getSize());

        return metadata;
    }

    private String createFileName(String originalFilename) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(originalFilename);

        return uuid.concat(ext);
    }

    private String extractExt(String originalFilename) {
        int idx = originalFilename.lastIndexOf(".");

        return originalFilename.substring(idx);
    }
    
    public void deleteImages(List<String> imagePaths) { // TODO: S3로 통일 후 삭제
        boolean isSuccess = false;
        for (String imagePath : imagePaths) {
            File deleteFile = new File(imagePath);
            isSuccess = deleteFile.delete();
            if (!isSuccess) throw new RuntimeException("파일 삭제 실패");
        }
    }

    public void deleteImage(String imagePath) { // TODO: S3로 통일 후 삭제
        File deleteFile = new File(imagePath);
        if (!deleteFile.delete()) {
            throw new RuntimeException("파일 삭제 실패");
        }
    }// ↓ S3용

    public void deleteS3Image(String imagePath) {
        String object_key = getImageKey(imagePath);
        try {
            amazonS3Client.deleteObject(bucketName, object_key);
        } catch (AmazonServiceException e) {
            log.error("#### S3 Delete AmazonServiceException", e.getMessage());
        }
    }

    private String getImageKey(String imagePath) {
        final String S3_BUCKET_PATH = "https://main-005-image.s3.ap-northeast-2.amazonaws.com/";
        return imagePath.replace(S3_BUCKET_PATH, "");
    }

    public String deleteAndSaveImage(MultipartFile uploadFile , String imagePath) {
        deleteImage(imagePath);
        String uploadFilePath = saveImage(uploadFile);
        return uploadFilePath;
    } // ↓ S3용

    public String patchImage(MultipartFile uploadFile , String imagePath, String uploadDir) {
        deleteS3Image(imagePath);
        String uploadFilePath = saveImage(uploadFile, uploadDir);
        return uploadFilePath;
    }
}
