package com.project.mainproject.helper.review;

import com.project.mainproject.helper.ControllerTestHelper;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public interface ReviewAdminControllerTestHelper extends ControllerTestHelper {

    default List<FieldDescriptor> getDefaultBannedReviewListDescriptors() {

        return List.of(
                fieldWithPath("reviews").type(JsonFieldType.ARRAY).description("신고당한 리뷰 목록")
                , fieldWithPath("reviews[].reviewIdx").type(JsonFieldType.NUMBER).description("리뷰인덱스")
        );
    }
    default List<FieldDescriptor> getReportedReviewPageDtoResponseDescriptors(String listPath) {
        List<FieldDescriptor> result = new ArrayList<>();
        String parentPath = getDataParentPath(DataResponseType.SINGLE,"response");
        if (!listPath.isEmpty()) {
            listPath = getDataParentPath(DataResponseType.LIST, listPath);
            result.add(fieldWithPath(parentPath.concat(listPath)).type(JsonFieldType.ARRAY).description("리뷰"));
        }

        result.add(fieldWithPath(parentPath.concat(listPath).concat("reviewIdx")).type(JsonFieldType.NUMBER).description("리뷰 식별 ID"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("reviewContent")).type(JsonFieldType.STRING).description("리뷰 본문"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("reportedCount")).type(JsonFieldType.NUMBER).description("신고 수"));
        result.add(fieldWithPath(parentPath.concat(listPath).concat("reviewCreatedAt")).type(JsonFieldType.STRING).description("리뷰 작성 일자"));

        return result;
    }
}
