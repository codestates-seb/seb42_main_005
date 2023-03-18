package com.project.mainproject.data.service;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import com.project.mainproject.data.dto.StoreDataDto;
import com.project.mainproject.data.utils.JsonConverter;
import com.project.mainproject.data.vo.RequestInfoVo;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.store.mapper.StoreMapper;
import com.project.mainproject.store.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;
@Service
public class DataService {
    public static final String SERVICE_URL = "http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService";
    private final StoreMapper mapper;
    private final StoreRepository storeRepository;
    @Value("${data-api.service-key}")
    private String SERVICE_KEY;

    public DataService(StoreMapper mapper, StoreRepository storeRepository) {
        this.mapper = mapper;
        this.storeRepository = storeRepository;
    }

    public void getInfoData(RequestInfoVo paramVo) {
        try {

            StringBuilder uriBuilder = new StringBuilder(SERVICE_URL);
            uriBuilder.append("/getParmacyListInfoInqire")
                    .append("?serviceKey=").append(SERVICE_KEY)
                    .append("&Q0=").append(URLEncoder.encode(paramVo.getQ0(), UTF_8))
                    .append("&Q1=").append(URLEncoder.encode(paramVo.getQ1(), UTF_8))
                    .append("&QT=").append(paramVo.getQT())
                    .append("&QN=").append(URLEncoder.encode(paramVo.getQN(), UTF_8))
                    .append("&pageNo=").append(paramVo.getPageNo())
                    .append("&numOfRows=").append(paramVo.getNumOfRows())
                    .append("&_type=json");

            URL url = new URL(uriBuilder.toString());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");

            BufferedReader reader;
            if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                reader = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }
            StringBuilder resultBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                resultBuilder.append(line);
            }
            reader.close();
            conn.disconnect();

            JsonElement element = JsonParser.parseString(resultBuilder.toString());

            JsonArray item = JsonConverter.jsonElementToArray(element);
            Gson gson = new Gson();
            List<StoreDataDto> response = gson.fromJson(item.toString(), new TypeToken<List<StoreDataDto>>() {}.getType());

            insertData(response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public void insertData(List<StoreDataDto> dataDto) {
        List<Store> stores = mapper.storeDataDtoListToStores(dataDto);
        storeRepository.saveAll(stores);
    }

}
