package com.project.mainproject.review.controller;

import com.project.mainproject.dto.PageResponseDto;
import com.project.mainproject.enums.ResultStatus;
import com.project.mainproject.helper.review.ReviewControllerTestHelper;
import com.project.mainproject.review.dto.ListGetStoreReviewDto;
import com.project.mainproject.review.dto.PostCreateReviewDto;
import com.project.mainproject.review.dto.PostReviewReportDto;
import com.project.mainproject.review.dto.PostUpdateReviewDto;
import com.project.mainproject.review.entity.Review;
import com.project.mainproject.review.entity.ReviewReport;
import com.project.mainproject.review.mapper.ReviewMapper;
import com.project.mainproject.review.mapper.ReviewReportMapper;
import com.project.mainproject.review.service.ReviewReportService;
import com.project.mainproject.review.service.ReviewService;
import com.project.mainproject.security.JwtHelper;
import com.project.mainproject.security.UserContext;
import com.project.mainproject.stub.CommonStub;
import com.project.mainproject.stub.ReviewStub;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class ReviewControllerTest implements ReviewControllerTestHelper {
    Long userIdx = 1L;
    Long storeIdx = 1L;
    Long reviewIdx = 1L;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @MockBean
    private ReviewMapper reviewMapper;
    @MockBean
    private ReviewService reviewService;
    @MockBean
    private UserRepository userRepository;  //JWT토큰용
    @MockBean
    private UserService userService;
    @MockBean
    private ReviewReportMapper reportMapper;
    @MockBean
    private ReviewReportService reportService;
    private String accessToken;

    @BeforeEach
    void init() {
        //JWT얻기 위한 정보 입력
        String rawPassword = "passwor12qwe!@#!d";
        String password = passwordEncoder.encode(rawPassword);

        User user = new User();
        user.setUserIdx(1L);
        user.setPassword(password);
        user.setName("tester");
        user.setEmail("test@email.com");

        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));

        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
        given(userService.loadUserByUsername(anyString())).willReturn(userContext);

        accessToken = jwtHelper.createAccessToken(user.getEmail());
    }

    @Test
    @DisplayName("약국 리뷰 가져오기 : 성공")
    void getStoreReviewTest() throws Exception {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("size", "10");

        ListGetStoreReviewDto data = ReviewStub.getStoreReviewStub();
        PageResponseDto responseDto = CommonStub.getPageResponseStub(ResultStatus.PROCESS_COMPLETED);
        responseDto.setResponse(data);
        Page<Review> serviceResult = ReviewStub.getPageReviewStub();

        given(reviewService.getReviews(anyLong(), any(Pageable.class))).willReturn(serviceResult);
        given(reviewMapper.reviewsToReviewsDto(any(List.class))).willReturn(ReviewStub.getStoreReviewListStub());


        ResultActions actions = mockMvc.perform(getRequestBuilder(getOneURI(), queryParams, storeIdx, accessToken));


        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        document(
                                "get-reviews",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("storeIdx").description("약국 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
                                ),
                                requestParameters(
                                        getDefaultRequestParameterDescriptors()
                                ),
                                responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터"),
                                        fieldWithPath("response.storeReviews").type(JsonFieldType.ARRAY).description("약국 리뷰 데이터"),
                                        fieldWithPath("response.storeReviews[].reviewIdx").type(JsonFieldType.NUMBER).description("리뷰 식별자 ID"),
                                        fieldWithPath("response.storeReviews[].content").type(JsonFieldType.STRING).description("리뷰 본문"),
                                        fieldWithPath("response.storeReviews[].rating").type(JsonFieldType.NUMBER).description("리뷰 별점"),
                                        fieldWithPath("response.storeReviews[].reviewImage").type(JsonFieldType.STRING).description("리뷰 사진"),
                                        fieldWithPath("response.storeReviews[].userIdx").type(JsonFieldType.NUMBER).description("사용자 식별자 ID"),
                                        fieldWithPath("response.storeReviews[].userName").type(JsonFieldType.STRING).description("사용자 이름"),
                                        fieldWithPath("response.storeReviews[].profileImage").type(JsonFieldType.STRING).description("사용자 프로필 사진"),
                                        fieldWithPath("response.storeReviews[].createdAt").type(JsonFieldType.STRING).description("리뷰 생성일"),
                                        fieldWithPath("response.storeReviews[].modifiedAt").type(JsonFieldType.STRING).description("리뷰 수정일"),
                                        fieldWithPath("response.storeReviews[].replies").type(JsonFieldType.ARRAY).description("대 댓글"),
                                        fieldWithPath("response.storeReviews[].replies[].replyIdx").type(JsonFieldType.NUMBER).description("대댓글 식별자 ID"),
                                        fieldWithPath("response.storeReviews[].replies[].content").type(JsonFieldType.STRING).description("대댓글 본문"),
                                        fieldWithPath("response.storeReviews[].replies[].userIdx").type(JsonFieldType.NUMBER).description("대댓글 작성자 식별 ID"),
                                        fieldWithPath("response.storeReviews[].replies[].userName").type(JsonFieldType.STRING).description("대댓글 작성자 이름"),
                                        fieldWithPath("response.storeReviews[].replies[].profileImage").type(JsonFieldType.STRING).description("대댓글 작성자 프로필사진"),
                                        fieldWithPath("response.storeReviews[].replies[].createdAt").type(JsonFieldType.STRING).description("대댓글 작성일"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("한 페이지당 데이터 수"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 \n 첫 페이지는 0"),
                                        fieldWithPath("pageInfo.totalElement").type(JsonFieldType.NUMBER).description("전체 데이터 수"),
                                        fieldWithPath("pageInfo.totalPage").type(JsonFieldType.NUMBER).description("전체 페이지 수"),
                                        fieldWithPath("pageInfo.isFirst").type(JsonFieldType.BOOLEAN).description("첫번째 페이지 인지 여부"),
                                        fieldWithPath("pageInfo.isFinish").type(JsonFieldType.BOOLEAN).description("마지막 페이지 인지 여부"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                                )
                        )
                )
                .andReturn();
    }

    @Test
    void createReview() throws Exception {
        PostCreateReviewDto postCreateReviewStub = ReviewStub.getPostCreateReviewStub();
        String jsonContent = toJsonContent(postCreateReviewStub);

        given(reviewMapper.reviewDtoToReview(any(PostCreateReviewDto.class))).willReturn(ReviewStub.getReviewStub());
        given(reviewService.saveReview(any(Review.class), any(MultipartFile.class))).willReturn(ReviewStub.getReviewStub2());
        given(reviewMapper.reviewToSimpleReviewDto(any(Review.class))).willReturn(ReviewStub.getSimpleReviewStub());

        MockMultipartFile content = new MockMultipartFile("postDto", "", "application/json", jsonContent.getBytes());

        ResultActions actions = mockMvc.perform(multipart(getOneURI(), storeIdx)
                .file("image", "storeImage".getBytes())
                .file(content)
                .header("Authorization", "Bearer " + accessToken)
                .characterEncoding("UTF-8"));

        actions
                .andExpect(status().isCreated())
                .andExpect(header().string("location", "/api/store/" + storeIdx + "/review"))
                .andDo(
                        document(
                                "post-review",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("storeIdx").description("약국 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
                                ),
                                requestParts(
                                        partWithName("image").description("리뷰 이미지 파일"),
                                        partWithName("postDto").description("사용자 식별자 ID, 약국 식별자 ID, 본문, 별점이 들어간 JSON 형식")
                                ),
                                responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                        fieldWithPath("response.storeIdx").type(JsonFieldType.NUMBER).description("약국 식별자 ID").optional(),
                                        fieldWithPath("response.userIdx").type(JsonFieldType.NUMBER).description("사용자 식별자 ID").optional(),
                                        fieldWithPath("response.reviewIdx").type(JsonFieldType.NUMBER).description("리뷰 식별자 ID").optional(),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")

                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        )
                );
    }


    @Test
    @DisplayName("리뷰 수정 : 성공")
    void updateReviewTest() throws Exception {
        PostUpdateReviewDto build = ReviewStub.getPostUpdateReviewStub();
        String content = toJsonContent(build);

        given(reviewService.findVerifiedReview(anyLong(), anyLong())).willReturn(ReviewStub.getReviewStub());
        given(reviewMapper.reviewDtoToReview(any(PostUpdateReviewDto.class), any(Review.class))).willReturn(ReviewStub.getReviewStub2());
        given(reviewService.updateReview(any(Review.class))).willReturn(ReviewStub.getReviewStub2());
        given(reviewMapper.reviewToSimpleReviewDto(any(Review.class))).willReturn(ReviewStub.getSimpleReviewStub());

        ResultActions actions = mockMvc.perform(patchRequestBuilder(getTowPathParam(), storeIdx, reviewIdx, content, accessToken));

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
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
                                ),
                                responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                        fieldWithPath("response.userIdx").type(JsonFieldType.NUMBER).description("사용자 식별자 ID"),
                                        fieldWithPath("response.reviewIdx").type(JsonFieldType.NUMBER).description("리뷰 식별자 ID"),
                                        fieldWithPath("response.storeIdx").type(JsonFieldType.NUMBER).description("약국 식별자 ID"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")

                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        )
                );
    }


    @Test
    @DisplayName("리뷰 삭제 : 성공")
    void deleteReview() throws Exception {

        doNothing().when(reviewService).deleteReview(Mockito.anyLong(), Mockito.anyLong());

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
                        responseHeaders(
                                headerWithName(HttpHeaders.LOCATION)
                                        .description("Location header. 등록된 리소스의 URI")
                        )
                ))
                .andReturn();
    }


    @Test
    @DisplayName("리뷰 신고 : 성공")
    void reportReviewTest() throws Exception {
        PostReviewReportDto postReviewReportStub = ReviewStub.getPostReviewReportStub();
        String content = toJsonContent(postReviewReportStub);

        given(reportMapper.postReportDtoToReviewReport(any(PostReviewReportDto.class))).willReturn(ReviewStub.getReviewReport());
        willDoNothing().given(reportService).createReport(anyLong(), any(ReviewReport.class));

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
                                        fieldWithPath("userIdx").type(JsonFieldType.NUMBER).description("사용자 식별자 ID"),
                                        fieldWithPath("reviewIdx").type(JsonFieldType.NUMBER).description("리뷰 식별자 ID"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("사용자 식별자 ID")
                                ),
                                responseFields(
                                        fieldWithPath("response").type(JsonFieldType.NULL).description("응답 데이터"),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")

                                ),
                                HeaderDocumentation.responseHeaders(
                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
                                )
                        ))
                .andReturn();
    }

    @Test
    @DisplayName("내가 작성한 리뷰 가져오기 : 상공")
    void getUserReviewsTest() throws Exception {

        given(reviewService.getUserReviews(anyLong())).willReturn(ReviewStub.getListReviewStub());
        given(reviewMapper.reviewsToUserReviewsDto(anyList())).willReturn(ReviewStub.getGetUserReviewStubList());

        ResultActions actions = mockMvc.perform(getRequestBuilder(getMyReviewUrl(), userIdx, accessToken));

        actions
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(
                        document(
                                "get-review",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getUserPathParameterDescriptor()
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
                                ),
                                responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                        fieldWithPath("response.reviews").type(JsonFieldType.ARRAY).description("리뷰 데이터").optional(),
                                        fieldWithPath("response.reviews[].reviewIdx").type(JsonFieldType.ARRAY).description("리뷰 식별자 ID").optional(),
                                        fieldWithPath("response.reviews[].storeIdx").type(JsonFieldType.NUMBER).description("약국 식별자 ID").optional(),
                                        fieldWithPath("response.reviews[].content").type(JsonFieldType.STRING).description("리뷰 본문").optional(),
                                        fieldWithPath("response.reviews[].rating").type(JsonFieldType.NUMBER).description("리뷰 별점").optional(),
                                        fieldWithPath("response.reviews[].storeName").type(JsonFieldType.STRING).description("약국 이름").optional(),
                                        fieldWithPath("response.reviews[].modifiedAt").type(JsonFieldType.STRING).description("리뷰 수정일").optional(),
                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
                                )

                        )
                )
                .andReturn();
    }

}