package com.FinalProject.FinalProject.ClientDeposit;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DepositRepository extends JpaRepository<Deposit,Integer> {
    List<Deposit> findByClient_Id(int clientId);
    Optional<Deposit> findByDescription(String description);
}
