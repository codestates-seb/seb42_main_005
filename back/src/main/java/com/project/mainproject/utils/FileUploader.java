package com.project.mainproject.utils;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Slf4j
public class FileUploader {

//    @Value("${upload.path}")
//    private String uploadPath;
    private final static String uploadDir = "C:/study/file/";

    public static String saveFile(MultipartFile uploadFile) {
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

}
