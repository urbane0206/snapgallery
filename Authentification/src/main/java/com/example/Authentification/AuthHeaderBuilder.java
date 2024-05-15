package com.example.Authentification;

import java.util.Base64;

public class AuthHeaderBuilder {

    public static String buildBasicAuthHeader(String clientId, String clientSecret) {
        String credentials = clientId + ":" + clientSecret;
        byte[] encodedCredentials = Base64.getEncoder().encode(credentials.getBytes());
        return "Basic " + new String(encodedCredentials);
    }

}
