package com.FinalProject.FinalProject.ClientSold;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SoldRepository extends JpaRepository<Sold,Integer> {

    Optional<Sold> findByClientId(int clientId);
}
