package com.meijia.controller;

import com.meijia.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/init")
public class InitController {

    @Autowired
    private ProductService productService;

    @GetMapping("/data")
    public Map<String, Object> initData() {
        productService.initSampleData();
        return Map.of("success", true, "message", "示例数据初始化完成");
    }
}
