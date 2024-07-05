package com.capstone.finance.Repository.Auth;

import com.capstone.finance.Entity.Auth.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByUsername(String username);
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
    Optional<Member> findByUsernameAndEmail(String username, String email);
    Optional<Member> findByUsernameAndVerificationCode(String username, String verificationCode);
    Optional<Member> findByEmail(String email);
}
