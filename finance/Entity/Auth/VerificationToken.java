package com.capstone.finance.Entity.Auth;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "verification_token")
public class VerificationToken {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String verificationCode;
    private LocalDateTime expiryDate;

    @OneToOne(targetEntity = Member.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "member_id")
    private Member member;

}
