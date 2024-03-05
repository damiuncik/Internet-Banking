package com.FinalProject.FinalProject.Controllers;


import com.FinalProject.FinalProject.ClientDeposit.Deposit;
import com.FinalProject.FinalProject.ClientDeposit.DepositRepository;
import com.FinalProject.FinalProject.ClientDeposit.DepositService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class DepositController {
   private final DepositService depositService;

    @Autowired
    public DepositController(DepositService depositService) {
        this.depositService = depositService;
    }
    @Autowired
    DepositRepository depositRepository;

    @GetMapping("/deposits")
    public ResponseEntity<List<Deposit>> getAllDeposits() {
        try {
            List<Deposit> deposits = depositRepository.findAll();

            if (deposits.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(deposits, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/deposits/{id}")
    public ResponseEntity<Deposit> getDepositById(@PathVariable("id") int id) {
        Optional<Deposit> depositData = depositRepository.findById(id);

        if (depositData.isPresent()) {
            return new ResponseEntity<>(depositData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/deposits/client/{clientId}")
    public ResponseEntity<Deposit> createDepositForClient(
            @PathVariable int clientId,
            @RequestBody Deposit deposit
    ){
        Deposit savedDeposit = depositService.createDeposit(clientId, deposit);
        return new ResponseEntity<>(savedDeposit, HttpStatus.CREATED);
    }


    @PutMapping("/deposits/{id}")
    public ResponseEntity<Deposit> updateDeposit(@PathVariable("id") int id, @RequestBody Deposit deposit) {
        Optional<Deposit> depositData = depositRepository.findById(id);
        if (depositData.isPresent()) {
            Deposit _deposit = depositData.get();
            _deposit.setAmount(deposit.getAmount());
            _deposit.setDescription(deposit.getDescription());
            return new ResponseEntity<>(depositRepository.save(_deposit), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/deposits/{id}")
    public ResponseEntity<Deposit> deleteDeposit(@PathVariable("id") int id) {
        try {
            depositRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/deposits/client/{clientId}")
    public ResponseEntity<List<Deposit>> getDepositsByClientId(@PathVariable int clientId) {
        List<Deposit> deposits = depositService.getDepositsByClientId(clientId);
        return new ResponseEntity<>(deposits, HttpStatus.OK);
    }
    @DeleteMapping("/deposits")
    public ResponseEntity<Void> deleteDepositByDescription(@RequestParam("description") String description) {
        try {
            Optional<Deposit> depositOptional = depositRepository.findByDescription(description);

            if (depositOptional.isPresent()) {
                depositRepository.delete(depositOptional.get());
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

