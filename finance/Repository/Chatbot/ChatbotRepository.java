package com.capstone.finance.Repository.Chatbot;

import com.capstone.finance.Entity.Chatbot.ChatbotHistoryEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ChatbotRepository extends CrudRepository<ChatbotHistoryEntity, Long> {
    @Transactional
    @Query(value="SELECT * FROM chatbot_history WHERE username=:username", nativeQuery = true)
    List<ChatbotHistoryEntity> getTablesByUsername(@Param("username") String username);
}
