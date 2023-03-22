package com.project.mainproject.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Slf4j
public class FileUploader {

//    @Value("${upload.path}")
//    private String uploadPath;
    private final static String uploadDir = "C:/study/file/";

    public static String saveImage(MultipartFile uploadFile) {
        String fileName = createFileName(uploadFile.getOriginalFilename());
        String uploadFilePath = uploadDir + fileName;
        try {
            uploadFile.transferTo(new File(uploadFilePath));
        } catch (IOException e) {
            log.info(e.getMessage());
        }
        return uploadFilePath;
    }

    private static String createFileName(String originalFilename) {
        String uuid = UUID.randomUUID().toString();
        String ext = extractExt(originalFilename);

        return uuid.concat(ext);
    }

    private static String extractExt(String originalFilename) {
        int idx = originalFilename.lastIndexOf(".");

        return originalFilename.substring(idx);
    }
    
    public static void deleteImages(List<String> imagePaths) {
        boolean isSuccess = false;
        for (String imagePath : imagePaths) {
            File deleteFile = new File(imagePath);
            isSuccess = deleteFile.delete();
            if (!isSuccess) throw new RuntimeException("파일 삭제 실패");
        }
    }
    public static void deleteImage(String imagePath) {
        File deleteFile = new File(imagePath);
        if (!deleteFile.delete()) {
            throw new RuntimeException("파일 삭제 실패");
        }

    }

    public static String deleteAndSaveImage(MultipartFile uploadFile , String imagePath) {
        deleteImage(imagePath);
        String uploadFilePath = saveImage(uploadFile);
        return uploadFilePath;
    }
}
