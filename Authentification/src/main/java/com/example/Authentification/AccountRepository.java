package com.example.Authentification;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface AccountRepository extends MongoRepository<Account,String> {

    Account findByuserName(String userName);
    List<Account> findAll();
    Account findByemail(String email);

    
    @Query("{'username': ?0}")
    void setonlineByusername(String username);

} 
    
