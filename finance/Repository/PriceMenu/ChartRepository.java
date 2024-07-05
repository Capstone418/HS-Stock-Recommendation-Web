package com.capstone.finance.Repository.PriceMenu;

import com.capstone.finance.Entity.PriceMenu.CompanyEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChartRepository extends CrudRepository<CompanyEntity, String> {
    @Query(value = "SELECT d.code,d.date,c.company,d.open,d.close,d.volume FROM daily_chart d, company_info c WHERE (d.code,d.date) in (SELECT code,MAX(date) FROM daily_chart GROUP BY code) AND d.code=c.code AND d.code = :code", nativeQuery = true)
    CompanyEntity findChartByCode(@Param("code") String stock);

    @Query(value="SELECT d.code,d.date,c.company,d.open,d.close,d.volume FROM daily_chart d, company_info c WHERE (d.code,d.date) in (SELECT code,MAX(date) FROM daily_chart GROUP BY code) AND d.code=c.code", nativeQuery = true)
    List<CompanyEntity> findAllChartBy();

    @Query(value = "SELECT d.code,d.date,c.company,d.open,d.close,d.volume FROM daily_chart d, company_info c WHERE (d.code,d.date) in (SELECT code,MAX(date) FROM daily_chart GROUP BY code) AND d.code=c.code AND c.company LIKE CONCAT('%', :company, '%')", nativeQuery = true)
    List<CompanyEntity> findChartByCompany(@Param("company") String company);
}
