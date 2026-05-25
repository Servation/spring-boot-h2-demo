package com.example.demo.controller;

import com.example.demo.dto.PrintJobRequest;
import com.example.demo.model.PrintJob;
import com.example.demo.service.PrintJobService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/print-jobs")
@CrossOrigin(origins = "*")
public class PrintJobController {

    private final PrintJobService printJobService;

    @Autowired
    public PrintJobController(PrintJobService printJobService) {
        this.printJobService = printJobService;
    }

    @PostMapping
    public ResponseEntity<PrintJob> createPrintJob(@Valid @RequestBody PrintJobRequest request) {
        PrintJob created = printJobService.createPrintJob(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
}
