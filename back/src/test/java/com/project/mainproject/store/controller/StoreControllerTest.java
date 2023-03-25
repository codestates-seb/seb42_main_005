package com.project.mainproject.store.controller;

import com.project.mainproject.helper.store.StoreControllerTestHelper;
import com.project.mainproject.store.dto.FilterTagDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;
import java.util.Optional;

import static com.project.mainproject.utils.ApiDocumentUtils.getRequestPreProcessor;
import static com.project.mainproject.utils.ApiDocumentUtils.getResponsePreProcessor;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StoreController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
class StoreControllerTest implements StoreControllerTestHelper {
    @Autowired
    private MockMvc mockMvc;

    //@MockBean
    //의존성 주입 필요한 것들 주입

    @Test
    void getStoreHomePageTest() throws Exception{
        // given
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("page", "1");
        queryParams.add("size", "10");

        FilterTagDto filterTagDto = new FilterTagDto(List.of("깨끗함","주차공간 넓음"));
        String content = toJsonContent(filterTagDto);

        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl(), accessToken, queryParams));

        actions
                .andDo(print())
                .andDo(
                        MockMvcRestDocumentation.document(
                                "get-stores",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParameters(
                                        getDefaultRequestParameterDescriptors()
                                ),
                                PayloadDocumentation.requestFields(
                                        getHomeRequestDescriptors()
                                ),
                                PayloadDocumentation.responseFields(
                                        getPageResponseDescriptors(
                                                getStoreHomeResponseDescriptors("storeHome")
                                        )
                                )
                        )
                )
                .andReturn();
    }

    @Test
    void getStoreDetailTest() throws Exception {
        Long storeIdx = 1L;
        ResultActions actions = mockMvc.perform(getRequestBuilder(getURI(),storeIdx));
        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(jsonPath("$.response.storeIdx").value(1L))
                .andExpect(jsonPath("$.response.name").value("주사랑믿음약국"))
                .andExpect(jsonPath("$.response.tel").value("010-1234-1234"))
                .andExpect(jsonPath("$.httpCode").value(200))
                .andDo(
                        MockMvcRestDocumentation.document(
                                "get-store",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStorePathParameterDescriptor()
                                ),
                                PayloadDocumentation.responseFields(
                                        getSingleResponseDescriptors(
                                                getStoreHomeResponseDescriptors("")
                                        )
                                )
                        )
                )
                .andReturn();
    }

    @Test
    void pickedStoreTest() throws Exception {
        Long storeIdx = 1L;
        ResultActions actions = mockMvc.perform(postRequestBuilder(getPickURI(), storeIdx));
        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.response.storeIdx").value(1L))
                .andExpect(jsonPath("$.httpCode").value(200))
                .andDo(
                        MockMvcRestDocumentation.document(
                                "get-pickedStore",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStorePathParameterDescriptor()
                                ),
                                PayloadDocumentation.responseFields(
                                        getSingleResponseDescriptors(
                                                getStoreIdxDescriptors()
                                        )
                                )

                        )
                )
                .andReturn();
    }

}