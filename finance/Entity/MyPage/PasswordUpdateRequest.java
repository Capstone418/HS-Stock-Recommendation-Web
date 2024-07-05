package com.capstone.finance.Entity.MyPage;

import lombok.Data;

@Data
public class PasswordUpdateRequest {
    private String currentPassword;
    private String newPassword;


}