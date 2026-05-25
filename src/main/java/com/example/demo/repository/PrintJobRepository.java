package com.example.demo.repository;

import com.example.demo.model.PrintJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PrintJobRepository extends JpaRepository<PrintJob, Long> {
    // Find all print jobs associated with a specific material ID
    List<PrintJob> findByMaterialId(Long materialId);
}
