package com.capstone.finance.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("api/data")
    public String test() {
        return "React로 데이터 전송!";
    }
}
