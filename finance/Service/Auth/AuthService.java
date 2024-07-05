package com.capstone.finance.Service.Auth;


import com.capstone.finance.DTO.Member.LoginDto;
import com.capstone.finance.DTO.Member.MemberRequestDto;
import com.capstone.finance.DTO.Member.MemberResponseDto;
import com.capstone.finance.DTO.Token.TokenReqDto;
import com.capstone.finance.DTO.Token.TokenResDto;
import com.capstone.finance.Entity.Auth.Member;
import com.capstone.finance.Entity.Auth.RefreshToken;
import com.capstone.finance.JWT.TokenProvider;
import com.capstone.finance.Repository.Auth.MemberRepository;
import com.capstone.finance.Repository.Auth.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.security.SecureRandom;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService;

    private static final int VERIFICATION_CODE_VALIDITY_DURATION = 5; // 인증번호 유효기간 5분
    @Transactional
    public MemberResponseDto signup(MemberRequestDto memberRequestDto) {
        if (memberRepository.existsByUsername(memberRequestDto.getUsername())) {
            throw new RuntimeException("already exist id");
        }

        // 이메일 형식 확인
        String email = memberRequestDto.getEmail();


        // 이메일 존재 여부 확인
        if (memberRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }

        Member member = memberRequestDto.toMember(passwordEncoder);

        return MemberResponseDto.toDto(memberRepository.save(member));
    }

    @Transactional
    public TokenResDto login(LoginDto loginDto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = loginDto.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenResDto tokenResDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenResDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenResDto;
    }

    @Transactional
    public void logout(String token) {
        // 로그아웃하려는 사용자의 정보를 가져옴
        Authentication authentication   = tokenProvider.getAuthentication(token);

        // 저장소에서 해당 사용자의 refresh token 삭제
        refreshTokenRepository.deleteByKey(authentication.getName());
    }
    @Transactional
    public TokenResDto reissue(TokenReqDto tokenReqDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenReqDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenReqDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenReqDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenResDto tokenResDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenResDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenResDto;
    }
    @Transactional
    public String findUsernameByEmail(String email) { //이메일을 확인한 후 username을 보냄
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            return member.get().getUsername();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @Transactional
    public void initiatePasswordReset(String username, String email) { //username과 이메일을 확인
        Optional<Member> memberOptional = memberRepository.findByUsernameAndEmail(username, email);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            String verificationCode = generateVerificationCode();
            emailService.sendPasswordResetEmail(email, verificationCode);
            member.setVerificationCode(verificationCode, VERIFICATION_CODE_VALIDITY_DURATION);
            memberRepository.save(member);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }

    @Transactional
    public void resetPassword(String username, String verificationCode, String newPassword) { //이메일에 인증번호를 보내고 새 비밀번호 설정
        Optional<Member> memberOptional = memberRepository.findByUsername(username);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            if (member.isVerificationCodeValid(verificationCode)) {
                member.setPassword(passwordEncoder.encode(newPassword));
                member.setVerificationCode(null, 0);
                memberRepository.save(member);
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid or expired verification code");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
    }


    private String generateVerificationCode() { //인증번호 설정 함수
        SecureRandom secureRandom = new SecureRandom();
        int code = secureRandom.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}