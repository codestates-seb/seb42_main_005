package com.project.mainproject.user.controller;

import com.jayway.jsonpath.JsonPath;
import com.project.mainproject.helper.user.UserControllerTestHelper;
import com.project.mainproject.user.dto.UserFindPasswordDto;
import com.project.mainproject.user.dto.UserInfoDto;
import com.project.mainproject.user.dto.UserPatchDto;
import com.project.mainproject.user.dto.UserSignUpDto;
import com.project.mainproject.user.dummy.UserStub;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
class UserControllerTest implements UserControllerTestHelper {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void normalSignUp() throws Exception {
        // given
        UserSignUpDto requestBody = (UserSignUpDto) UserStub.getRequestBody("postUser");
        String content = toJsonContent(requestBody);

        // when
        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrl().concat("/normal"), content));

        // then
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/users/")))) // 일단
                .andDo(
                        document("post-normal-user",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                responseFields(
                                        getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                                ),
                                requestFields(getDefaultNormalUserSignUpRequestDescriptors()),
                                responseHeaders(
                                        headerWithName(HttpHeaders.LOCATION)
                                                .description("Location header. 등록된 리소스의 URI")
                                )
                        ));
    }

    @Test
    void pharmacySignUp() throws Exception {
        UserSignUpDto requestBody = (UserSignUpDto) UserStub.getRequestBody("postUser");
        String content = toJsonContent(requestBody);

        ResultActions actions = mockMvc.perform(postRequestBuilder(getUrl().concat("/store"), content));

        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("Location", is(startsWith("/api/users/")))) // 일단
                .andDo(
                        document("post-store-user",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                responseFields(
                                        getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                                ),
//                                requestParts(List.of(
//                                        partWithName("businessCertificate").description("사업자 등록증 이미지 파일"),
//                                        partWithName("pharmacistCertificate").description("약사면허 이미지 파일"))
//                                ),
                                responseHeaders(
                                        headerWithName(HttpHeaders.LOCATION)
                                                .description("Location header. 등록된 리소스의 URI")
                                )
                        ));
    }

    @Test
    void findPassword() throws Exception {
        long userIdx = 1L;
        UserFindPasswordDto requestBody = (UserFindPasswordDto) UserStub.getRequestBody("findPassword");
        String content = toJsonContent(requestBody);

        ResultActions actions = mockMvc.perform(
                patchRequestBuilder(getUrl().concat("/password/{userIdx}"), userIdx, content)
        );

        actions
                .andExpect(status().isOk())
                .andDo(
                        document("find-password",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(getMemberRequestPathParameterDescriptor()),
                                requestFields(getDefaultUserFindPasswordRequestDescriptors()),
                                responseFields(
                                        getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                                )
                        ));
    }

    @Test
    public void getUserTest() throws Exception {
        long userIdx = 1L;
        UserInfoDto response = UserStub.getUser();

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
                                responseFields(
                                        getSingleResponseDescriptors(
                                                getDefaultUserResponseDescriptors(DataResponseType.SINGLE))
                                )
                        ));
    }

    @Test
    void getUsers() throws Exception {
        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl()));

        MvcResult result = actions
                .andExpect(status().isOk())
                .andDo(
                        document("get-users",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParameters(
                                        getDefaultRequestParameterDescriptors()
                                ),
                                responseFields(
                                        getPageResponseDescriptors(
                                                getDefaultUsersResponseDescriptors(DataResponseType.LIST))
                                )
                        ))
                .andReturn();
        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.response.users");
        assertThat(list.size(), is(10));
    }

    @Test
    void getUserReviews() throws Exception {
        long userIdx = 1L;
        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl().concat("/{userIdx}/review"), userIdx));

        MvcResult result = actions
                .andExpect(status().isOk())
                .andDo(
                        document("get-user-reviews",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(getMemberRequestPathParameterDescriptor()),
                                requestParameters(
                                        getDefaultRequestParameterDescriptors()
                                ),
                                responseFields(
                                        getPageResponseDescriptors(
                                                getDefaultUserReviewsResponseDescriptors(DataResponseType.LIST))
                                )
                        ))
                .andReturn();
        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.response.reviews");
        assertThat(list.size(), is(5));
    }

    @Test
    void getUserPickedStore() throws Exception {
        long userIdx = 1L;
        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl().concat("/{userIdx}/store"), userIdx));

        MvcResult result = actions
                .andExpect(status().isOk())
                .andDo(
                        document("get-user-stores",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(getMemberRequestPathParameterDescriptor()),
                                requestParameters(
                                        getDefaultRequestParameterDescriptors()
                                ),
                                responseFields(
                                        getPageResponseDescriptors(
                                                getDefaultUserStoresResponseDescriptors(DataResponseType.LIST))
                                )
                        ))
                .andReturn();
        List list = JsonPath.parse(result.getResponse().getContentAsString()).read("$.response.stores");
        assertThat(list.size(), is(5));
    }

    @Test
    void patchUserInfo() throws Exception {
        long userIdx = 1L;
        UserPatchDto requestBody = (UserPatchDto) UserStub.getRequestBody("patchUser");
        String content = toJsonContent(requestBody);

        ResultActions actions = mockMvc.perform(
                patchRequestBuilder(getUrl().concat("/{userIdx}"), userIdx, content)
        );

        actions
                .andExpect(status().isOk())
                .andDo(
                        document("patch-user",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(getMemberRequestPathParameterDescriptor()),
                                requestFields(
                                        getDefaultUserPatchRequestDescriptors()
                                ),
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