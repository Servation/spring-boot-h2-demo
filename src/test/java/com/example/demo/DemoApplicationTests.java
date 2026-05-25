package com.example.demo;

import com.example.demo.dto.PrintJobRequest;
import com.example.demo.exception.InsufficientMaterialException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Material;
import com.example.demo.model.PrintJob;
import com.example.demo.service.MaterialService;
import com.example.demo.service.PrintJobService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class DemoApplicationTests {

	@Autowired
	private MaterialService materialService;

	@Autowired
	private PrintJobService printJobService;

	@Test
	void contextLoads() {
		// Verify context starts correctly
	}

	@Test
	void testCreateMaterial() {
		Material material = new Material("PLA Premium", "PLA+", "Red", 1000.0);
		Material saved = materialService.createMaterial(material);

		assertNotNull(saved.getId());
		assertEquals("PLA Premium", saved.getName());
		assertEquals(1000.0, saved.getRemainingWeightGrams());
	}

	@Test
	void testCreatePrintJobSubtractsWeight() {
		Material material = new Material("PETG Premium", "PETG", "Blue", 500.0);
		Material savedMaterial = materialService.createMaterial(material);

		PrintJobRequest request = new PrintJobRequest("Benchie", 50.0, 45, "COMPLETED", savedMaterial.getId());
		PrintJob savedJob = printJobService.createPrintJob(request);

		assertNotNull(savedJob.getId());
		assertEquals("Benchie", savedJob.getPrintName());
		assertEquals(50.0, savedJob.getWeightUsedGrams());

		// Verify weight was subtracted
		Material updatedMaterial = materialService.getMaterialById(savedMaterial.getId());
		assertEquals(450.0, updatedMaterial.getRemainingWeightGrams());
	}

	@Test
	void testCreatePrintJobInsufficientMaterialThrowsException() {
		Material material = new Material("TPU Flex", "TPU", "Black", 30.0);
		Material savedMaterial = materialService.createMaterial(material);

		PrintJobRequest request = new PrintJobRequest("Large Gear", 50.0, 120, "PENDING", savedMaterial.getId());

		assertThrows(InsufficientMaterialException.class, () -> {
			printJobService.createPrintJob(request);
		});

		// Verify weight remains unchanged
		Material updatedMaterial = materialService.getMaterialById(savedMaterial.getId());
		assertEquals(30.0, updatedMaterial.getRemainingWeightGrams());
	}

	@Test
	void testCreatePrintJobMaterialNotFoundThrowsException() {
		PrintJobRequest request = new PrintJobRequest("Ghost Print", 10.0, 30, "COMPLETED", 999L);

		assertThrows(ResourceNotFoundException.class, () -> {
			printJobService.createPrintJob(request);
		});
	}
}
