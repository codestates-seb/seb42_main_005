//package com.project.mainproject.review.controller;
//
//import com.project.mainproject.helper.review.ReviewAdminControllerTestHelper;
//import com.project.mainproject.review.dto.ReviewIdxDto;
//import com.project.mainproject.review.mapper.ReviewMapper;
//import com.project.mainproject.review.service.ReviewService;
//import com.project.mainproject.security.JwtHelper;
//import com.project.mainproject.security.UserContext;
//import com.project.mainproject.stub.ReviewStub;
//import com.project.mainproject.user.entity.User;
//import com.project.mainproject.user.repository.UserRepository;
//import com.project.mainproject.user.service.UserService;
//import com.project.mainproject.utils.ResponseBuilder;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
//import org.springframework.restdocs.payload.JsonFieldType;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.ResultActions;
//import org.springframework.util.LinkedMultiValueMap;
//import org.springframework.util.MultiValueMap;
//
//import java.util.List;
//import java.util.Optional;
//
//import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
//import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
//import static org.mockito.ArgumentMatchers.*;
//import static org.mockito.BDDMockito.given;
//import static org.mockito.BDDMockito.willDoNothing;
//import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
//import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
//import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
//import static org.springframework.restdocs.payload.PayloadDocumentation.*;
//import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
//import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
//
//@SpringBootTest
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//@AutoConfigureMockMvc
//public class AdminReviewControllerTest implements ReviewAdminControllerTestHelper {
//
//    Long userIdx = 1L;
//    Long storeIdx = 1L;
//    Long reviewIdx = 1L;
//    String accessToken;
//    @Autowired
//    private MockMvc mockMvc;
//    @Autowired
//    private JwtHelper jwtHelper;
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//    @Autowired
//    private ResponseBuilder responseBuilder;
//    @MockBean
//    private UserRepository userRepository;  //JWT토큰용
//    @MockBean
//    private UserService userService;
//    @MockBean
//    private ReviewMapper reviewMapper;
//    @MockBean
//    private ReviewService reviewService;
//
//    @BeforeEach
//    void init() {
//        //JWT얻기 위한 정보 입력
//        String rawPassword = "passwor12qwe!@#!d";
//        String password = passwordEncoder.encode(rawPassword);
//
//        User user = new User();
//        user.setUserIdx(1L);
//        user.setPassword(password);
//        user.setName("tester");
//        user.setEmail("test@email.com");
//
//        UserContext userContext = new UserContext(user.getUserIdx().toString(), user.getEmail(), user.getPassword(), List.of(new SimpleGrantedAuthority("USER")));
//
//        given(userRepository.findByEmail(anyString())).willReturn(Optional.of(user));
//        given(userService.loadUserByUsername(anyString())).willReturn(userContext);
//
//        accessToken = jwtHelper.createAccessToken(user.getEmail());
//    }
//
//    @Test
//    @DisplayName("신고된 리뷰 조회 : 성공")
//    void getReportedReviewTest() throws Exception {
//        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
//        queryParams.add("page", "1");
//        queryParams.add("size", "10");
//
//
//        given(reviewService.getReportedReviews(any(Pageable.class))).willReturn(ReviewStub.getPageReviewStub());
//        given(reviewMapper.reviewsToReportedReviewsDto(anyList())).willReturn(ReviewStub.getReportedReviewListStub());
//
//
//        ResultActions actions = mockMvc.perform(getRequestBuilder("/api/admin/reports", accessToken , queryParams));
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(print())
//                .andDo(
//                        document(
//                                "get-reported-reviews",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                requestParameters(getDefaultRequestParameterDescriptors()),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                ),
//                                responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
//                                        fieldWithPath("response.reportedReviews").type(JsonFieldType.ARRAY).description("신고된 리뷰 데이터").optional(),
//                                        fieldWithPath("response.reportedReviews[].reviewIdx").type(JsonFieldType.NUMBER).description("리뷰 식별자 ID"),
//                                        fieldWithPath("response.reportedReviews[].content").type(JsonFieldType.STRING).description("리뷰 본문"),
//                                        fieldWithPath("response.reportedReviews[].email").type(JsonFieldType.STRING).description("작성자 email"),
//                                        fieldWithPath("response.reportedReviews[].createdAt").type(JsonFieldType.STRING).description("신고 일자"),
//                                        fieldWithPath("response.reportedReviews[].reportCnt").type(JsonFieldType.NUMBER).description("신고된 횟수"),
//                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
//                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("한 페이지당 데이터 수"),
//                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 \n 첫 페이지는 0"),
//                                        fieldWithPath("pageInfo.totalElement").type(JsonFieldType.NUMBER).description("전체 데이터 수"),
//                                        fieldWithPath("pageInfo.totalPage").type(JsonFieldType.NUMBER).description("전체 페이지 수"),
//                                        fieldWithPath("pageInfo.isFirst").type(JsonFieldType.BOOLEAN).description("첫번째 페이지 인지 여부"),
//                                        fieldWithPath("pageInfo.isFinish").type(JsonFieldType.BOOLEAN).description("마지막 페이지 인지 여부"),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                        )
//                        ))
//                .andReturn();
//    }
//
//    @Test
//    @DisplayName("리뷰들 삭제 : 성공")
//    @WithMockUser
//    void deleteReviewsTest() throws Exception {
//        ReviewIdxDto reviewIdxStub = ReviewStub.getReviewIdxStub();
//        String content = toJsonContent(reviewIdxStub);
//
//        willDoNothing().given(reviewService).deleteReportedReviews(any(ReviewIdxDto.class));
//
//        ResultActions actions = mockMvc.perform(deleteRequestBuilder("/api/admin/reports", content));
//
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(document(
//                        "delete-banned-reviews",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                fieldWithPath("reviews").type(JsonFieldType.ARRAY).description("신고당한 리뷰 목록"),
//                                fieldWithPath("reviews[].reviewIdx").type(JsonFieldType.NUMBER).description("신고당한 리뷰 식별자 ID")
//                        ),
//                        requestHeaders(
//                                headerWithName("Authorization").description("ACCESS 토큰").optional()
//                        )
//                ))
//                .andReturn();
//    }
//
//    @Test
//    @DisplayName("신고당한 리뷰 복구 : 성공")
//    void restoreReviewsTest() throws Exception {
//        ReviewIdxDto post = ReviewStub.getReviewIdxStub();
//        String content = toJsonContent(post);
//
//        willDoNothing().given(reviewService).recoverReportedReviews(post);
//
//        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/admin/reports", content));
//
//        actions
//                .andExpect(status().isOk())
//                .andDo(document(
//                        "restore-banned-reviews",
//                        getRequestPreProcessor(),
//                        getResponsePreProcessor(),
//                        requestFields(
//                                fieldWithPath("reviews").type(JsonFieldType.ARRAY).description("신고당한 리뷰 목록"),
//                                fieldWithPath("reviews[].reviewIdx").type(JsonFieldType.NUMBER).description("리뷰인덱스")
//                        ),
//                        requestHeaders(
//                                headerWithName("Authorization").description("ACCESS 토큰").optional()
//                        ),
//                        responseFields(
//                                fieldWithPath("response").type(JsonFieldType.NULL).description("응답 데이터").optional(),
//                                fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                        )
//                ));
//    }
//}
