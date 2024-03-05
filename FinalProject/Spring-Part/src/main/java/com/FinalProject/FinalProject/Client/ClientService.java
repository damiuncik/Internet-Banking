package com.FinalProject.FinalProject.Client;

import com.FinalProject.FinalProject.Client.Client;
import com.FinalProject.FinalProject.Client.ClientRepository;
import com.FinalProject.FinalProject.ClientSold.Sold;
import com.FinalProject.FinalProject.ClientSold.SoldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private SoldRepository soldRepository;

    public Client createClientWithSold(Client client, long soldAmount) {
        Client savedClient = clientRepository.save(client);

        Sold sold = new Sold();
        sold.setClient(savedClient);
        sold.setAmount(soldAmount);

        soldRepository.save(sold);

        return savedClient;
    }

    public Client getClientByUsername(String username) {
        Optional<Client> clientOptional = clientRepository.findByUsername(username);
        return clientOptional.orElse(null);
    }
}
