package com.project.mainproject.helper;

import com.google.gson.Gson;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.ParameterDescriptor;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.util.MultiValueMap;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface ControllerTestHelper<T> {
    default RequestBuilder postRequestBuilder(String url,
                                              String content) {
        return  post(url)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }

    default RequestBuilder postRequestBuilder(String url) {
        return  post(url)
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder postRequestBuilder(String url, long resourceId) {
        return post(url, resourceId)
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder postRequestBuilder(String url, long resourceId, String content) {
        return post(url, resourceId)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }
    default RequestBuilder postRequestBuilder(String url, long resourceId, long resourceId2, String content) {
        return post(url, resourceId, resourceId2)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }
    default RequestBuilder patchRequestBuilder(String url, long resourceId, String content) {
        return patch(url, resourceId)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }
    default RequestBuilder patchRequestBuilder(String url, long resourceId, long resourceId2, String content) {
        return patch(url, resourceId,resourceId2)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }

    default RequestBuilder patchRequestBuilder(String uri, String content) {
        return patch(uri)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);

    }

    default RequestBuilder patchRequestBuilder(String uri, Long resourceId) {
        return patch(uri, resourceId)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON);

    }
    default RequestBuilder getRequestBuilder(String url, Long resourceId) {
        return get(url, resourceId)
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder getRequestBuilder(String uri) {
        return get(uri)
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder getRequestBuilder(String url, MultiValueMap<String, String> queryParams) {
        return get(url)
                .params(queryParams)
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder getRequestBuilder(String url, MultiValueMap<String, String> queryParams, String content) {
        return get(url)
                .params(queryParams)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }
    default RequestBuilder getRequestBuilder(String url, MultiValueMap<String, String> queryParams,long resourceId) {
        return get(url,resourceId)
                .params(queryParams)
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder getRequestBuilder(String url,long resourceId,long resourceId2) {
        return get(url,resourceId,resourceId2)
                .accept(MediaType.APPLICATION_JSON);
    }
    default RequestBuilder deleteRequestBuilder(String url, String content) {
        return delete(url)
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
    }
    default RequestBuilder deleteRequestBuilder(String url, long resourceId) {
        return delete(url, resourceId);
    }
    default RequestBuilder deleteRequestBuilder(String url, long resourceId, long resourceId2) {
        return delete(url, resourceId,resourceId2);
    }

    default RequestBuilder deleteRequestBuilder(String uri) {
        return delete(uri);
    }
    default String toJsonContent(T t) {
        Gson gson = new Gson();
        String content = gson.toJson(t);
        return content;
    }
    default List<FieldDescriptor> getSingleResponseDescriptors(List<FieldDescriptor> dataResponseFieldDescriptors) {
        Stream<FieldDescriptor> resultResponseDescriptors = getResultResponseDescriptors().stream();
        Stream<FieldDescriptor> defaultResponseDescriptors = getDefaultResponseDescriptors(JsonFieldType.OBJECT).stream();
        Stream<FieldDescriptor> dataResponseDescriptors = dataResponseFieldDescriptors.stream();
        return Stream.of(resultResponseDescriptors,defaultResponseDescriptors, dataResponseDescriptors).flatMap(data->data)
                .collect(Collectors.toList());
    }
    default List<FieldDescriptor> getPageResponseDescriptors(List<FieldDescriptor> dataResponseFieldDescriptors) {
        Stream<FieldDescriptor> resultResponseDescriptors = getResultResponseDescriptors().stream();
        Stream<FieldDescriptor> defaultResponseDescriptors = getDefaultResponseDescriptors(JsonFieldType.OBJECT).stream();
        Stream<FieldDescriptor> dataResponseDescriptors = dataResponseFieldDescriptors.stream();
        Stream<FieldDescriptor> pageResponseDescriptors = getPageResponseDescriptors().stream();

        Stream<FieldDescriptor> mergedStream =
                Stream.of(resultResponseDescriptors, defaultResponseDescriptors, dataResponseDescriptors, pageResponseDescriptors)
                        .flatMap(descriptorStream -> descriptorStream);
        return mergedStream.collect(Collectors.toList());
    }
    default List<FieldDescriptor> getDefaultResponseDescriptors(JsonFieldType jsonFieldTypeForData) {
        return Arrays.asList(
                fieldWithPath("response").type(jsonFieldTypeForData).description("결과 데이터").optional()
        );
    }
    default List<FieldDescriptor> getPageResponseDescriptors() {
        return Arrays.asList(
                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보").optional(),
                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 번호").optional(),
                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 사이즈").optional(),
                fieldWithPath("pageInfo.totalElement").type(JsonFieldType.NUMBER).description("전체 건 수").optional(),
                fieldWithPath("pageInfo.totalPage").type(JsonFieldType.NUMBER).description("전체 페이지 수").optional(),
                fieldWithPath("pageInfo.isFirst").type(JsonFieldType.BOOLEAN).description("첫 페이지 여부").optional(),
                fieldWithPath("pageInfo.isFinish").type(JsonFieldType.BOOLEAN).description("마지막 페이지 여부").optional()
        );
    }

    default List<FieldDescriptor> getResultResponseDescriptors() {
        return Arrays.asList(
                fieldWithPath("httpCode").type(JsonFieldType.NUMBER).description("결과 코드").optional(),
                fieldWithPath("message").type(JsonFieldType.STRING).description("결과 메세지").optional()
        );
    }
    default List<ParameterDescriptor> getDefaultRequestParameterDescriptors() {
        return List.of(
                parameterWithName("page").description("조회 페이지 \n 0부터 시작").optional(),
                parameterWithName("size").description("페이지 당 건 수 \n 기본 값은 ").optional(),
                parameterWithName("sort").description("정렬 기준").optional()
        );
    }
    default List<FieldDescriptor> getDefaultWrapperDescriptors(String fieldName,JsonFieldType jsonFieldTypeForData,String description) {
        return Arrays.asList(
                fieldWithPath(fieldName).type(jsonFieldTypeForData).description(description).optional()
        );
    }
    default String getDataParentPath(DataResponseType dataResponseType,String fieldName) {
        return dataResponseType == DataResponseType.SINGLE ? fieldName.concat(".") : fieldName.concat("[].");
    }
    enum DataResponseType {
        SINGLE, LIST
    }

}