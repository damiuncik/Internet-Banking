package com.FinalProject.FinalProject.ClientDeposit;


import com.FinalProject.FinalProject.Client.Client;
import jakarta.persistence.*;

@Entity
@Table(name = "deposits")
public class Deposit {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JoinColumn(name = "client_id",referencedColumnName = "id")
    private Client client;

    @Column(name = "amount")
    private long amount;

    @Column(name = "description")
    private String description;

    public Deposit() {
    }

    public Deposit(Client client, long amount, String description) {
        this.client = client;
        this.amount = amount;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }
}
