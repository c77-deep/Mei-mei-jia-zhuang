package com.meijia.service;

import com.meijia.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContaining(keyword);
    }

    public List<Product> getHotProducts() {
        return productRepository.findByOrderBySalesDesc();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public void initSampleData() {
        if (productRepository.count() > 0) return;

        List<Product> products = new ArrayList<>();

        products.add(createProduct("蒙娜丽莎瓷砖 800x800", "瓷砖", 128.0, "广东佛山产，耐磨防滑", "蒙娜丽莎", 4.9));
        products.add(createProduct("九牧花洒套装 恒温淋浴", "卫浴", 1599.0, "全铜主体，恒温控制", "九牧", 4.8));
        products.add(createProduct("欧普照明 吸顶灯套餐", "灯具", 899.0, "客厅+卧室三件套", "欧普", 4.7));
        products.add(createProduct("索菲亚全屋定制 衣柜", "定制", 12800.0, "环保E0级板材", "索菲亚", 4.9));
        products.add(createProduct("立邦净味五合一 乳胶漆", "涂料", 458.0, "18L装，抗甲醛", "立邦", 4.8));
        products.add(createProduct("TATA木门 静音门", "门窗", 2680.0, "45mm厚度，静音锁", "TATA", 4.7));
        products.add(createProduct("大自然实木地板 番龙眼", "地板", 328.0, "纯实木，环保漆", "大自然", 4.8));
        products.add(createProduct("方太油烟机灶具套装", "厨电", 6999.0, "大风量，自动清洗", "方太", 4.9));
        products.add(createProduct("箭牌智能马桶 虹吸式", "卫浴", 3299.0, "自动翻盖，烘干", "箭牌", 4.7));
        products.add(createProduct("多乐士竹炭清新居 乳胶漆", "涂料", 588.0, "抗甲醛，净味", "多乐士", 4.8));

        productRepository.saveAll(products);
    }

    private Product createProduct(String name, String category, Double price, String desc, String brand, Double rating) {
        Product p = new Product();
        p.setName(name);
        p.setCategory(category);
        p.setPrice(price);
        p.setDescription(desc);
        p.setBrand(brand);
        p.setRating(rating);
        p.setSales(new Random().nextInt(500) + 100);
        return p;
    }
}
