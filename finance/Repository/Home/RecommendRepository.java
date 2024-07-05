package com.capstone.finance.Repository.Home;

import com.capstone.finance.Entity.Home.RecommendEntity;
import org.springframework.data.repository.CrudRepository; // JPA, JPARepository


// JPA를 통해 DB CRUD 기능 손쉽게 쓰기 가능.
// 제공 함수: findAll(조회), save(저장), findById, deleteById, ...
public interface RecommendRepository extends CrudRepository<RecommendEntity,String> {

}
