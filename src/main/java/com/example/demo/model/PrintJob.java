package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "print_jobs")
public class PrintJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Print name is required")
    @Column(name = "print_name", nullable = false)
    private String printName;

    @NotNull(message = "Weight used is required")
    @Min(value = 0, message = "Weight used cannot be negative")
    @Column(name = "weight_used_grams", nullable = false)
    private Double weightUsedGrams;

    @NotNull(message = "Print duration is required")
    @Min(value = 0, message = "Duration cannot be negative")
    @Column(name = "print_duration_minutes", nullable = false)
    private Integer printDurationMinutes;

    @NotBlank(message = "Status is required")
    @Column(nullable = false)
    private String status; // e.g. "PENDING", "RUNNING", "COMPLETED", "FAILED"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", nullable = false)
    @JsonIgnore // Prevent infinite recursion during JSON serialization
    private Material material;

    // Constructors
    public PrintJob() {}

    public PrintJob(String printName, Double weightUsedGrams, Integer printDurationMinutes, String status, Material material) {
        this.printName = printName;
        this.weightUsedGrams = weightUsedGrams;
        this.printDurationMinutes = printDurationMinutes;
        this.status = status;
        this.material = material;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrintName() {
        return printName;
    }

    public void setPrintName(String printName) {
        this.printName = printName;
    }

    public Double getWeightUsedGrams() {
        return weightUsedGrams;
    }

    public void setWeightUsedGrams(Double weightUsedGrams) {
        this.weightUsedGrams = weightUsedGrams;
    }

    public Integer getPrintDurationMinutes() {
        return printDurationMinutes;
    }

    public void setPrintDurationMinutes(Integer printDurationMinutes) {
        this.printDurationMinutes = printDurationMinutes;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Material getMaterial() {
        return material;
    }

    public void setMaterial(Material material) {
        this.material = material;
    }
}
