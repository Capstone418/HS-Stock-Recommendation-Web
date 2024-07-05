package com.capstone.finance.DTO.Home;

import com.capstone.finance.Entity.Home.RecommendEntity;
import lombok.*; // 멤버필드(속성)에 대한 기본 함수들 자동 제조 라이브러리

/* DTO == Java Beans*/
@Builder // 특정 객체에 setter를 이용하여 속성값 주기 가능
@ToString // toString()
@Getter // getter
@Setter // setter
@NoArgsConstructor // 기본 생성자
@AllArgsConstructor // 매개변수 있는 생성자
public class RecommendRequestDTO {
    private String code;
    private int last_pv;

    public RecommendEntity toEntity(){
        return RecommendEntity.builder()
                .code(this.code)
                .last_pv(this.last_pv)
                .build();
    }
}
