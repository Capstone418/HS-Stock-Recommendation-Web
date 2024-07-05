package com.capstone.finance.Controller;

import com.capstone.finance.DTO.Member.LoginDto;
import com.capstone.finance.DTO.Member.MemberRequestDto;
import com.capstone.finance.DTO.Member.MemberResponseDto;
import com.capstone.finance.DTO.Token.TokenReqDto;
import com.capstone.finance.DTO.Token.TokenResDto;
import com.capstone.finance.Entity.Auth.ResetPasswordRequest;
import com.capstone.finance.JWT.TokenProvider;
import com.capstone.finance.Repository.Auth.MemberRepository;
import com.capstone.finance.Service.Auth.AuthService;
import com.capstone.finance.Service.Auth.VerificationTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public  class AuthController {

    private final AuthService authService;
    private final VerificationTokenService verificationTokenService;
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;
    @PostMapping("/signup")
    public ResponseEntity<MemberResponseDto> signup(@RequestBody MemberRequestDto memberRequestDto) {
       
        if (memberRepository.existsByEmail(memberRequestDto.getEmail())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT); // 중복된 이메일이 존재하면 409리턴
        }
        return ResponseEntity.ok(authService.signup(memberRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResDto> login(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(authService.login(loginDto));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String authorizationHeader) {
        String accessToken = authorizationHeader.substring(7);
        authService.logout(accessToken);
        return ResponseEntity.ok().build();
    }
   /* @PostMapping("/chatbot")
    public ResponseEntity<?> chatbot(@RequestBody TokenReqDto tokenReqDto) {
        boolean isValid = verificationTokenService.validateToken(tokenReqDto.getAccessToken());
        if (isValid) {
            return ResponseEntity.ok("Token is valid. Welcome to the chatbot!");
        } else {
            return ResponseEntity.status(401).body("Invalid token. Access denied.");
        }
    }
    */

    @PostMapping("/page")
    public ResponseEntity<?> chatbot(@RequestHeader("Authorization") String authorizationHeader) {
        // 헤더에서 Authorization 값 파싱

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String accessToken = authorizationHeader.substring(7); // "Bearer " 이후의 토큰 추출
            // 여기서 Access Token을 사용하여 작업 수행
            boolean isValid = tokenProvider.validateToken(accessToken);
            if (isValid) {
                return ResponseEntity.ok("Token is valid. Welcome to the chatbot!");
            } else {
                return ResponseEntity.status(401).body("Invalid token. Access denied.");
            }

        } else {
            return ResponseEntity.status(401).body("Invalid token. Access denied.");
        }
    }

    @GetMapping("/find-username") //아이디 찾기
    public ResponseEntity<String> findUsername(@RequestParam("email") String email) {
        return ResponseEntity.ok(authService.findUsernameByEmail(email));
    }


    @PostMapping("/initiate-password-reset") //비밀번호 찾기
    public ResponseEntity<?> initiatePasswordReset(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        authService.initiatePasswordReset(resetPasswordRequest.getUsername(), resetPasswordRequest.getEmail());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reset-password") //비밀번호 찾기
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest resetPasswordRequest) {
        authService.resetPassword(resetPasswordRequest.getUsername(), resetPasswordRequest.getVerificationCode(), resetPasswordRequest.getNewPassword());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenResDto> reissue(@RequestBody TokenReqDto tokenReqDto) {
        return ResponseEntity.ok(authService.reissue(tokenReqDto));
    }

}