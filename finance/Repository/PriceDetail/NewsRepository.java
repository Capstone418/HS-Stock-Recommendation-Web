package com.capstone.finance.Repository.PriceDetail;

import com.capstone.finance.Entity.PriceDetail.NewsEntity;
import com.capstone.finance.Entity.PriceDetail.NewsId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NewsRepository extends CrudRepository<NewsEntity, NewsId> {
}
