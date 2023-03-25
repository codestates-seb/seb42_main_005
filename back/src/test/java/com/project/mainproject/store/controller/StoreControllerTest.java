package com.project.mainproject.store.controller;

import com.project.mainproject.dto.SingleResponseDto;
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
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Optional;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
    void load() {

    }

    @Test
    @DisplayName("약국 정보 리스트 조회 성공")
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
        String rawPassword = "password";
        String password = passwordEncoder.encode(rawPassword);
        User user = new User();
        SingleResponseDto responseDto = CommonStub.getSingleResponseStub(ResultStatus.PROCESS_COMPLETED);
        responseDto.setResponse(StoreStub.getDBStoreListStub());
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));


        BDDMockito.given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        BDDMockito.given(userService.loadUserByUsername(anyString())).willReturn(userContext);
        BDDMockito.given(storeGetService.getStoreListDto(any(GetStoreListRequestDto.class), anyLong())).willReturn(responseDto);

        String accessToken = jwtHelper.createAccessToken(user.getEmail());

        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl(), accessToken, queryParams));

        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        MockMvcRestDocumentation.document(
                                "Get-StoreList",
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
                                PayloadDocumentation.responseFields(
                                                        fieldWithPath("response").type(JsonFieldType.ARRAY).description("응답 데이터"),
                                                        fieldWithPath("response[].storeIdx").type(JsonFieldType.NUMBER).description("스토어 식별자"),
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
                                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("사용자가 해당 약국을 찜했는지 여부")
                                        )
                        )
                )
                .andReturn();
    }

    @Test
    void getStoreDetailTest() throws Exception {
        Long storeIdx = 1L;
        ResultActions actions = mockMvc.perform(getRequestBuilder(getURI(), storeIdx));
        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.response.storeIdx").value(1L))
                .andExpect(jsonPath("$.response.name").value("주사랑믿음약국"))
                .andExpect(jsonPath("$.response.tel").value("010-1234-1234"))
                .andExpect(jsonPath("$.httpCode").value(200))
                .andDo(
                        MockMvcRestDocumentation.document(
                                "get-store",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStorePathParameterDescriptor()
                                ),
                                PayloadDocumentation.responseFields(
                                        getSingleResponseDescriptors(
                                                getStoreHomeResponseDescriptors("")
                                        )
                                )
                        )
                )
                .andReturn();
    }

    @Test
    void pickedStoreTest() throws Exception {
        Long storeIdx = 1L;
        ResultActions actions = mockMvc.perform(postRequestBuilder(getPickURI(), storeIdx));
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.storeIdx").value(1L))
                .andExpect(jsonPath("$.httpCode").value(200))
                .andDo(
                        MockMvcRestDocumentation.document(
                                "get-pickedStore",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStorePathParameterDescriptor()
                                ),
                                PayloadDocumentation.responseFields(
                                        getSingleResponseDescriptors(
                                                getStoreIdxDescriptors()
                                        )
                                )

                        )
                )
                .andReturn();
    }

}