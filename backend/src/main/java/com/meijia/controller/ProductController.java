package com.meijia.controller;

import com.meijia.model.Product;
import com.meijia.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/list")
    public Map<String, Object> list(@RequestParam(required = false) String category,
                                     @RequestParam(required = false) String keyword) {
        List<Product> products;
        if (category != null && !category.isEmpty()) {
            products = productService.getProductsByCategory(category);
        } else if (keyword != null && !keyword.isEmpty()) {
            products = productService.searchProducts(keyword);
        } else {
            products = productService.getAllProducts();
        }
        return Map.of("success", true, "data", products);
    }

    @GetMapping("/hot")
    public Map<String, Object> hot() {
        return Map.of("success", true, "data", productService.getHotProducts());
    }

    @GetMapping("/{id}")
    public Map<String, Object> detail(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isEmpty()) {
            return Map.of("success", false, "message", "商品不存在");
        }
        return Map.of("success", true, "data", product.get());
    }
}
