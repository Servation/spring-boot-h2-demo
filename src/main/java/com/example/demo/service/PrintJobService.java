package com.example.demo.service;

import com.example.demo.dto.PrintJobRequest;
import com.example.demo.exception.InsufficientMaterialException;
import com.example.demo.model.Material;
import com.example.demo.model.PrintJob;
import com.example.demo.repository.MaterialRepository;
import com.example.demo.repository.PrintJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PrintJobService {

    private final PrintJobRepository printJobRepository;
    private final MaterialService materialService;
    private final MaterialRepository materialRepository;

    @Autowired
    public PrintJobService(PrintJobRepository printJobRepository, MaterialService materialService, MaterialRepository materialRepository) {
        this.printJobRepository = printJobRepository;
        this.materialService = materialService;
        this.materialRepository = materialRepository;
    }

    @Transactional
    public PrintJob createPrintJob(PrintJobRequest request) {
        // Fetch material or throw ResourceNotFoundException
        Material material = materialService.getMaterialById(request.getMaterialId());

        // Verify remaining weight is sufficient
        double remainingWeight = material.getRemainingWeightGrams();
        double targetWeight = remainingWeight - request.getWeightUsedGrams();
        if (targetWeight < 0) {
            throw new InsufficientMaterialException(
                    String.format("Insufficient material. Required: %.2fg, Available: %.2fg", 
                            request.getWeightUsedGrams(), remainingWeight)
            );
        }

        // Subtract weight and save material
        material.setRemainingWeightGrams(targetWeight);
        materialRepository.save(material);

        // Create, link, and save PrintJob
        PrintJob printJob = new PrintJob(
                request.getPrintName(),
                request.getWeightUsedGrams(),
                request.getPrintDurationMinutes(),
                request.getStatus(),
                material
        );

        return printJobRepository.save(printJob);
    }
}
