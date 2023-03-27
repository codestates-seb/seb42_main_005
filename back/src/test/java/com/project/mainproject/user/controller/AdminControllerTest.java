package com.project.mainproject.user.controller;

import com.project.mainproject.helper.user.AdminControllerTestHelper;
import com.project.mainproject.security.JwtHelper;
import com.project.mainproject.security.UserContext;
import com.project.mainproject.user.dto.AdminUsersDto;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import com.project.mainproject.user.service.admin.AdminService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Optional;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
public class AdminControllerTest implements AdminControllerTestHelper {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtHelper jwtHelper;
    private String accessToken;
    @MockBean
    private AdminService adminService;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private UserService userService;

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
    @DisplayName("약국 회원가입 승인 : 성공")
    void approvalPharmacyTest() throws Exception {
        AdminUsersDto post = com.project.mainproject.stub.AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        doNothing().when(adminService).approvalPharmacy(anyList());

        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/access/success", content));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document(
                        "approval-pharmacy",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        requestHeaders(
                                headerWithName("Authorization").description("ACCESS 토큰").optional()
                        ),
                        PayloadDocumentation.responseFields(
                                fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                        )
                ));
    }

    @Test
    @DisplayName("약국 회원가입 반려 : 성공")
    void rejectPharmacyTest() throws Exception {
        AdminUsersDto post = com.project.mainproject.stub.AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        doNothing().when(adminService).rejectPharmacy(anyList());

        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/access/failure", content));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document(
                        "reject-pharmacy",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        requestHeaders(
                                headerWithName("Authorization").description("ACCESS 토큰").optional()
                        ),
                        PayloadDocumentation.responseFields(
                                fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                        )
                ));
    }

    @Test
    @DisplayName("유저 정지 : 성공")
    void blockUsersTest() throws Exception {
        AdminUsersDto post = com.project.mainproject.stub.AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("period","3");

        doNothing().when(adminService).blockUsers(anyInt(), anyList());

        ResultActions actions = mockMvc.perform(postParamRequestBuilder("/api/admin/block", content, queryParams));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document(
                        "block-users",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        requestHeaders(
                                headerWithName("Authorization").description("ACCESS 토큰").optional()
                        ),
                        PayloadDocumentation.responseFields(
                                fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                        )
                ));
    }

    @Test
    @DisplayName("유저 차단 : 성공")
    void banishUsersTest() throws Exception {
        AdminUsersDto post = com.project.mainproject.stub.AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        doNothing().when(adminService).banishUsers(anyList());

        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/fired", content));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document(
                        "banish-users",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        requestHeaders(
                                headerWithName("Authorization").description("ACCESS 토큰").optional()
                        ),
                        PayloadDocumentation.responseFields(
                                fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                        )
                ));
    }

    @Test
    @DisplayName("정지 유저 복구 : 성공")
    void restoreUserTest() throws Exception {
        AdminUsersDto post = com.project.mainproject.stub.AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        doNothing().when(adminService).restoreUsers(anyList());

        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/restore", content));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document(
                        "restore-users",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        requestHeaders(
                                headerWithName("Authorization").description("ACCESS 토큰").optional()
                        ),
                        PayloadDocumentation.responseFields(
                                fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                        )
                ));
    }
}
