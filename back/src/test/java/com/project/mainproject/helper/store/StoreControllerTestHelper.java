package com.project.mainproject.helper.store;

import com.project.mainproject.helper.ControllerTestHelper;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface StoreControllerTestHelper extends ControllerTestHelper {
    String STORE_URL = "/api/store";
    String REVIEW_URL = "/review";
    String PICK_URL = "/pick";

    String RESOURCE_URI_STORE = "/{storeIdx}";
    String RESOURCE_URI_REVIEW = "/{reviewIdx}";

    default String getUrl() {
        return STORE_URL;
    }

    default String getURI() {
        return STORE_URL + RESOURCE_URI_STORE;
    }

    default String getPickURI() {
        return STORE_URL + RESOURCE_URI_STORE + PICK_URL;
    }

    default String getURITwoURI() {
        return STORE_URL + RESOURCE_URI_STORE + REVIEW_URL + RESOURCE_URI_REVIEW;
    }

    default List<ParameterDescriptor> getStorePathParameterDescriptor() {
        return Arrays.asList(parameterWithName("storeIdx").description("약 식별자 ID"));
    }

    default List<ParameterDescriptor> getStoreReviewPathParameterDescriptor() {
        return Arrays.asList(parameterWithName("storeIdx").description("약국 식별자 ID"),parameterWithName("reviewIdx").description("리뷰 식별자 ID"));
    }
    default List<FieldDescriptor> getStoreHomeResponseDescriptors(String listPath) {
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");
        if (!listPath.isEmpty()) {
            listPath = getDataParentPath(DataResponseType.LIST, listPath);
        }

        return List.of(
                fieldWithPath(parentPath.concat("storeHome")).type(JsonFieldType.ARRAY).description("약국 정보").optional(),
                fieldWithPath(parentPath.concat(listPath).concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별자 ID"),
                fieldWithPath(parentPath.concat(listPath).concat("name")).type(JsonFieldType.STRING).description("약국 이름"),
                fieldWithPath(parentPath.concat(listPath).concat("address")).type(JsonFieldType.STRING).description("약국 주소"),
                fieldWithPath(parentPath.concat(listPath).concat("longitude")).type(JsonFieldType.NUMBER).description("위도").optional(),
                fieldWithPath(parentPath.concat(listPath).concat("latitude")).type(JsonFieldType.NUMBER).description("경도").optional(),
                fieldWithPath(parentPath.concat(listPath).concat("tel")).type(JsonFieldType.STRING).description("약국 전화번호").optional(),
                fieldWithPath(parentPath.concat(listPath).concat("etc")).type(JsonFieldType.STRING).description("비고").optional(),
                fieldWithPath(parentPath.concat(listPath).concat("rating")).type(JsonFieldType.NUMBER).description("별점").optional(),
                fieldWithPath(parentPath.concat(listPath).concat("image")).type(JsonFieldType.STRING).description("사진 URL").optional(),
                fieldWithPath(parentPath.concat(listPath).concat("createdAt")).type(JsonFieldType.STRING).description("등록 날짜"),
                fieldWithPath(parentPath.concat(listPath).concat("modifiedAt")).type(JsonFieldType.STRING).description("수정 날짜"),
                fieldWithPath(parentPath.concat(listPath).concat("tags")).type(JsonFieldType.ARRAY).description("태그")
        );
    }

    default List<FieldDescriptor> getStoreIdxDescriptors() {
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");
        return List.of(
                fieldWithPath(parentPath.concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별자 ID")
        );
    }
    default List<FieldDescriptor> getStoreIdxReviewIdxDescriptors() {
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");
        return List.of(
                fieldWithPath(parentPath.concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별자 ID"),
                fieldWithPath(parentPath.concat("reviewIdx")).type(JsonFieldType.NUMBER).description("리뷰 식별자 ID")
        );
    }

}
