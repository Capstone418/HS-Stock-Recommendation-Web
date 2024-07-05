package com.capstone.finance.Controller;

import com.capstone.finance.Service.MyPage.MyPageService;
import com.capstone.finance.Entity.MyPage.MemberDTO;
import com.capstone.finance.Entity.MyPage.PasswordUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/mypage")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;

    @GetMapping("/{username}") //정보 가져오기
    public ResponseEntity<MemberDTO> getUserInfo(@PathVariable String username) {
        MemberDTO memberDTO = myPageService.getUserInfo(username);
        if (memberDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(memberDTO);
    }

    @PutMapping("/{username}") //정보 수정
    public ResponseEntity<MemberDTO> updateUserInfo(@PathVariable String username, @RequestBody MemberDTO updatedMemberDTO) {
        MemberDTO memberDTO = myPageService.updateUserInfo(username, updatedMemberDTO);
        if (memberDTO == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(memberDTO);
    }

    @PutMapping("/{username}/password") //비밀번호 변경
    public ResponseEntity<Void> updatePassword(@PathVariable String username, @RequestBody PasswordUpdateRequest passwordUpdateRequest) {
        boolean isUpdated = myPageService.updatePassword(username, passwordUpdateRequest.getCurrentPassword(), passwordUpdateRequest.getNewPassword());
        if (isUpdated) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(400).build();
    }
}