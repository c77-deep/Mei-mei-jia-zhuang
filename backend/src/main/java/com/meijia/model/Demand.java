package com.meijia.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "demands")
public class Demand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(length = 50)
    private String houseType;

    private Integer area;

    @Column(length = 100)
    private String city;

    @Column(length = 50)
    private String style;

    @Column(length = 50)
    private String budget;

    @Column(length = 20)
    private String decorationType;

    @Column(length = 500)
    private String description;

    @Column(length = 1000)
    private String images;

    private String status = "pending";

    private LocalDateTime createTime = LocalDateTime.now();

    public Demand() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getHouseType() { return houseType; }
    public void setHouseType(String houseType) { this.houseType = houseType; }
    public Integer getArea() { return area; }
    public void setArea(Integer area) { this.area = area; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getStyle() { return style; }
    public void setStyle(String style) { this.style = style; }
    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }
    public String getDecorationType() { return decorationType; }
    public void setDecorationType(String decorationType) { this.decorationType = decorationType; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImages() { return images; }
    public void setImages(String images) { this.images = images; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getCreateTime() { return createTime; }
    public void setCreateTime(LocalDateTime createTime) { this.createTime = createTime; }
}
