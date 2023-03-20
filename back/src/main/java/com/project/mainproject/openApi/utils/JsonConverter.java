package com.project.mainproject.openApi.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class JsonConverter {
    public static JsonArray jsonElementToArray(JsonElement element) {

        JsonObject response = element.getAsJsonObject().get("response").getAsJsonObject();
        JsonObject body = response.getAsJsonObject().get("body").getAsJsonObject();
        JsonObject items = body.getAsJsonObject().get("items").getAsJsonObject();

        return items.getAsJsonObject().get("item").getAsJsonArray();
    }
    }
