package com.meijia.controller;

import com.meijia.model.*;
import com.meijia.config.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/create")
    public Map<String, Object> createOrder(@RequestHeader("Authorization") String auth,
                                            @RequestBody Map<String, Object> body) {
        Long userId = jwtUtil.getUserIdFromToken(auth.substring(7));
        Long productId = Long.valueOf(body.get("productId").toString());
        Integer quantity = body.get("quantity") != null ? Integer.valueOf(body.get("quantity").toString()) : 1;

        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return Map.of("success", false, "message", "商品不存在");
        }

        Product product = productOpt.get();
        Order order = new Order();
        order.setOrderNo(UUID.randomUUID().toString().replace("-", ""));
        order.setUserId(userId);
        order.setProductId(productId);
        order.setQuantity(quantity);
        order.setTotalPrice(product.getPrice() * quantity);
        order.setAddress((String) body.getOrDefault("address", ""));
        order.setReceiver((String) body.getOrDefault("receiver", ""));
        order.setPhone((String) body.getOrDefault("phone", ""));

        orderRepository.save(order);
        return Map.of("success", true, "data", order);
    }

    @GetMapping("/list")
    public Map<String, Object> listOrders(@RequestHeader("Authorization") String auth,
                                           @RequestParam(required = false) String status) {
        Long userId = jwtUtil.getUserIdFromToken(auth.substring(7));
        List<Order> orders;
        if (status != null && !status.isEmpty()) {
            orders = orderRepository.findByUserIdAndStatus(userId, status);
        } else {
            orders = orderRepository.findByUserId(userId);
        }
        return Map.of("success", true, "data", orders);
    }

    @PostMapping("/pay/{orderNo}")
    public Map<String, Object> payOrder(@PathVariable String orderNo) {
        Optional<Order> orderOpt = orderRepository.findByOrderNo(orderNo);
        if (orderOpt.isEmpty()) {
            return Map.of("success", false, "message", "订单不存在");
        }
        Order order = orderOpt.get();
        order.setStatus("paid");
        orderRepository.save(order);
        return Map.of("success", true, "message", "支付成功");
    }
}
