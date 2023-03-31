//package com.project.mainproject.user.controller;
//
//import com.project.mainproject.dto.PageResponseDto;
//import com.project.mainproject.dto.UserIdxRequestDto;
//import com.project.mainproject.enums.ResultStatus;
//import com.project.mainproject.helper.user.UserControllerTestHelper;
//import com.project.mainproject.security.JwtHelper;
//import com.project.mainproject.security.UserContext;
//import com.project.mainproject.stub.CommonStub;
//import com.project.mainproject.stub.UserStub;
//import com.project.mainproject.user.dto.*;
//import com.project.mainproject.user.entity.Normal;
//import com.project.mainproject.user.entity.Pharmacy;
//import com.project.mainproject.user.entity.User;
//import com.project.mainproject.user.mapper.UserMapper;
//import com.project.mainproject.user.repository.UserRepository;
//import com.project.mainproject.user.service.UserService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.mock.web.MockMultipartFile;
//import org.springframework.restdocs.headers.HeaderDocumentation;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.restdocs.payload.PayloadDocumentation;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;
//import java.util.Optional;
//
//import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
//import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
//import static org.hamcrest.Matchers.is;
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.Mockito.doNothing;
//import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
//import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
//import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
//import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
//import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
//import static org.springframework.restdocs.request.RequestDocumentation.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//@AutoConfigureMockMvc
//class UserControllerTest implements UserControllerTestHelper {
//
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private UserMapper userMapper;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private JwtHelper jwtHelper;
//    @MockBean
//    private UserService userService;
//    @MockBean
//    private UserRepository userRepository;
//
//    private String accessToken;
//
//    @BeforeEach
//    void init() {
//        //JWT얻기 위한 정보 입력
//        String rawPassword = "passwor12qwe!@#!d";
//        String password = passwordEncoder.encode(rawPassword);
//
//        User user = new User();
//        user.setUserIdx(1L);
//        user.setPassword(password);
//        user.setName("tester");
//        user.setEmail("test@email.com");
//
//        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
//
//        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
//        given(userService.loadUserByUsername(anyString())).willReturn(userContext);
//
//        accessToken = jwtHelper.createAccessToken(user.getEmail());
//    }
//
//    @Test
//    @DisplayName("일반회원가입 : 성공")
//    void normalSignUpTest() throws Exception {
//        UserSignUpDto requestBody = (UserSignUpDto) com.project.mainproject.stub.UserStub.getRequestBody("postNormal");
//        String content = toJsonContent(requestBody);
//        Normal normal = userMapper.normalSignUpDtoToUser(requestBody);
//        normal.setUserIdx(1L);
//
//        doNothing().when(userService).saveNormal(any(Normal.class));
//
//        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrl().concat("/normal"), content));
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(header().string("Location", is("/api/users/normal")))
//                .andDo(
//                        document("post-normal-user",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestFields(getDefaultNormalUserSignUpRequestDescriptors()),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                ),
//                                HeaderDocumentation.responseHeaders(
//                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
//                                )
//                        ));
//    }
//
//    @Test
//    @DisplayName("약국회원가입 : 성공")
//    void pharmacySignUpTest() throws Exception {
//        UserSignUpDto requestBody = (UserSignUpDto) com.project.mainproject.stub.UserStub.getRequestBody("postPharmacy");
//        String jsonContent = toJsonContent(requestBody);
//        Pharmacy pharmacy = userMapper.pharmacySignUpDtoToUser(requestBody);
//
//        doNothing().when(userService).savePharmacy(any(Pharmacy.class), any(MultipartFile.class), any(MultipartFile.class));
//
//        MockMultipartFile content = new MockMultipartFile("userSignUpDto", "", "application/json", jsonContent.getBytes());
//
//        ResultActions actions = mockMvc.perform(multipart(getUrl().concat("/store"))
//                .file(content)
//                .file("businessCertificate", "businessCertificate".getBytes())
//                .file("pharmacistCertificate", "pharmacistCertificate".getBytes())
//                .header("Authorization", "Bearer " + accessToken)
//                .characterEncoding("UTF-8"));
//        actions
//                .andExpect(status().isCreated())
//                .andExpect(header().string("Location", is("/api/users/store")))
//                .andDo(
//                        document("post-store-user",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestParts(
//                                        partWithName("userSignUpDto").description("회원가입 상세정보 json형식 name, email, password, address"),
//                                        partWithName("businessCertificate").description("사업자 등록증 이미지 파일"),
//                                        partWithName("pharmacistCertificate").description("약사면허 이미지 파일")
//                                ),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                ),
//                                HeaderDocumentation.responseHeaders(
//                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
//                                )
//                        ));
//    }
//
//    @Test
//    @DisplayName("회원 정보 상세 조회 : 성공")
//    public void getUserInfoTest() throws Exception {
//        long userIdx = 1L;
//        UserInfoDto response = com.project.mainproject.stub.UserStub.getUser();
//
//        given(userService.findUser(anyLong())).willReturn(response);
//
//        ResultActions actions = mockMvc.perform(get("/api/users/{userIdx}", userIdx)
//                .accept(MediaType.APPLICATION_JSON));
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("get-user",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(getMemberRequestPathParameterDescriptor()),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                ),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터"),
//                                        fieldWithPath("response.userIdx").type(JsonFieldType.NUMBER).description("유저 식별자 ID"),
//                                        fieldWithPath("response.createdAt").type(JsonFieldType.STRING).description("가입일"),
//                                        fieldWithPath("response.name").type(JsonFieldType.STRING).description("유저닉네임/약국이름"),
//                                        fieldWithPath("response.email").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("response.address").type(JsonFieldType.STRING).description("회원주소/약국주소"),
//                                        fieldWithPath("response.imagePath").type(JsonFieldType.STRING).description("프로필이미지 경로").optional(),
//                                        fieldWithPath("response.userType").type(JsonFieldType.STRING).description("유저타입"),
//                                        fieldWithPath("response.userStatus").type(JsonFieldType.STRING).description("유저상태"),
//                                        fieldWithPath("response.reviewCount").type(JsonFieldType.NUMBER).description("작성 리뷰 수"),
//                                        fieldWithPath("response.reportCount").type(JsonFieldType.NUMBER).description("피 신고 수"),
//                                        fieldWithPath("response.bannedRestoreDate").type(JsonFieldType.STRING).description("정지 해제일").optional(),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                )
//                        ));
//    }
//
//    @Test
//    @DisplayName("전체 회원 목록 조회 : 성공")
//    void getUsersTest() throws Exception {
//        List<UserInfoDto> data = com.project.mainproject.stub.UserStub.getUsers();
//        PageResponseDto responseDto = CommonStub.getPageResponseStub(ResultStatus.PROCESS_COMPLETED);
//        responseDto.setResponse(data);
//        Page<UserInfoDto> userPage = com.project.mainproject.stub.UserStub.getPageUserInfoStub();
//
//        given(userService.findUsers(any(Pageable.class))).willReturn(userPage);
//
//        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl()));
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("get-users",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestParameters(
//                                        getDefaultRequestParameterDescriptors()
//                                ),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                ),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.ARRAY).description("응답 데이터"),
//                                        fieldWithPath("response[].userIdx").type(JsonFieldType.NUMBER).description("유저 식별자 ID"),
//                                        fieldWithPath("response[].createdAt").type(JsonFieldType.STRING).description("가입일"),
//                                        fieldWithPath("response[].name").type(JsonFieldType.STRING).description("유저닉네임/약국이름"),
//                                        fieldWithPath("response[].email").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("response[].address").type(JsonFieldType.STRING).description("회원주소/약국주소"),
//                                        fieldWithPath("response[].imagePath").type(JsonFieldType.STRING).description("프로필이미지 경로").optional(),
//                                        fieldWithPath("response[].userType").type(JsonFieldType.STRING).description("유저타입"),
//                                        fieldWithPath("response[].userStatus").type(JsonFieldType.STRING).description("유저상태"),
//                                        fieldWithPath("response[].reviewCount").type(JsonFieldType.NUMBER).description("작성 리뷰 수"),
//                                        fieldWithPath("response[].reportCount").type(JsonFieldType.NUMBER).description("피 신고 수"),
//                                        fieldWithPath("response[].bannedRestoreDate").type(JsonFieldType.STRING).description("정지 해제일").optional(),
//                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
//                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("한 페이지당 데이터 수"),
//                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 \n 첫 페이지는 0"),
//                                        fieldWithPath("pageInfo.totalElement").type(JsonFieldType.NUMBER).description("전체 데이터 수"),
//                                        fieldWithPath("pageInfo.totalPage").type(JsonFieldType.NUMBER).description("전체 페이지 수"),
//                                        fieldWithPath("pageInfo.isFirst").type(JsonFieldType.BOOLEAN).description("첫번째 페이지 인지 여부"),
//                                        fieldWithPath("pageInfo.isFinish").type(JsonFieldType.BOOLEAN).description("마지막 페이지 인지 여부"),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                )
//                        ))
//                .andReturn();
//    }
//
//    @Test
//    @DisplayName("약사 가입신청 조회 : 성공")
//    void getStoreRequestTest() throws Exception {
//        List<PharmacyInfoDto> data = com.project.mainproject.stub.UserStub.getPharmacyRequests();
//        PageResponseDto responseDto = CommonStub.getPageResponseStub(ResultStatus.PROCESS_COMPLETED);
//        responseDto.setResponse(data);
//        Page<PharmacyInfoDto> requestPage = com.project.mainproject.stub.UserStub.getPagePharmacyInfoStub();
//
//        given(userService.findPharmacyRequest(any(Pageable.class))).willReturn(requestPage);
//
//        ResultActions actions = mockMvc.perform(getRequestBuilder("/api/users/store"));
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("get-store-requests",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestParameters(
//                                        getDefaultRequestParameterDescriptors()
//                                ),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                ),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.ARRAY).description("응답 데이터"),
//                                        fieldWithPath("response[].userIdx").type(JsonFieldType.NUMBER).description("유저 식별자 ID"),
//                                        fieldWithPath("response[].storeIdx").type(JsonFieldType.NUMBER).description("약국 식별자 ID"),
//                                        fieldWithPath("response[].createdAt").type(JsonFieldType.STRING).description("가입일"),
//                                        fieldWithPath("response[].name").type(JsonFieldType.STRING).description("약국이름"),
//                                        fieldWithPath("response[].email").type(JsonFieldType.STRING).description("이메일"),
//                                        fieldWithPath("response[].address").type(JsonFieldType.STRING).description("약국주소"),
//                                        fieldWithPath("response[].businessCertificate").type(JsonFieldType.STRING).description("사업자등록증 이미지 경로").optional(),
//                                        fieldWithPath("response[].pharmacistCertificate").type(JsonFieldType.STRING).description("약사면허증 이미지 경로").optional(),
//                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
//                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("한 페이지당 데이터 수"),
//                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 \n 첫 페이지는 0"),
//                                        fieldWithPath("pageInfo.totalElement").type(JsonFieldType.NUMBER).description("전체 데이터 수"),
//                                        fieldWithPath("pageInfo.totalPage").type(JsonFieldType.NUMBER).description("전체 페이지 수"),
//                                        fieldWithPath("pageInfo.isFirst").type(JsonFieldType.BOOLEAN).description("첫번째 페이지 인지 여부"),
//                                        fieldWithPath("pageInfo.isFinish").type(JsonFieldType.BOOLEAN).description("마지막 페이지 인지 여부"),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                )
//                        ))
//                .andReturn();
//    }
//    @Test
//    @DisplayName("비밀번호 찾기 : ")
//    void findPasswordTest() throws Exception {
//        long userIdx = 1L;
//        UserFindPasswordDto requestBody = (UserFindPasswordDto) UserStub.getRequestBody("findPassword");
//        String content = toJsonContent(requestBody);
//
//        ResultActions actions = mockMvc.perform(
//                patchRequestBuilder(getUrl().concat("/password"), userIdx, content)
//        );
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("find-password",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestFields(getDefaultUserFindPasswordRequestDescriptors()),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                )
//                        ));
//    }
//
//    @Test
//    @DisplayName("회원 정보 수정 : 성공")
//    void patchUserInfoTest() throws Exception {
//        long userIdx = 1L;
//        UserPatchDto requestBody = (UserPatchDto) UserStub.getRequestBody("patchUser");
//        String content = toJsonContent(requestBody);
//
//        doNothing().when(userService).patchUser(anyLong(), any(UserPatchDto.class));
//
//        ResultActions actions = mockMvc.perform(
//                patchRequestBuilder(getUrl().concat("/{userIdx}"), userIdx, content, accessToken)
//        );
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("patch-user",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(getMemberRequestPathParameterDescriptor()),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                ),
//                                requestFields(
//                                        getDefaultUserPatchRequestDescriptors()
//                                ),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                )
//                        ));
//    }
//
//    @Test
//    @DisplayName("유저프로필이미지 변경 : 성공")
//    void postUserProfileImageTest() throws Exception {
//        String userIdx = toJsonContent(new UserIdxRequestDto(1L));
//        MockMultipartFile content =
//                new MockMultipartFile("userIdx", "", "application/json", userIdx.getBytes());
//
//        doNothing().when(userService).patchUserProfile(anyLong(), any(MultipartFile.class));
//
//        ResultActions actions = mockMvc.perform(multipart(getUrl().concat("/image"), userIdx)
//                                        .file("profileImage", "profileImage".getBytes())
//                                        .file(content)
//                                        .header("Authorization", "Bearer " + accessToken)
//                                        .characterEncoding("UTF-8"));
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("patch-user-image",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                ),
//                                requestParts(
//                                        partWithName("userIdx").description("사용자 식별자 ID"),
//                                        partWithName("profileImage").description("프로필 이미지 파일")),
//                                PayloadDocumentation.responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                )
//                        ));
//    }
//
//    @Test
//    @DisplayName("회원탈퇴 : 성공")
//    void deleteUserTest() throws Exception {
//        long userIdx = 1L;
//
//        doNothing().when(userService).deleteUser(anyLong());
//
//        ResultActions actions = mockMvc.perform(deleteRequestBuilder(getUrl().concat("/{userIdx}"), userIdx));
//
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(
//                        document("delete-user",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(getMemberRequestPathParameterDescriptor()),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                )
//                        ));
//    }
//}