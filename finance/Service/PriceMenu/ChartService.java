package com.capstone.finance.Service.PriceMenu;

import com.capstone.finance.Entity.PriceMenu.CompanyEntity;
import com.capstone.finance.Repository.PriceMenu.ChartRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class ChartService {
    private ChartRepository chartRepository;

    ChartService(ChartRepository chartRepository){

        this.chartRepository=chartRepository;
    }

    // 로직 1 : daily_chart 전체 레코드 get & 각 종목 최신 일별 데이터 레코드만 리스트에 담기
    public List<CompanyEntity> getChartsAndLatestRecords(){
        List<CompanyEntity> allRecords = chartRepository.findAllChartBy();
        System.out.println("allRecords size: "+allRecords.size());
        return allRecords;
    }

    // 로직 2 : View Request Param(=code)를 이용해서, 해당 code 최신 일별 데이터 리턴
    public List<CompanyEntity> getCodeChartRecord(String stock){
        CompanyEntity result = chartRepository.findChartByCode(stock);
        List<CompanyEntity> tmp = new ArrayList<>();
        tmp.add(result);
        System.out.println("price-menu req(code) and server-res size: "+tmp.size());
        return tmp;
    }

    // 로직 3 : View Request Param(=company 이름)를 이용해서, 해당 code 최신 일별 데이터 리턴
    public List<CompanyEntity> getNameChartRecord(String company){
        List<CompanyEntity> result = chartRepository.findChartByCompany(company);
        List<CompanyEntity> tmp = new ArrayList<>(result);
        System.out.println("price-menu req(name) and server-res size: "+tmp.size());
        return tmp;
    }
}
