package com.project.mainproject.helper.review;

import com.project.mainproject.helper.ControllerTestHelper;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface ReviewControllerTestHelper extends ControllerTestHelper {

    String STORE_URL = "/api/store";
    String REVIEW_URL = "/review";
    String API_URL = "/api";
    String USERS_URL="/users";
    String RESOURCE_URI_STORE = "/{storeIdx}";
    String RESOURCE_URI_REVIEW = "/{reviewIdx}";
    String RESOURCE_URI_USER = "/{userIdx}";

    default String getUrl() {
        return STORE_URL;
    }
    default String getMyReviewUrl() {
        return API_URL + USERS_URL+ RESOURCE_URI_USER;
    }
    default String getURI() {
        return STORE_URL + RESOURCE_URI_STORE;
    }
    default String getOneURI() {
        return STORE_URL + RESOURCE_URI_STORE + REVIEW_URL;
    }
    default String getTowPathParam() {
        return STORE_URL + RESOURCE_URI_STORE + REVIEW_URL + RESOURCE_URI_REVIEW;
    }
    default String getTowPathParam(String url) {
        return STORE_URL + RESOURCE_URI_STORE + REVIEW_URL + RESOURCE_URI_REVIEW + "/" + url;
    }
    default List<ParameterDescriptor> getStorePathParameterDescriptor() {

        return Arrays.asList(parameterWithName("storeIdx").description("약국 식별자 ID"));
    }

    default List<ParameterDescriptor> getStoreReviewPathParameterDescriptor() {

        return Arrays.asList(parameterWithName("storeIdx").description("약국 식별자 ID"),
                parameterWithName("reviewIdx").description("리뷰 식별자 ID"));
    }
    default List<ParameterDescriptor> getUserPathParameterDescriptor() {

        return Arrays.asList(parameterWithName("userIdx").description("사용자 식별자 ID"));
    }

    /*
    * getStoreReview
    * getStoreReviewDetail
    * */
    default List<FieldDescriptor> getStoreReviewPageDtoResponseDescriptors(String listPath) {
        List<FieldDescriptor> result = new ArrayList<>();
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");
        if (!listPath.isEmpty()) {
            listPath = getDataParentPath(DataResponseType.LIST, listPath);
            result.add(fieldWithPath(parentPath.concat(listPath)).type(JsonFieldType.ARRAY).description("약국 리뷰 정보"));
        }

        result.add(fieldWithPath(parentPath.concat(listPath).concat("reviewIdx")).type(JsonFieldType.NUMBER).description("리뷰 식별 ID"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("rating")).type(JsonFieldType.NUMBER).description("별점"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("content")).type(JsonFieldType.STRING).description("리뷰 본문"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("reviewImage")).type(JsonFieldType.STRING).description("리뷰 본문"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("tags")).type(JsonFieldType.ARRAY).description("태그 정보"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("createdAt")).type(JsonFieldType.STRING).description("리뷰 작성 일자"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("modifiedAt")).type(JsonFieldType.STRING).description("리뷰 수정 일자"));

        return result;
    }

    /*
     * createReview request
     * */
    default List<FieldDescriptor> getCreateReviewRequestDescriptors() {

        return List.of(
                fieldWithPath("userIdx").type(JsonFieldType.NUMBER).description("사용자 식별 ID"),
                fieldWithPath("tags").type(JsonFieldType.ARRAY).description("태그 정보").optional(),
                fieldWithPath("tags[].tagIdx").type(JsonFieldType.NUMBER).description("태그 식별 ID").optional(),
                fieldWithPath("content").type(JsonFieldType.STRING).description("리뷰 본문"),
                fieldWithPath("image").type(JsonFieldType.STRING).description("사진 파일 임시! 이부분 사진 업로드 이후 변경 예정"),
                fieldWithPath("rating").type(JsonFieldType.NUMBER).description("별점")
        );
    }
    /*
     * updateReview request
     * */
    default List<FieldDescriptor> getUpdateReviewRequestDescriptors() {

        return List.of(
                fieldWithPath("userIdx").type(JsonFieldType.NUMBER).description("사용자 식별 ID"),
                fieldWithPath("storeIdx").type(JsonFieldType.NUMBER).description("사용자 식별 ID"),
                fieldWithPath("content").type(JsonFieldType.STRING).description("리뷰 본문"),
                fieldWithPath("rating").type(JsonFieldType.NUMBER).description("별점")
        );
    }

    /*
    * review like response
    * */
    default List<FieldDescriptor> getReviewLikeHateRequestDescriptors(ReviewHateLike reviewHateLike) {
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");

        return List.of(
                fieldWithPath(parentPath.concat("userIdx")).type(JsonFieldType.NUMBER).description("사용자 식별 ID"),
                fieldWithPath(parentPath.concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별 ID"),
                fieldWithPath(parentPath.concat("reviewIdx")).type(JsonFieldType.NUMBER).description("리뷰 식별 ID"),
                fieldWithPath(parentPath.concat(reviewHateLike.name)).type(JsonFieldType.BOOLEAN).description(reviewHateLike.Description)
        );
    }
    /*
    * 리뷰 신고 Post response
    * */
    default List<FieldDescriptor> getPostReviewReportResponseDescriptors() {
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");
        return List.of(
                fieldWithPath(parentPath.concat("userIdx")).type(JsonFieldType.NUMBER).description("사용자 식별 ID"),
                fieldWithPath(parentPath.concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별 ID").optional(),
                fieldWithPath(parentPath.concat("reviewIdx")).type(JsonFieldType.NUMBER).description("리뷰 식별 ID").optional(),
                fieldWithPath(parentPath.concat("content")).type(JsonFieldType.STRING).description("리뷰 본문").optional(),
                fieldWithPath(parentPath.concat("image")).type(JsonFieldType.STRING).description("리뷰 사진").optional(),
                fieldWithPath(parentPath.concat("reportCreatedAt")).type(JsonFieldType.STRING).description("신고 날짜").optional()
        );
    }

    /*
    * 리뷰 신고 request
    * */
    default List<FieldDescriptor> getPostReviewReportRequestDescriptors() {

        return List.of(
                fieldWithPath("userIdx").type(JsonFieldType.NUMBER).description("사용자 식별 ID"),
                fieldWithPath("content").type(JsonFieldType.STRING).description("리뷰 본문").optional()
        );
    }

    default List<FieldDescriptor> getAllIdxDescriptors() {
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");
        return List.of(
                fieldWithPath(parentPath.concat("storeIdx")).type(JsonFieldType.NUMBER).description("약국 식별자 ID"),
                fieldWithPath(parentPath.concat("reviewIdx")).type(JsonFieldType.NUMBER).description("리뷰 식별자 ID"),
                fieldWithPath(parentPath.concat("userIdx")).type(JsonFieldType.NUMBER).description("사용자 식별자 ID")
        );
    }

    enum ReviewHateLike{

        HATE("hate","싫어요"),LIKE("like","좋아요");
        private String name;
        private String Description;

        public String getName() {
            return name;
        }

        public String getDescription() {
            return Description;
        }

        ReviewHateLike(String name, String description) {
            this.name = name;
            Description = description;
        }
    }
}
