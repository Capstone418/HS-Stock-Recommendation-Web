package com.capstone.finance.Service.Auth;

import com.capstone.finance.Entity.Auth.Member;
import com.capstone.finance.Entity.Auth.VerificationToken;
import com.capstone.finance.Repository.Auth.MemberRepository;
import com.capstone.finance.Repository.Auth.VerificationTokenRepository;
import com.capstone.finance.Entity.Auth.Member;
import com.capstone.finance.Entity.Auth.VerificationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VerificationTokenService {

    private final VerificationTokenRepository verificationTokenRepository;

    //private final SmtpEmailService smtpEmailService;

    private final MemberRepository memberRepository;

    public void createVerificationToken(String username) {
        Member member = memberRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을수 없습니다"));
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setVerificationCode(token);
        verificationToken.setMember(member);
        verificationToken.setExpiryDate(calculateExpiryDate());
        verificationTokenRepository.save(verificationToken);

        //smtpEmailService.sendVerificationCode(member.getUsername(), token);
    }

    public Member verifyEmail(String token) {
        VerificationToken verificationToken = verificationTokenRepository.findByVerificationCode(token);
//        not null & 아직 유효한 시간대 이내일때
        if ((verificationToken != null) && verificationToken.getExpiryDate().isAfter(LocalDateTime.now())) {
            Member member = verificationToken.getMember();
            verificationTokenRepository.delete(verificationToken);
            return member;
        }
        return null;
    }

    private LocalDateTime calculateExpiryDate() {
        return LocalDateTime.now().plusHours(1);
    }
}
