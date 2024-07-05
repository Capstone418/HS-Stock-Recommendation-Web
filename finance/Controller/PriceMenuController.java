package com.capstone.finance.Controller;

import com.capstone.finance.Entity.PriceMenu.CompanyEntity;
import com.capstone.finance.Service.PriceMenu.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class PriceMenuController {
    private ChartService chartService;

    @Autowired
    PriceMenuController(ChartService chartService){
        this.chartService=chartService;
    }

    @GetMapping(value="api/price-menu/res")
    public List<CompanyEntity> readLatestCharts(){
        List<CompanyEntity> r = chartService.getChartsAndLatestRecords();
        //for(CompanyId e : r){
        //    System.out.println("### "+e.getCode()+e.getCompany()+e.getDate()+e.getOpen()+e.getClose()+e.getVolume()+" ###");
        //}
        System.out.println("PriceMenuController size: "+r.size());
        return r;
    }

    @RequestMapping(value="api/price-menu/req")
    public List<CompanyEntity> actionChartsTable(@RequestParam("stockName") String stockName){
        System.out.println("###### req : "+stockName);

        // 숫자가 포함되어 있는지 확인
        boolean containsNumber = false;
        for (char c : stockName.toCharArray()) {
            if (Character.isDigit(c)) {
                containsNumber = true;
                break;
            }
        }

        if(stockName.isEmpty()){ // 아무것도 기입 안되어있다면, 전체 레코드 리턴
            return chartService.getChartsAndLatestRecords();
        }
        else if(!containsNumber){ // 기입 내용이 종목명이라면
            return chartService.getNameChartRecord(stockName);
        }
        else{ // 기입 내용이 종목코드라면
            return chartService.getCodeChartRecord(stockName);
        }
    }
}
