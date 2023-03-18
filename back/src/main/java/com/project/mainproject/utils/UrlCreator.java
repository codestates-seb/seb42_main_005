package com.project.mainproject.utils;

import lombok.extern.slf4j.Slf4j;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

import static java.nio.charset.StandardCharsets.UTF_8;

@Slf4j
public class UrlCreator {
    public static URL createUrl(String defaultUrl, Map<String, String> param) {
        StringBuilder urlBuilder = new StringBuilder(defaultUrl);

        for (Map.Entry<String, String> stringStringEntry : param.entrySet()) {
            urlBuilder.append(URLEncoder.encode(stringStringEntry.getKey(), UTF_8));
            urlBuilder.append("=");
            urlBuilder.append(stringStringEntry.getValue());
            urlBuilder.append("&");
        }

        urlBuilder.deleteCharAt(urlBuilder.length() - 1);
        urlBuilder.append("&_type=json");
        try {
            URL url = new URL(urlBuilder.toString());

            return url;
        } catch (MalformedURLException e) {
            log.error("MalformedURLException ",e);
            throw new RuntimeException("URL 문제 발생",e.getCause());
        }
    }
}
