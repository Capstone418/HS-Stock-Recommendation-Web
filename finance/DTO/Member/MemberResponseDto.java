package com.capstone.finance.DTO.Member;

import com.capstone.finance.Entity.Auth.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponseDto {
    private String username;
    private String nickname;
    // 코드의 재사용성과 가독성을 위한 Member 객체를 Dto 객체로 변환하는 일종의 캡슐화 전략
    public static MemberResponseDto toDto(Member member) {
        return new MemberResponseDto(
                member.getUsername(),
                member.getNickname()
        );
    }
}