package com.meijia.controller;

import com.meijia.model.*;
import com.meijia.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/demand")
public class DemandController {

    @Autowired
    private DemandRepository demandRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/create")
    public Map<String, Object> createDemand(@RequestHeader("Authorization") String auth,
                                             @RequestBody Demand demand) {
        Long userId = jwtUtil.getUserIdFromToken(auth.substring(7));
        demand.setUserId(userId);
        demandRepository.save(demand);
        return Map.of("success", true, "data", demand);
    }

    @GetMapping("/list")
    public Map<String, Object> listDemands(@RequestHeader("Authorization") String auth) {
        Long userId = jwtUtil.getUserIdFromToken(auth.substring(7));
        return Map.of("success", true, "data", demandRepository.findByUserId(userId));
    }

    @GetMapping("/all")
    public Map<String, Object> allDemands() {
        return Map.of("success", true, "data", demandRepository.findByStatus("pending"));
    }
}
