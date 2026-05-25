package com.example.demo.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PrintJobRequest {

    @NotBlank(message = "Print name is required")
    private String printName;

    @NotNull(message = "Weight used is required")
    @Min(value = 0, message = "Weight used cannot be negative")
    private Double weightUsedGrams;

    @NotNull(message = "Print duration is required")
    @Min(value = 0, message = "Duration cannot be negative")
    private Integer printDurationMinutes;

    @NotBlank(message = "Status is required")
    private String status;

    @NotNull(message = "Material ID is required")
    private Long materialId;

    // Constructors
    public PrintJobRequest() {}

    public PrintJobRequest(String printName, Double weightUsedGrams, Integer printDurationMinutes, String status, Long materialId) {
        this.printName = printName;
        this.weightUsedGrams = weightUsedGrams;
        this.printDurationMinutes = printDurationMinutes;
        this.status = status;
        this.materialId = materialId;
    }

    // Getters and Setters
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

    public Long getMaterialId() {
        return materialId;
    }

    public void setMaterialId(Long materialId) {
        this.materialId = materialId;
    }
}
