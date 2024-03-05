package com.FinalProject.FinalProject.ClientDeposit;

import com.FinalProject.FinalProject.Client.Client;
import com.FinalProject.FinalProject.Client.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepositService {
    private static final Logger log = LogManager.getLogger(DepositService.class);
    private final DepositRepository depositRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public DepositService(DepositRepository depositRepository, ClientRepository clientRepository) {
        this.depositRepository = depositRepository;
        this.clientRepository = clientRepository;
    }

    @Transactional
    public Deposit createDeposit(int clientId, Deposit deposit) {
        try {
            Client client = clientRepository.getOne(clientId);

            if (client == null) {
                log.error("Error creating deposit: Client not found with ID: " + clientId);
                throw new EntityNotFoundException("Client not found with ID: " + clientId);
            }

            deposit.setClient(client);
            System.out.println("Received deposit in service: " + deposit);
            Deposit savedDeposit = depositRepository.save(deposit);

            return savedDeposit;
        } catch (Exception e) {
            log.error("Error creating deposit: {}", e.getMessage(), e);
            throw new RuntimeException("Error creating deposit", e);
        }
    }

    public List<Deposit> getDepositsByClientId(int clientId) {
        return depositRepository.findByClient_Id(clientId);
    }

}


