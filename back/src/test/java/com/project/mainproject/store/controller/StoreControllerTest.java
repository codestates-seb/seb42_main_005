package com.project.mainproject.store.controller;

import com.google.gson.Gson;
import com.project.mainproject.helper.store.StoreControllerTestHelper;
import com.project.mainproject.store.dummy.StoreStub;
import com.project.mainproject.store.entity.Store;
import com.project.mainproject.utils.ApiDocumentUtils;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.request.RequestDocumentation;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.List;

import static com.project.mainproject.utils.ApiDocumentUtils.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.request.RequestDocumentation.*;
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

        ResultActions actions = mockMvc.perform(getRequestBuilder(getUrl(),queryParams));

        actions
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(
                        MockMvcRestDocumentation.document(
                                "get-stores",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                requestParameters(
                                        getDefaultRequestParameterDescriptors()
                                ),
                                PayloadDocumentation.responseFields(
                                        getFullPageResponseDescriptor(
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
                .andExpect(jsonPath("$.response.storeIdx").value(1L))
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
                                        getFullResponseDescriptor(
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
                .andDo(
                        MockMvcRestDocumentation.document(
                                "get-pickedStore",
                                getRequestPreProcessor(),
                                getResponsePreProcessor(),
                                pathParameters(
                                        getStorePathParameterDescriptor()
                                ),
                                PayloadDocumentation.responseFields(
                                        getFullResponseDescriptor(
                                                getStoreIdxDescriptors()
                                        )
                                )

                        )
                )
                .andReturn();
    }

}