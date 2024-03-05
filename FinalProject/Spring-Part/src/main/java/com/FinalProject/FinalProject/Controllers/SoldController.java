package com.FinalProject.FinalProject.Controllers;


import com.FinalProject.FinalProject.ClientSold.Sold;
import com.FinalProject.FinalProject.ClientSold.SoldRepository;
import com.FinalProject.FinalProject.ClientSold.SoldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static java.rmi.server.LogStream.log;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class SoldController {

    @Autowired
    SoldRepository soldRepository;
    private final SoldService soldService;

    @Autowired
    public SoldController(SoldService soldService, SoldRepository soldRepository){
        this.soldService = soldService;
    }

    @GetMapping("/sold")
    public ResponseEntity<List<Sold>> getAllSold() {
        System.out.println("Something");
        try {
            List<Sold> solds = soldRepository.findAll();

            if (solds.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(solds, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/sold/{client_id}")
    public ResponseEntity<Sold> getSoldByClientId(@PathVariable("client_id") int clientId) {
        Optional<Sold> soldData = soldRepository.findByClientId(clientId);
        if (soldData.isPresent()) {
            return new ResponseEntity<>(soldData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/sold")
    public ResponseEntity<Sold> createSold(@RequestBody Sold sold) {
        try {
            Sold _sold = soldRepository.save(sold);
            return new ResponseEntity<>(_sold, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/sold/client/{clientId}")
    public ResponseEntity<Sold> createSoldForClient(
            @PathVariable int clientId,
            @RequestBody Sold sold
    ){
        Sold savedSold = soldService.createSold(clientId, sold);
        return new ResponseEntity<>(savedSold,HttpStatus.CREATED);
    }

    @PutMapping("/sold/{clientId}")
    public ResponseEntity<Sold> updateSold(@PathVariable("clientId") int clientId, @RequestBody Sold sold) {
        Optional<Sold> soldData = soldRepository.findByClientId(clientId);
        if (soldData.isPresent()) {
            Sold _sold = soldData.get();
            _sold.setAmount(sold.getAmount());
            return new ResponseEntity<>(soldRepository.save(_sold), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/sold/{id}")
    public ResponseEntity<Sold> deleteSold(@PathVariable("id") int id) {
        try {
            soldRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

