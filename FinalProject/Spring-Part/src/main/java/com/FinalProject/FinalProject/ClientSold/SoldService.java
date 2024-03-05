package com.FinalProject.FinalProject.ClientSold;

import com.FinalProject.FinalProject.Client.Client;
import com.FinalProject.FinalProject.Client.ClientRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SoldService {


    private final SoldRepository soldRepository;
    private final ClientRepository clientRepository;

    @Autowired
    public SoldService(SoldRepository soldRepository, ClientRepository clientRepository){
        this.soldRepository = soldRepository;
        this.clientRepository=clientRepository;
    }

    public Sold createSold(int clientId , Sold sold){
        try {
            Client client = clientRepository.getOne(clientId);

            sold.setClient(client);

            Sold savedSold = soldRepository.save(sold);
            return savedSold;
        } catch (EntityNotFoundException ex) {
            throw new RuntimeException("Client not found with ID: " + clientId, ex);
        }
    }
}
