package com.example.Authentification;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class codeToToken {

    String client_id;
    String client_secret;
    String code;
    String redirect_uri;


    public codeToToken() {
    }



    @JsonCreator
    public codeToToken(@JsonProperty("client_id") String client_id,
                       @JsonProperty("client_secret") String client_secret,
                       @JsonProperty("code") String code,
                       @JsonProperty("redirect_uri") String redirect_uri) {
        this.client_id = client_id;
        this.client_secret = client_secret;
        this.code = code;
        this.redirect_uri = redirect_uri;
    }

}