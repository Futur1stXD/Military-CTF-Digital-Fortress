package com.military.ctfdigitalfortress.helper.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private String nickname;
    private String telegramNick;
    private String phoneNumber;
    private String recaptchaToken;
}
