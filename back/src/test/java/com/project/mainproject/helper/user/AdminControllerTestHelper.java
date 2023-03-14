package com.project.mainproject.helper.user;

import com.project.mainproject.helper.ControllerTestHelper;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public interface AdminControllerTestHelper extends ControllerTestHelper {
    String ADMIN_URL = "/api/admin";

    default List<FieldDescriptor> getDefaultUserListDescriptors() {

        return List.of(
                fieldWithPath("users").type(JsonFieldType.ARRAY).description("유저목록")
                , fieldWithPath("users[].userIdx").type(JsonFieldType.NUMBER).description("유저인덱스")
        );
    }

    default RequestBuilder postParamRequestBuilder(String url, String content, MultiValueMap queryParams) {
        return  post(url)
                .accept(MediaType.APPLICATION_JSON)
                .params(queryParams)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }


}

