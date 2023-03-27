package com.project.mainproject.user.controller;

import com.project.mainproject.helper.user.UserControllerTestHelper;
import com.project.mainproject.security.JwtHelper;
import com.project.mainproject.security.UserContext;
import com.project.mainproject.user.dto.UserInfoDto;
import com.project.mainproject.user.dto.UserSignUpDto;
import com.project.mainproject.user.entity.Normal;
import com.project.mainproject.user.entity.Pharmacy;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.mapper.UserMapper;
import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class UserControllerTest implements UserControllerTestHelper {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtHelper jwtHelper;
    @MockBean
    private UserService userService;
    @MockBean
    private UserRepository userRepository;

    private String accessToken;

    @BeforeEach
    void init() {
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

        accessToken = jwtHelper.createAccessToken(user.getEmail());
    }

    @Test
    @DisplayName("일반회원가입 : 성공")
    void normalSignUp() throws Exception {
        UserSignUpDto requestBody = (UserSignUpDto) com.project.mainproject.stub.UserStub.getRequestBody("postNormal");
        String content = toJsonContent(requestBody);
        Normal normal = userMapper.normalSignUpDtoToUser(requestBody);
        normal.setUserIdx(1L);

        doNothing().when(userService).saveNormal(any(Normal.class));

        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrl().concat("/normal"), content));
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is("/api/users/normal")))
                .andDo(
                        document("post-normal-user",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestFields(getDefaultNormalUserSignUpRequestDescriptors()),
                                PayloadDocumentation.responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        ));
    }

    @Test
    @DisplayName("약국회원가입")
    void pharmacySignUp() throws Exception {
        UserSignUpDto requestBody = (UserSignUpDto) com.project.mainproject.stub.UserStub.getRequestBody("postPharmacy");
        String content = toJsonContent(requestBody);
        Pharmacy pharmacy = userMapper.pharmacySignUpDtoToUser(requestBody);
        MultipartFile businessCertificate = new MockMultipartFile("businessCertificate", new byte[]{});
        MultipartFile pharmacistCertificate = new MockMultipartFile("pharmacistCertificate", new byte[]{});

        doNothing().when(userService).savePharmacy(any(Pharmacy.class), any(MultipartFile.class), any(MultipartFile.class));

        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrl().concat("/store"), content));

        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is("/api/users/store")))
                .andDo(
                        document("post-store-user",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParts(List.of(
                                        partWithName("businessCertificate").description("사업자 등록증 이미지 파일"),
                                        partWithName("pharmacistCertificate").description("약사면허 이미지 파일"))
                                        ),
                                requestFields(getDefaultNormalUserSignUpRequestDescriptors()),
                                PayloadDocumentation.responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        ));
    }

    @Test
    @DisplayName("회원 정보 상세 조회")
    public void getUserTest() throws Exception {
        long userIdx = 1L;
        UserInfoDto response = com.project.mainproject.stub.UserStub.getUser();

        ResultActions actions = mockMvc.perform(get("/api/users/{userIdx}", userIdx)
                .accept(MediaType.APPLICATION_JSON));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.userIdx").value(userIdx))
                .andExpect(jsonPath("$.response.name").value(response.getName()))
                .andDo(
                        document("get-user",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(getMemberRequestPathParameterDescriptor()),
                                PayloadDocumentation.responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터"),
                                        fieldWithPath("response.userIdx").type(JsonFieldType.NUMBER).description("유저 식별자 ID"),
                                        fieldWithPath("response.createAt").type(JsonFieldType.STRING).description("가입일"),
                                        fieldWithPath("response.name").type(JsonFieldType.STRING).description("유저닉네임/약국이름"),
                                        fieldWithPath("response.email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("response.address").type(JsonFieldType.STRING).description("회원주소/약국주소"),
                                        fieldWithPath("response.imagePath").type(JsonFieldType.STRING).description("프로필이미지 경로"),
                                        fieldWithPath("response.userType").type(JsonFieldType.STRING).description("유저타입"),
                                        fieldWithPath("response.userStatus").type(JsonFieldType.STRING).description("유저상태"),
                                        fieldWithPath("response.reviewCount").type(JsonFieldType.NUMBER).description("작성 리뷰 수"),
                                        fieldWithPath("response.reportCount").type(JsonFieldType.NUMBER).description("피 신고 수"),
                                        fieldWithPath("response.reportCount").type(JsonFieldType.STRING).description("정지 해제일"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                                )
                        ));
    }

//    @Test
//    @DisplayName("전체 회원 목록 조회")
//    void getUsers() throws Exception {
//        List<UserInfoDto> data = com.project.mainproject.stub.UserStub.getUsers();
//        PageResponseDto responseDto = CommonStub.getPageResponseStub(ResultStatus.PROCESS_COMPLETED);
//        responseDto.setResponse(data);
//        Page<UserInfoDto> result = com.project.mainproject.stub.UserStub.getPageUserInfoStub();
//
//        given(userService.findUsers(any(Pageable.class))).willReturn(result);
//
//        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl()));
//
//        MvcResult result = actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("get-users",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestParameters(
//                                        getDefaultRequestParameterDescriptors()
//                                ),
//                                responseFields(
//                                        getPageResponseDescriptors(
//                                                getDefaultUsersResponseDescriptors(DataResponseType.LIST))
//                                )
//                        ))
//                .andReturn();
//    }
    @Test
    void findPassword() throws Exception {
//        long userIdx = 1L;
//        UserFindPasswordDto requestBody = (UserFindPasswordDto) UserStub.getRequestBody("findPassword");
//        String content = toJsonContent(requestBody);
//
//        ResultActions actions = mockMvc.perform(
//                patchRequestBuilder(getUrl().concat("/password/{userIdx}"), userIdx, content)
//        );
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("find-password",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(getMemberRequestPathParameterDescriptor()),
//                                requestFields(getDefaultUserFindPasswordRequestDescriptors()),
//                                responseFields(
//                                        getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
//                                )
//                        ));
    }




//
//    @Test
//    void patchUserInfo() throws Exception {
//        long userIdx = 1L;
//        UserPatchDto requestBody = (UserPatchDto) UserStub.getRequestBody("patchUser");
//        String content = toJsonContent(requestBody);
//        User user = userMapper.userPatchDtoToUser(requestBody);
//        given(userService.patchUser(Mockito.any(User.class));)
//
//        ResultActions actions = mockMvc.perform(
//                patchRequestBuilder(getUrl().concat("/{userIdx}"), userIdx, content)
//        );
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(
//                        document("patch-user",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(getMemberRequestPathParameterDescriptor()),
//                                requestFields(
//                                        getDefaultUserPatchRequestDescriptors()
//                                ),
//                                responseFields(
//                                        getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
//                                ),
//                                responseHeaders(
//                                        headerWithName(HttpHeaders.LOCATION)
//                                                .description("Location header. 등록된 리소스의 URI")
//                                )
//                        ));
//    }

    @Test
    void postUserProfileImage() throws Exception {
        long userIdx = 1L;
        MockMultipartFile multipartFile =
                new MockMultipartFile("profileImage", "testBusinessCert.png", "image/png", "test".getBytes(UTF_8) );

        ResultActions actions = mockMvc.perform(multipart(getUrl().concat("/{userIdx}/image"), userIdx)
                                        .file(multipartFile)
        );

        actions
                .andExpect(status().isOk())
                .andDo(
                        document("patch-user-image",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(getMemberRequestPathParameterDescriptor()),
                                requestParts(partWithName("profileImage").description("프로필 이미지 파일")),
                                responseFields(
                                        getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                                ),
                                responseHeaders(
                                        headerWithName(HttpHeaders.LOCATION)
                                                .description("Location header. 등록된 리소스의 URI")
                                )
                        ));
    }

    @Test
    void deleteUser() throws Exception {
        long userIdx = 1L;

        ResultActions actions = mockMvc.perform(deleteRequestBuilder(getUrl().concat("/{userIdx}"), userIdx));

        actions
                .andExpect(status().isNoContent())
                .andDo(
                        document("delete-user",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(getMemberRequestPathParameterDescriptor())
                        ));
    }
}