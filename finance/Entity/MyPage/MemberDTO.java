package com.capstone.finance.Entity.MyPage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {
    private Long id;
    private String username;
    private String nickname;
    private String email;
}