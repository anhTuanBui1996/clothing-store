package com.bta.api.models.implement;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Data
public class OAuth2UserImpl implements OAuth2User {

    private String oath2ClientName;
    private OAuth2User oAuth2User;

    public OAuth2UserImpl(OAuth2User oAuth2User, String oath2ClientName) {
        this.oAuth2User = oAuth2User;
        this.oath2ClientName = oath2ClientName;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return oAuth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return oAuth2User.getAuthorities();
    }

    @Override
    public String getName() {
        return oAuth2User.getName();
    }

    public String getEmail() {
        return oAuth2User.getAttribute("email");
    }

}
