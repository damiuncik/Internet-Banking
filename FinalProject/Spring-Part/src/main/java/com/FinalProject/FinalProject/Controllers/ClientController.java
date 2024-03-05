package com.FinalProject.FinalProject.Controllers;


import com.FinalProject.FinalProject.Client.Client;
import com.FinalProject.FinalProject.Client.ClientRepository;
import com.FinalProject.FinalProject.Client.ClientService;
import com.FinalProject.FinalProject.ClientSold.Sold;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api")
public class ClientController {

    private final ClientService clientService;


    @Autowired
    ClientRepository clientRepository;

    @Autowired
    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/client")
    public ResponseEntity<List<Client>> getAllClient(){
        try {
            List<Client> clients = new ArrayList<Client>();

            if (clients.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(clients,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/client/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable("id") int id){
        Optional<Client> clientData = clientRepository.findById(id);

        if(clientData.isPresent()){
            return new ResponseEntity<>(clientData.get(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/client")
    public ResponseEntity<?> createClient(@RequestBody Client client){
        if (clientRepository.existsByUsername(client.getUsername())) {
            return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
        }
        try {
            Client _client = clientRepository.save(client);
            return new ResponseEntity<>(_client, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/client/login")
    public ResponseEntity<?> loginClient(@RequestBody Client client) {
        Optional<Client> user = clientRepository.findByUsername(client.getUsername());

        if (user.isPresent()) {
            Client storedUser = user.get();
            if (storedUser.getPassword().equals(client.getPassword())) {
                return ResponseEntity.ok("{\"message\": \"Login successful\", \"id\": " + storedUser.getId() + "}");
            } else {
                return ResponseEntity.badRequest().body("{\"message\": \"Invalid username or password\"}");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"User not found\"}");
        }
    }




    @PutMapping("/client/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable("id") int id, @RequestBody Sold sold){
        Optional<Client> clientData = clientRepository.findById(id);
        if(clientData.isPresent()){
            Client _client = clientData.get();
            _client.setUsername(_client.getUsername());
            _client.setPassword(_client.getPassword());
            return new ResponseEntity<>(clientRepository.save(_client),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/client/{id}")
    public ResponseEntity<Client> deleteClient(@PathVariable("id") int id){
        try{
            clientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/client/username/{username}")
    public ResponseEntity<Client> getClientByUsername(@PathVariable String username) {
        Client client = clientService.getClientByUsername(username);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
