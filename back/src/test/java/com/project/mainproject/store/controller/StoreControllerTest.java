package com.project.mainproject.store.controller;

import com.project.mainproject.dto.SingleResponseDto;
import com.project.mainproject.dto.UserIdxRequestDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.helper.store.StoreControllerTestHelper;
import com.project.mainproject.security.JwtHelper;
import com.project.mainproject.security.UserContext;
import com.project.mainproject.store.dto.GetStoreListRequestDto;
import com.project.mainproject.store.service.StoreGetService;
import com.project.mainproject.store.service.StoreService;
import com.project.mainproject.stub.CommonStub;
import com.project.mainproject.stub.StoreStub;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class StoreControllerTest implements StoreControllerTestHelper {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @MockBean
    private StoreGetService storeGetService;
    @MockBean
    private StoreService storeService;
    @MockBean
    private UserRepository userRepository;  //JWT토큰용
    @MockBean
    private UserService userService;

    @Test
    @DisplayName("약국 정보 리스트 조회 Test : 성공")
    @WithMockUser
    void getStoreListTest() throws Exception {
        // given
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("lat", "37.466044866479");
        queryParams.add("lng", "127.1559484017");
        queryParams.add("swLat", "37.1559484017");
        queryParams.add("swLng", "127.1559484017");
        queryParams.add("neLat", "37.1559484017");
        queryParams.add("neLng", "127.1559484017");
        queryParams.add("sortCondition","distance");
        queryParams.add("filterCondition","not");

        //응답 데이터
        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.PROCESS_COMPLETED);
        responseDto.setResponse(StoreStub.getDBStoreListStub());

        //JWT얻기 위한 정보 입력
        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));


        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);
        given(storeGetService.getStoreListDto(any(GetStoreListRequestDto.class), anyLong())).willReturn(responseDto);

        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl(), accessToken, queryParams));

        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-stores",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParameters(
                                        parameterWithName("lat").description("현재 위치 위도"),
                                        parameterWithName("lng").description("현재 위치 경도"),
                                        parameterWithName("swLat").description("화면에 보이는 위도 (SW 방향)"),
                                        parameterWithName("swLng").description("화면에 보이는 경도 (SW방향)"),
                                        parameterWithName("neLat").description("화면에 보이는 위도 (NE 방향)"),
                                        parameterWithName("neLng").description("화면에 보이는 경도 (NE 방향)"),
                                        parameterWithName("distance").description("반경 범위 KM").optional(),
                                        parameterWithName("sortCondition").description("정렬 조건 ,  \n조건 : distance, rating, pickedStore, reviewCount"),
                                        parameterWithName("filterCondition").description("정렬 조건 , \n조건: not(거리차이에 따라 정렬), operating(영업시간), nightOperation(야간 영업 중)")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
                                ),
                                PayloadDocumentation.responseFields(
                                                        fieldWithPath("response").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                                        fieldWithPath("response[].storeIdx").type(JsonFieldType.NUMBER).description("약국 식별자 ID"),
                                                        fieldWithPath("response[].name").type(JsonFieldType.STRING).description("약국 이름"),
                                                        fieldWithPath("response[].address").type(JsonFieldType.STRING).description("약국 주소"),
                                                        fieldWithPath("response[].latitude").type(JsonFieldType.NUMBER).description("약국 latitude(위도)"),
                                                        fieldWithPath("response[].longitude").type(JsonFieldType.NUMBER).description("약국 longitude(경도)"),
                                                        fieldWithPath("response[].rating").type(JsonFieldType.NUMBER).description("약국 별점"),
                                                        fieldWithPath("response[].distance").type(JsonFieldType.NUMBER).description("약국 거리 차이"),
                                                        fieldWithPath("response[].pickedStoreCount").type(JsonFieldType.NUMBER).description("찜 된 약국"),
                                                        fieldWithPath("response[].reviewCount").type(JsonFieldType.NUMBER).description("리뷰 숫자"),
                                                        fieldWithPath("response[].imagePath").type(JsonFieldType.STRING).description("약국 사진"),
                                                        fieldWithPath("response[].modifiedAt").type(JsonFieldType.STRING).description("마지막 수정 날짜"),
                                                        fieldWithPath("response[].picked").type(JsonFieldType.BOOLEAN).description("사용자가 해당 약국을 찜했는지 여부"),
                                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                                        )
                        )
                )
                .andReturn();
    }

    @Test
    @DisplayName("약국 상세 조회 Test : 성공")
    @WithMockUser
    void getStoreDetailTest() throws Exception {
        Long storeIdx = 1L;

        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.PROCESS_COMPLETED);
        responseDto.setResponse(StoreStub.getStoreDetailStub());

        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);

        given(storeGetService.getStoreDetailDto(anyLong(),anyLong())).willReturn(responseDto);

        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(getRequestBuilder(getURI(),accessToken, storeIdx));

        actions
                .andExpect(status().isOk())
                .andDo(print())
//                .andExpect(jsonPath("$.httpCode").value(200))
                .andDo(
                        document(
                                "get-store",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("storeIdx").description("약국 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
                                ),
                                PayloadDocumentation.responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터"),
                                        fieldWithPath("response.storeIdx").type(JsonFieldType.NUMBER).description("약국 식별자 ID"),
                                        fieldWithPath("response.name").type(JsonFieldType.STRING).description("약국 이름"),
                                        fieldWithPath("response.address").type(JsonFieldType.STRING).description("약국 주소"),
                                        fieldWithPath("response.latitude").type(JsonFieldType.NUMBER).description("약국 latitude(위도)"),
                                        fieldWithPath("response.longitude").type(JsonFieldType.NUMBER).description("약국 longitude(경도)"),
                                        fieldWithPath("response.tel").type(JsonFieldType.STRING).description("약국 전화번호"),
                                        fieldWithPath("response.etc").type(JsonFieldType.STRING).description("비고"),
                                        fieldWithPath("response.rating").type(JsonFieldType.NUMBER).description("약국 별점"),
                                        fieldWithPath("response.pickedStoreCount").type(JsonFieldType.NUMBER).description("찜 된 약국"),
                                        fieldWithPath("response.reviewCount").type(JsonFieldType.NUMBER).description("리뷰 숫자"),
                                        fieldWithPath("response.imagePath").type(JsonFieldType.STRING).description("약국 사진"),
                                        fieldWithPath("response.todayOperatingTime").type(JsonFieldType.OBJECT).description("금일 영업 시간"),
                                        fieldWithPath("response.todayOperatingTime.operatingTime").type(JsonFieldType.OBJECT).description("영업 시간"),
                                        fieldWithPath("response.todayOperatingTime.operatingTime.startTime").type(JsonFieldType.STRING).description("영업 시작 시간"),
                                        fieldWithPath("response.todayOperatingTime.operatingTime.endTime").type(JsonFieldType.STRING).description("영업 종료 시간"),
                                        fieldWithPath("response.todayOperatingTime.operatingTime.nightOperating").type(JsonFieldType.BOOLEAN).description("야간 운영 여부 (22시 이후 영업 여부)"),
                                        fieldWithPath("response.operatingTime").type(JsonFieldType.OBJECT).description("전체 영업시간"),
                                        fieldWithPath("response.operatingTime.monday").type(JsonFieldType.OBJECT).description("월요일 영업 시간"),
                                        fieldWithPath("response.operatingTime.monday.startTime").type(JsonFieldType.STRING).description("월요일 영업 시작 시간"),
                                        fieldWithPath("response.operatingTime.monday.endTime").type(JsonFieldType.STRING).description("월요일 영업 종료 시간"),
                                        fieldWithPath("response.operatingTime.monday.nightOperating").type(JsonFieldType.BOOLEAN).description("월요일 영업 종료 시간"),
                                        fieldWithPath("response.operatingTime.tuesday").type(JsonFieldType.OBJECT).description("화요일 영업 시간"),
                                        fieldWithPath("response.operatingTime.tuesday.startTime").type(JsonFieldType.STRING).description("화요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.tuesday.endTime").type(JsonFieldType.STRING).description("화요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.tuesday.nightOperating").type(JsonFieldType.BOOLEAN).description("화요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.wednesday").type(JsonFieldType.OBJECT).description("수요일 영업 시간"),
                                        fieldWithPath("response.operatingTime.wednesday.startTime").type(JsonFieldType.STRING).description("수요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.wednesday.endTime").type(JsonFieldType.STRING).description("수요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.wednesday.nightOperating").type(JsonFieldType.BOOLEAN).description("수요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.thursday").type(JsonFieldType.OBJECT).description("목요일 영업 시간"),
                                        fieldWithPath("response.operatingTime.thursday.startTime").type(JsonFieldType.STRING).description("목요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.thursday.endTime").type(JsonFieldType.STRING).description("목요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.thursday.nightOperating").type(JsonFieldType.BOOLEAN).description("목요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.tuesday.nightOperating").type(JsonFieldType.BOOLEAN).description("화요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.friday").type(JsonFieldType.OBJECT).description("금요일 영업 시간"),
                                        fieldWithPath("response.operatingTime.friday.startTime").type(JsonFieldType.STRING).description("금요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.friday.endTime").type(JsonFieldType.STRING).description("금요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.friday.nightOperating").type(JsonFieldType.BOOLEAN).description("금요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.tuesday.nightOperating").type(JsonFieldType.BOOLEAN).description("화요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.saturday").type(JsonFieldType.OBJECT).description("토요일 영업 시간"),
                                        fieldWithPath("response.operatingTime.saturday.startTime").type(JsonFieldType.STRING).description("토요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.saturday.endTime").type(JsonFieldType.STRING).description("토요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.saturday.nightOperating").type(JsonFieldType.BOOLEAN).description("토요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.tuesday.nightOperating").type(JsonFieldType.BOOLEAN).description("화요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.sunday").type(JsonFieldType.OBJECT).description("일요일 영업 시간"),
                                        fieldWithPath("response.operatingTime.sunday.startTime").type(JsonFieldType.STRING).description("일요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.sunday.endTime").type(JsonFieldType.STRING).description("일요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.sunday.nightOperating").type(JsonFieldType.BOOLEAN).description("일요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.tuesday.nightOperating").type(JsonFieldType.BOOLEAN).description("화요일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.holiday").type(JsonFieldType.OBJECT).description("공휴일 영업 시간"),
                                        fieldWithPath("response.operatingTime.holiday.startTime").type(JsonFieldType.STRING).description("공휴일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.holiday.endTime").type(JsonFieldType.STRING).description("공휴일 야간 운영 여부"),
                                        fieldWithPath("response.operatingTime.holiday.nightOperating").type(JsonFieldType.BOOLEAN).description("공휴일 야간 운영 여부"),
                                        fieldWithPath("response.isOperating").type(JsonFieldType.BOOLEAN).description("영업 중인가"),
                                        fieldWithPath("response.isOperatingNight").type(JsonFieldType.BOOLEAN).description("야간 영업 여부"),
                                        fieldWithPath("response.createdAt").type(JsonFieldType.STRING).description("약국 정보 등록 시간"),
                                        fieldWithPath("response.modifiedAt").type(JsonFieldType.STRING).description("약국 정보 수정 시간"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                                        )
                        )
                )
                .andReturn();
    }

    @Test
    @DisplayName("찜한 약국 리스트 : 성공")
    void pickedStoreListTest() throws Exception {
        Long storeIdx = 1L;

        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.PROCESS_COMPLETED);
        responseDto.setResponse(StoreStub.getDBPickedStoredListStub());

        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));

        //JWT토큰 발행을 위한 Mocking
        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);

        //실제 서비스 로직 Mocking
        given(storeGetService.getPickedStoreList(anyLong())).willReturn(responseDto);

        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(getRequestBuilder(this.getPickListURI(), accessToken, storeIdx));

        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-pickedStore",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("storeIdx").description("약국 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰")
                                )
                        )
                )
                .andReturn();
    }

    @Test
    @DisplayName("찜하기 테스트 찜 성공 시: 성공")
    void pickedStoreTest() throws Exception{
        Long storeIdx = 1L;

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("userIdx", "1");


        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.PROCESS_COMPLETED);

        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);
        given(storeService.pickStore(anyLong(),anyLong())).willReturn(responseDto);

        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(postRequestBuilder(getPickPostURI(),accessToken, storeIdx,queryParams));

        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "post-pickedStore- 찜하기 등록",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("storeIdx").description("약국 식별자 ID")
                                ),
                                requestParameters(
                                        parameterWithName("userIdx").description("사용자 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰")
                                ),
                                PayloadDocumentation.responseFields(
                                        fieldWithPath("response").type(JsonFieldType.NULL).description("응답 데이터").optional(),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성").optional(),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지").optional()
                                )

                        )
                )
                .andReturn();
    }
    @Test
    @DisplayName("찜하기 테스트 찜 취소 시: 성공")
    void pickedStoreTest2() throws Exception{
        Long storeIdx = 1L;

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("userIdx", "1");


        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.DELETE_COMPLETED);

        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);
//        doNothing().when(storeService).pickStore(anyLong(), anyLong());
        given(storeService.pickStore(anyLong(),anyLong())).willReturn(responseDto);


        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(postRequestBuilder(getPickPostURI(),accessToken, storeIdx,queryParams));

        actions
                .andDo(print())
                .andExpect(status().isNoContent())
                .andDo(
                        document(
                                "post-pickedStore- 찜하기 등록",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("storeIdx").description("약국 식별자 ID")
                                ),
                                requestParameters(
                                        parameterWithName("userIdx").description("사용자 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰")
                                )
                        )
                )
                .andReturn();
    }

    @Test
    @DisplayName("약국 검색 테스트 : 성공")
    void searchStoreTest() throws Exception {
        Long storeIdx = 1L;

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("userIdx", "1");


        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.PROCESS_COMPLETED);

        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);
        given(storeService.pickStore(anyLong(),anyLong())).willReturn(responseDto);

        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(postRequestBuilder(getPickPostURI(),accessToken, storeIdx,queryParams));

        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "post-pickedStore- 찜하기 등록",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("storeIdx").description("약국 식별자 ID")
                                ),
                                requestParameters(
                                        parameterWithName("userIdx").description("사용자 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰")
                                ),
                                PayloadDocumentation.responseFields(
                                        fieldWithPath("response").type(JsonFieldType.NULL).description("응답 데이터").optional(),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성").optional(),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지").optional()
                                )

                        )
                )
                .andReturn();
    }
    @Test
    @DisplayName("약국 사진 업로드 테스트 : 성공")
    void updateImageTest() throws Exception {
        Long storeIdx = 1L;

        String userIdx = toJsonContent(new UserIdxRequestDto(1L));
        MockMultipartFile content = new MockMultipartFile("userIdx", "", "application/json", userIdx.getBytes());

        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.PROCESS_COMPLETED);
        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);

        //사진 업로드를 위한 것
        given(storeService.updateImage(anyLong(),any(MultipartFile.class))).willReturn(responseDto);

        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(multipart("/api/store/image")
                .file("profileImage","storeImage".getBytes())
                .file(content)
                .header("Authorization", "Bearer " + accessToken)
                .characterEncoding("UTF-8")
        );


        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "post-storeImageUpload",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParts(
                                        partWithName("profileImage").description("변경할 프로필 이미지"),
                                        partWithName("userIdx").description("사용자 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰")
                                ),
                                PayloadDocumentation.responseFields(
                                        fieldWithPath("response").type(JsonFieldType.NULL).description("응답 데이터").optional(),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성").optional(),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지").optional()
                                ),
                                responseHeaders(
                                        headerWithName("Location").description("변경 사항 확인 가능한 URL")
                                )

                        )
                )
                .andReturn();
    }
}