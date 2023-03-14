package com.project.mainproject.review.controller;

import com.project.mainproject.helper.review.ReviewAdminControllerTestHelper;
import com.project.mainproject.user.dto.BannedReviewsDto;
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
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminReviewController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class ReviewAdminControllerTest implements ReviewAdminControllerTestHelper {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getReportedReviewTest() throws Exception {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("size", "10");

        ResultActions actions = mockMvc.perform(getRequestBuilder("/api/admin/reports", queryParams));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        document(
                                "get-reported-reviews",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParameters(getDefaultRequestParameterDescriptors()),
                                responseFields(
                                        getPageResponseDescriptors(
                                                getReportedReviewPageDtoResponseDescriptors("reportedReview")
                                        )
                                )
                        ))
                .andReturn();
    }

    @Test
    void deleteReviewsTest() throws Exception {
        BannedReviewsDto delete = AdminStub.getBannedReviewsStub();
        String content = toJsonContent(delete);

        //when
        ResultActions actions = mockMvc.perform(deleteRequestBuilder("/api/admin/banned", content));

        // then
        actions
                .andExpect(status().isNoContent())
                .andDo(document(
                        "delete-banned-reviews",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultBannedReviewListDescriptors())
                ));
    }

    @Test
    void restoreReviewsTest() throws Exception {
        BannedReviewsDto post = AdminStub.getBannedReviewsStub();
        String content = toJsonContent(post);

        //when
        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/banned", content));

        // then
        actions
                .andExpect(status().isOk())
                .andDo(document(
                        "restore-banned-reviews",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        requestFields(getDefaultBannedReviewListDescriptors()),
                        responseFields(
                                getSingleResponseDescriptors(new ArrayList<FieldDescriptor>())
                        )
                ));
    }
}
