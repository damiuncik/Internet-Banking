package com.FinalProject.FinalProject.ClientSold;

import com.FinalProject.FinalProject.Client.Client;

import jakarta.persistence.*;

@Entity
@Table(name = "solds")
public class Sold {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @OneToOne
    @JoinColumn(name = "client_id",referencedColumnName = "id")
    private Client client;

    @Column(name = "amount")
    private long amount;

    public Sold() {
    }

    public Sold(Client client, long amount) {
        this.client = client;
        this.amount = amount;
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

    public void setClient_id(Long clientId) {

    }

}
