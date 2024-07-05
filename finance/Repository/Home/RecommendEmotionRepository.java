package com.capstone.finance.Repository.Home;

import com.capstone.finance.Entity.Home.RecommendEmotionEntity;
import com.capstone.finance.Entity.Home.RecommendEmotionId;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface RecommendEmotionRepository extends CrudRepository<RecommendEmotionEntity, RecommendEmotionId> {
}
