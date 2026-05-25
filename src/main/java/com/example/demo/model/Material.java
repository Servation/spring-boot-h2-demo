package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "materials")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Material name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Material type is required (e.g., PLA+, TPU, PETG)")
    @Column(nullable = false)
    private String type;

    @NotBlank(message = "Color is required")
    @Column(nullable = false)
    private String color;

    @NotNull(message = "Remaining weight is required")
    @Min(value = 0, message = "Remaining weight cannot be negative")
    @Column(name = "remaining_weight_grams", nullable = false)
    private Double remainingWeightGrams;

    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PrintJob> printJobs = new ArrayList<>();

    // Constructors
    public Material() {}

    public Material(String name, String type, String color, Double remainingWeightGrams) {
        this.name = name;
        this.type = type;
        this.color = color;
        this.remainingWeightGrams = remainingWeightGrams;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Double getRemainingWeightGrams() {
        return remainingWeightGrams;
    }

    public void setRemainingWeightGrams(Double remainingWeightGrams) {
        this.remainingWeightGrams = remainingWeightGrams;
    }

    public List<PrintJob> getPrintJobs() {
        return printJobs;
    }

    public void setPrintJobs(List<PrintJob> printJobs) {
        this.printJobs = printJobs;
    }

    // Helper methods to maintain bidirectional relationship
    public void addPrintJob(PrintJob printJob) {
        printJobs.add(printJob);
        printJob.setMaterial(this);
    }

    public void removePrintJob(PrintJob printJob) {
        printJobs.remove(printJob);
        printJob.setMaterial(null);
    }
}
