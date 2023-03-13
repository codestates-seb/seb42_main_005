package com.project.mainproject.review.controller;

import com.project.mainproject.dto.UserIdxRequestDto;
import com.project.mainproject.helper.review.ReviewControllerTestHelper;
import com.project.mainproject.review.dto.PostCreateReviewDto;
import com.project.mainproject.review.dto.PostReportReviewPlusDto;
import com.project.mainproject.review.dto.PostUpdateReviewDto;
import com.project.mainproject.tag.dto.TagIdDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReviewController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
class ReviewControllerTest implements ReviewControllerTestHelper {
    @Autowired
    private MockMvc mockMvc;

    //@MockBean
    //의존성 주입 필요한 것들 주입

    Long userIdx = 1L;
    Long storeIdx = 1L;
    Long reviewIdx = 1L;

    @Test
    void getStoreReview() throws Exception {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("size", "10");

        ResultActions actions = mockMvc.perform(getRequestBuilder(getOneURI(),queryParams,storeIdx));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        document(
                                "get-reviews",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStorePathParameterDescriptor()
                                ),
                                requestParameters(
                                        getDefaultRequestParameterDescriptors()
                                ),
                                responseFields(
                                        getPageResponseDescriptors(
                                                getStoreReviewPageDtoResponseDescriptors("storeReview")
                                        )
                                )
                        )
                )
                .andReturn();
    }

    @Test
    void createReview() throws Exception {

        PostCreateReviewDto build = PostCreateReviewDto.builder().image("사진 파일이 들어갈 것이다.").content("리뷰 본문 약사가 맛있고 제품이 친절해요").rating(4).userIdx(userIdx).tags(List.of(new TagIdDto(1L), new TagIdDto(2L))).build();
        String content = toJsonContent(build);

        ResultActions actions = mockMvc.perform(postRequestBuilder(getOneURI(), storeIdx, content));
        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("location","/api/store/"+storeIdx +"/review"))
                .andDo(
                        document(
                                "post-review",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStorePathParameterDescriptor()
                                ),
                                requestFields(
                                        getCreateReviewRequestDescriptors()
                                ),
                                responseFields(
                                        getSingleResponseDescriptors(getAllIdxDescriptors())
                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        )
                );
    }

    @Test
    void updateReview() throws Exception {

        PostUpdateReviewDto build = PostUpdateReviewDto.builder().image("사진 파일이 들어갈 것이다.").content("리뷰 본문 약사가 맛있고 제품이 친절해요").rating(4).userIdx(userIdx).tags(List.of(new TagIdDto(1L), new TagIdDto(2L))).build();
        String content = toJsonContent(build);

        ResultActions actions = mockMvc.perform(patchRequestBuilder(getTowPathParam(), storeIdx, reviewIdx, content));
        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        document(
                                "patch-review",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStoreReviewPathParameterDescriptor()
                                ),
                                requestFields(
                                        getUpdateReviewRequestDescriptors()
                                ),
                                responseFields(
                                        getSingleResponseDescriptors(getAllIdxDescriptors())
                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        )
                );
    }

    @Test
    void deleteReview() throws Exception {

        ResultActions actions = mockMvc.perform(deleteRequestBuilder(getTowPathParam(), storeIdx, reviewIdx));

        actions
                .andExpect(status().isNoContent())
                .andDo(print())
                .andDo(document(
                        "delete-review",
                        getRequestPreProcessor(),
                        getResponsePreProcessor(),
                        pathParameters(
                                getStoreReviewPathParameterDescriptor()
                        ),
                        HeaderDocumentation.responseHeaders(
                                HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                        )
                ))
                .andReturn();
    }

    @Test
    void reviewLike() throws Exception{

        UserIdxRequestDto userIdxDto = new UserIdxRequestDto();
        userIdxDto.setUserIdx(userIdx);
        String content = toJsonContent(userIdxDto);

        ResultActions actions = mockMvc.perform(postRequestBuilder(getTowPathParam("like"), storeIdx, reviewIdx, content));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        document(
                                "review-like",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStoreReviewPathParameterDescriptor()
                                ),
                                requestFields(
                                        getDefaultWrapperDescriptors("userIdx", JsonFieldType.NUMBER,"사용자 식별 ID")
                                ),
                                responseFields(
                                        getSingleResponseDescriptors(getReviewLikeHateRequestDescriptors(ReviewHateLike.LIKE))
                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        ))
                .andReturn();

    }

    @Test
    void reviewHate() throws Exception {
        UserIdxRequestDto userIdxDto = new UserIdxRequestDto();
        userIdxDto.setUserIdx(userIdx);
        String content = toJsonContent(userIdxDto);

        ResultActions actions = mockMvc.perform(postRequestBuilder(getTowPathParam("hate"), storeIdx, reviewIdx, content));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        document(
                                "review-hate",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStoreReviewPathParameterDescriptor()
                                ),
                                requestFields(
                                        getDefaultWrapperDescriptors("userIdx", JsonFieldType.NUMBER,"사용자 식별 ID")
                                ),
                                responseFields(
                                        getSingleResponseDescriptors(getReviewLikeHateRequestDescriptors(ReviewHateLike.HATE))
                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        ))
                .andReturn();
    }

    @Test
    void reportReview() throws Exception {

        PostReportReviewPlusDto postDto = new PostReportReviewPlusDto(userIdx,"이곳은 신고 사유란입니다. 뿡뿡");
        String content = toJsonContent(postDto);

        ResultActions actions = mockMvc.perform(postRequestBuilder(getTowPathParam("report"), storeIdx, reviewIdx, content));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        document(
                                "report-review",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStoreReviewPathParameterDescriptor()
                                ),
                                requestFields(
                                        getPostReviewReportRequestDescriptors()
                                ),
                                responseFields(
                                        getSingleResponseDescriptors(getPostReviewReportResponseDescriptors())
                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        ))
                .andReturn();
    }

    @Test
    void createReviewPlus() throws Exception {

        PostReportReviewPlusDto postDto = new PostReportReviewPlusDto(userIdx,"이곳은 대댓글 본문 입니다. 뿡뿡");
            String content = toJsonContent(postDto);

            ResultActions actions = mockMvc.perform(postRequestBuilder(getTowPathParam(), storeIdx, reviewIdx, content));

            actions
                    .andExpect(status().isCreated())
                    .andDo(print())
                    .andDo(
                            document(
                                    "report-review",
                                    getRequestPreProcessor(),
                                    getResponsePreProcessor(),
                                    pathParameters(
                                            getStoreReviewPathParameterDescriptor()
                                    ),
                                    requestFields(
                                            getPostReviewReportRequestDescriptors()
                                    ),
                                    responseFields(
                                            getSingleResponseDescriptors(getAllIdxDescriptors())
                                    ),
                                    HeaderDocumentation.responseHeaders(
                                            HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                    )
                            ))
                    .andReturn();
        }
}