package com.meijia.model;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DemandRepository extends JpaRepository<Demand, Long> {
    List<Demand> findByUserId(Long userId);
    List<Demand> findByStatus(String status);
}
