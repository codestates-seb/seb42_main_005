package com.project.mainproject.user.controller;

import com.project.mainproject.helper.user.AdminControllerTestHelper;
import com.project.mainproject.user.dto.AdminUsersDto;
import com.project.mainproject.user.dummy.AdminStub;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.ArrayList;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class AdminControllerTest implements AdminControllerTestHelper {
    @Autowired
    MockMvc mockMvc;

    @Test
    void approvalPharmacyTest() throws Exception {
        //given
        AdminUsersDto post = AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        //when
        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/access/success", content));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document(
                        "approval-pharmacy",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        responseFields(
                                getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                        )
                ));
    }

    @Test
    void rejectPharmacyTest() throws Exception {
        //given
        AdminUsersDto post = AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        //when
        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/access/failure", content));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "reject-pharmacy",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        responseFields(
                                getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                        )
                ));
    }

    @Test
    void blockUsersTest() throws Exception {
        //given
        AdminUsersDto post = AdminStub.getAdminUsers();
        String content = toJsonContent(post);

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("period","3");

        //when
        ResultActions actions = mockMvc.perform(postParamRequestBuilder("/api/admin/block", content, queryParams));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document(
                        "block-users",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        responseFields(
                                getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                        )
                ));
    }

    @Test
    void banishUsersTest() throws Exception {
        //given
        AdminUsersDto post = AdminStub.getAdminUsers();
        String content = toJsonContent(post);
        //when
        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/fired", content));

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(print())
                .andDo(document(
                        "block-users",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultUserListDescriptors()),
                        responseFields(
                                getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                        )
                ));
    }
}
