package com.project.mainproject.helper.user;

import com.project.mainproject.helper.ControllerTestHelper;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface UserControllerTestHelper extends ControllerTestHelper {

    String USER_URL = "/api/users";
    String RESOURCE_URI = "/{userIdx}";

    default String getUrl() {
        return USER_URL;
    }

    default String getURI() {
        return USER_URL + RESOURCE_URI;
    }

    default List<ParameterDescriptor> getMemberRequestPathParameterDescriptor() {
        return Arrays.asList(parameterWithName("userIdx").description("회원 식별자"));
    }

}
