package com.project.mainproject.helper.user;

import com.project.mainproject.helper.ControllerTestHelper;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
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
    default List<FieldDescriptor> getDefaultUserPatchRequestDescriptors() {

        return List.of(
                fieldWithPath("name").type(JsonFieldType.STRING).description("닉네임").optional(),
                fieldWithPath("address").type(JsonFieldType.STRING).description("주소").optional(),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호").optional() // 필수?
        );
    }
    default List<FieldDescriptor> getDefaultUserFindPasswordRequestDescriptors() {

        return List.of(
                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일")
        );
    }
    default List<FieldDescriptor> getDefaultNormalUserSignUpRequestDescriptors() {

        return List.of(
                fieldWithPath("name").type(JsonFieldType.STRING).description("닉네임"),
                fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                fieldWithPath("address").type(JsonFieldType.STRING).description("주소"),
                fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
        );
    }
    default List<FieldDescriptor> getDefaultUserResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType, "response");
        return List.of(
                fieldWithPath(parentPath.concat("userIdx")).type(JsonFieldType.NUMBER).description("회원 식별자"),
                fieldWithPath(parentPath.concat("email")).type(JsonFieldType.STRING).description("이메일"),
                fieldWithPath(parentPath.concat("name")).type(JsonFieldType.STRING).description("닉네임"),
                fieldWithPath(parentPath.concat("createdAt")).type(JsonFieldType.STRING).description("가입일자"),
                fieldWithPath(parentPath.concat("address")).type(JsonFieldType.STRING).description("주소")
        );
    }
    default List<FieldDescriptor> getDefaultUsersResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType, "response.users");
        return List.of(
                fieldWithPath(parentPath.concat("userIdx")).type(JsonFieldType.NUMBER).description("회원 식별자"),
                fieldWithPath(parentPath.concat("userType")).type(JsonFieldType.STRING).description("회원 유형"),
                fieldWithPath(parentPath.concat("name")).type(JsonFieldType.STRING).description("닉네임"),
                fieldWithPath(parentPath.concat("email")).type(JsonFieldType.STRING).description("이메일"),
                fieldWithPath(parentPath.concat("createdAt")).type(JsonFieldType.STRING).description("가입일자"),
                fieldWithPath(parentPath.concat("reviewCnt")).type(JsonFieldType.NUMBER).description("남긴 리뷰 수"),
                fieldWithPath(parentPath.concat("reportCnt")).type(JsonFieldType.NUMBER).description("받은 신고 수"),
                fieldWithPath(parentPath.concat("userStatus")).type(JsonFieldType.STRING).description("회원 상태"),
                fieldWithPath(parentPath.concat("recoverAt")).type(JsonFieldType.STRING).description("계정 복구 일자")
        );
    }
    default List<FieldDescriptor> getDefaultUserReviewsResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType, "response.reviews");
        return List.of(
                fieldWithPath(parentPath.concat("reviewIdx")).type(JsonFieldType.NUMBER).description("리뷰 식별자"),
                fieldWithPath(parentPath.concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별자"),
                fieldWithPath(parentPath.concat("storeName")).type(JsonFieldType.STRING).description("약국명"),
                fieldWithPath(parentPath.concat("content")).type(JsonFieldType.STRING).description("리뷰 내용"),
                fieldWithPath(parentPath.concat("rating")).type(JsonFieldType.NUMBER).description("별점")
        );
    }
    default List<FieldDescriptor> getDefaultUserStoresResponseDescriptors(DataResponseType dataResponseType) {
        String parentPath = getDataParentPath(dataResponseType, "response.stores");
        return List.of(
                fieldWithPath(parentPath.concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별자"),
                fieldWithPath(parentPath.concat("storeName")).type(JsonFieldType.STRING).description("약국명"),
                fieldWithPath(parentPath.concat("address")).type(JsonFieldType.STRING).description("약국 주소"),
                fieldWithPath(parentPath.concat("tel")).type(JsonFieldType.STRING).description("약국 전화번호")
        );
    }


}
