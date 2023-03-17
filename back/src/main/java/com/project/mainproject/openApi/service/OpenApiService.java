package com.project.mainproject.openApi.service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.project.mainproject.openApi.dto.HolidayDataDto;
import com.project.mainproject.openApi.entity.HolidayData;
import com.project.mainproject.openApi.utils.JsonConverter;
import com.project.mainproject.redis.repository.RedisRepository;
import com.project.mainproject.utils.UrlCreator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenApiService {
    private final RedisRepository redisRepository;
    private final Gson gson;
    String data;
    @Value("${data-api.service-key}")
    private String key;
    @Value("${data-api.service-url}")
    private String defaultUrl;

    public String holiday(String year, String month){
        URL url = getUrl(year, month);
        HttpURLConnection conn = null;
        try{
            conn = getURLConnection(url);
            try(BufferedReader rd = checkAndReadData(conn)) {
                log.info("Response code: " + conn.getResponseCode());

                data = getData(rd);

                List<HolidayData> response = getHolidayObject(data);
            }
        }catch(IOException e){
            log.error("API 가져오는 중 문제 발생! IOException ",e);
        }finally {
            if (conn != null) {
                conn.disconnect();
            }
        }

        return "ok";
    }


    //### 내부 동작 메서드 ###//
    private URL getUrl(String year, String month) {
        Map<String, String> param = new LinkedHashMap<>();
        param.put("serviceKey",key);
        param.put("pageNo","1");
        param.put("numOfRows","20");
        param.put("solYear", year);
        param.put("solMonth", month);

        URL url = UrlCreator.createUrl(defaultUrl, param);
        return url;
    }

    private List<HolidayData> getHolidayObject(String data) {
        JsonElement element = JsonParser.parseString(data);
        JsonArray item = JsonConverter.jsonElementToArray(element);
        List<HolidayDataDto> holidayDataDtos = gson.fromJson(item.toString(), new TypeToken<List<HolidayDataDto>>() {}.getType());
        log.info("holidayDataDto = {}",holidayDataDtos);
        List<HolidayData> response = transHolidayToHolidayDto(holidayDataDtos);
        insertData(response);
        return response;
    }

    private String getData(BufferedReader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    }

    private BufferedReader checkAndReadData(HttpURLConnection conn) throws IOException {
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        return rd;
    }

    /*
    * 연결에 사용하기 위한 메서드
    * */
    private HttpURLConnection getURLConnection(URL url) throws IOException {
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        return conn;
    }

    private void insertData(List<HolidayData> response) {
        Iterable<HolidayData> holidayDataDtos = redisRepository.saveAll(response);
//        holidayDataDtos.forEach(System.out::println);

        Iterable<HolidayData> all = redisRepository.findAll();
        all.forEach(System.out::println);
    }
    private List<HolidayData> transHolidayToHolidayDto(List<HolidayDataDto> holidayDataDtoList) {
        return holidayDataDtoList.stream().map(HolidayData::new).collect(Collectors.toList());
    }
}
