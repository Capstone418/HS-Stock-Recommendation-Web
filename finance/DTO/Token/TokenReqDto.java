package com.capstone.finance.DTO.Token;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TokenReqDto {
    private String accessToken;
    private String refreshToken;
}