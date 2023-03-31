package com.project.mainproject.review.controller;

import com.project.mainproject.helper.review.ReviewReplyControllerTestHelper;
import com.project.mainproject.review.dto.reply.PostReplyDto;
import com.project.mainproject.review.entity.ReviewReply;
import com.project.mainproject.review.mapper.ReviewReplyMapper;
import com.project.mainproject.review.service.ReviewReplyService;
import com.project.mainproject.security.JwtHelper;
import com.project.mainproject.security.UserContext;
import com.project.mainproject.stub.ReviewStub;
import com.project.mainproject.user.entity.User;
import com.project.mainproject.user.repository.UserRepository;
import com.project.mainproject.user.service.UserService;
import com.project.mainproject.utils.ResponseBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpHeaders;
import org.springframework.restdocs.headers.HeaderDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;
import java.util.Optional;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@AutoConfigureMockMvc
class ReviewReplyControllerTest implements ReviewReplyControllerTestHelper {
    Long userIdx = 1L;
    Long storeIdx = 1L;
    Long reviewIdx = 1L;
    Long relpyIdx = 1L;
    String accessToken;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private JwtHelper jwtHelper;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ResponseBuilder responseBuilder;
    @MockBean
    private UserRepository userRepository;  //JWT토큰용
    @MockBean
    private UserService userService;
    @MockBean
    private ReviewReplyMapper replyMapper;
    @MockBean
    private ReviewReplyService replyService;

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
    @DisplayName("대댓글 남기기 : 성공")
    void createReviewPlusTest() throws Exception {
        PostReplyDto post = ReviewStub.getPostReplyStub();
        String content = toJsonContent(post);

        given(replyMapper.postReplyDtoToReviewReply(any(PostReplyDto.class))).willReturn(ReviewStub.getReviewReply());
        given(replyService.createReply(anyLong(), any(ReviewReply.class))).willReturn(ReviewStub.getReviewReply2());
        given(replyMapper.reviewReplyToSimpleReplyDto(any(ReviewReply.class))).willReturn(ReviewStub.getSimpleReplyStub());

        ResultActions actions = mockMvc.perform(postRequestBuilder("/api/review/{reviewIdx}/reply", accessToken, reviewIdx, content));

        actions
                .andDo(print())
                .andExpect(status().isCreated())
                .andDo(
                        document(
                                "creat-review-reply",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        parameterWithName("reviewIdx").description("리뷰 식별자 ID")
                                ),
                                requestHeaders(
                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
                                ),
                                requestFields(
                                        fieldWithPath("storeIdx").type(JsonFieldType.NUMBER).description("약국 식별 ID"),
                                        fieldWithPath("userIdx").type(JsonFieldType.NUMBER).description("작성자 식별 ID"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("대댓글 본문"),
                                        fieldWithPath("reviewIdx").type(JsonFieldType.NUMBER).description("리뷰 식별 ID")
                                ),
                                responseFields(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
                                        fieldWithPath("response.replyIdx").type(JsonFieldType.NUMBER).description("대댓글 식별자 ID").optional(),
                                        fieldWithPath("response.userIdx").type(JsonFieldType.NUMBER).description("작성자 식별자 ID").optional(),
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
    void updateReviewReplyTest() throws Exception {
//        PatchReplyDto patchReplyStub = ReviewStub.getPatchReplyStub();
//        String content = toJsonContent(patchReplyStub);
//
//        given(replyService.findVerifiedReply(anyLong(), anyLong())).willReturn(ReviewStub.getReviewReply());
//        given(replyMapper.reviewDtoToReviewReply(any(PatchReplyDto.class), any(ReviewReply.class))).willReturn(ReviewStub.getReviewReply2());
//        given(replyService.updateReply(any(ReviewReply.class))).willReturn(ReviewStub.getReviewReply());
//        given(replyMapper.reviewReplyToSimpleReplyDto(any(ReviewReply.class))).willReturn(ReviewStub.getSimpleReplyStub());
//
//        ResultActions actions = mockMvc.perform(patchRequestBuilder("/api/review/{reviewIdx}/reply/{replyIdx}", reviewIdx, relpyIdx, content, accessToken));
//
//        actions
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andDo(
//                        document(
//                                "update-review-reply",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(
//                                        parameterWithName("reviewIdx").description("리뷰 식별자 ID"),
//                                        parameterWithName("replyIdx").description("대댓글 식별자 ID")
//                                ),
//                                requestHeaders(
//                                        headerWithName("Authorization").description("ACCESS 토큰").optional()
//                                ),
//                                requestFields(
//                                        fieldWithPath("storeIdx").type(JsonFieldType.NUMBER).description("약국 식별 ID"),
//                                        fieldWithPath("userIdx").type(JsonFieldType.NUMBER).description("작성자 식별 ID"),
//                                        fieldWithPath("content").type(JsonFieldType.STRING).description("대댓글 본문"),
//                                        fieldWithPath("reviewIdx").type(JsonFieldType.NUMBER).description("리뷰 식별 ID"),
//                                        fieldWithPath("replyIdx").type(JsonFieldType.NUMBER).description("대댓글 식별 ID")
//                                ),
//                                responseFields(
//                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("응답 데이터").optional(),
//                                        fieldWithPath("response.replyIdx").type(JsonFieldType.NUMBER).description("대댓글 식별자 ID").optional(),
//                                        fieldWithPath("response.userIdx").type(JsonFieldType.NUMBER).description("작성자 식별자 ID").optional(),
//                                        fieldWithPath("message").type(JsonFieldType.STRING).description("처리 상태 코드 작성"),
//                                        fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("처리 완료 메시지")
//                                ),
//                                HeaderDocumentation.responseHeaders(
//                                        HeaderDocumentation.headerWithName(HttpHeaders.LOCATION).description("Location header. 등록된 리소스의 URI")
//                                )
//                        ))
//                .andReturn();
    }

    @Test
    void deleteReviewReplyTest() throws Exception {
//
//
//        willDoNothing().given(replyService).deleteReply(anyLong(), anyLong());
//
//        ResultActions actions = mockMvc.perform(deleteRequestBuilder("/api/review/{reviewIdx}/reply/{replyIdx}", reviewIdx, relpyIdx, accessToken));
//
//        actions
//                .andExpect(status().isNoContent())
//                .andDo(print())
//                .andDo(
//                        document(
//                                "update-review-reply",
//                                getRequestPreProcessor(),
//                                getResponsePreProcessor(),
//                                pathParameters(
//                                        parameterWithName("reviewIdx").description("리뷰 식별자 ID"),
//                                        parameterWithName("replyIdx").description("대댓글 식별자 ID")
//                                )
//
//                        ))
//                .andReturn();
    }


}