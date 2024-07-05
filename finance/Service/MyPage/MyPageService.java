package com.capstone.finance.Service.MyPage;

import com.capstone.finance.Entity.Auth.Member;
import com.capstone.finance.Entity.MyPage.MemberDTO;
import com.capstone.finance.Repository.Auth.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyPageService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public MemberDTO getUserInfo(String username) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            return new MemberDTO(member.getId(), member.getUsername(), member.getNickname(), member.getEmail());
        }
        return null;
    }

    public MemberDTO updateUserInfo(String username, MemberDTO updatedMemberDTO) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();

            // 중복 이메일 체크
            Optional<Member> emailCheck = memberRepository.findByEmail(updatedMemberDTO.getEmail());
            if (emailCheck.isPresent() && !emailCheck.get().getId().equals(member.getId())) {
                throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
            }

            member.setNickname(updatedMemberDTO.getNickname());
            member.setEmail(updatedMemberDTO.getEmail());
            memberRepository.save(member);
            return new MemberDTO(member.getId(), member.getUsername(), member.getNickname(), member.getEmail());
        }
        return null;
    }
    public boolean updatePassword(String username, String currentPassword, String newPassword) {
        Optional<Member> memberOpt = memberRepository.findByUsername(username);
        if (memberOpt.isPresent()) {
            Member member = memberOpt.get();
            if (passwordEncoder.matches(currentPassword, member.getPassword())) {
                member.setPassword(passwordEncoder.encode(newPassword));
                memberRepository.save(member);
                return true;
            }
        }
        return false;
    }
}