package com.capstone.finance.Entity.Auth;

import com.capstone.finance.Entity.Community.Like;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "member")
public class Member implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    //@Column(updatable = false,unique = true,nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;



    @Column(name = "nickname")
    private String nickname;

    @Column(name = "email")
    private String email;
    @JsonIgnore
    @OneToMany(mappedBy = "member")
    private List<Like> likes; //게시글 추천 관련


    private String verificationCode; //이메일 인증 코드
    private LocalDateTime verificationCodeExpiryTime;//이메일 인증 코드 유효 시간
    //@Column(nullable = false)
    private boolean enabled;

    public void setVerificationCode(String verificationCode, int validityDurationInMinutes) {
        this.verificationCode = verificationCode;
        this.verificationCodeExpiryTime = LocalDateTime.now().plusMinutes(validityDurationInMinutes);
    }

    public boolean isVerificationCodeValid(String code) {
        return this.verificationCode.equals(code) && LocalDateTime.now().isBefore(this.verificationCodeExpiryTime);
    }
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        // 여기서 사용자의 권한을 조회하여 GrantedAuthority 객체를 생성하여 리스트에 추가합니다.
        // 예를 들어, 사용자의 권한이 "ROLE_USER"라면 다음과 같이 추가할 수 있습니다.
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));

        return authorities;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }


    @Override
    public boolean isEnabled() {
        return enabled;
    }

}