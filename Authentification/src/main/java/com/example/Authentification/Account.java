package com.example.Authentification;

import org.springframework.data.annotation.Id;

public class Account{

    @Id
    public String id;
    public String nom;
    public String prenom;
    public String dateDeNaissance;
    public String userName;
    public String password;
    public String dateDeCreation;
    public String email;
    public boolean online;

    public Account(){}

    public Account(String id, String userName, String password, String dateDeCreation, String email , boolean online , String nom , String prenom , String dateDeNaissance) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.dateDeCreation = dateDeCreation;
        this.email = email ;
        this.nom = nom;
        this.prenom = prenom;
        this.dateDeNaissance = dateDeNaissance;
        this.online = online;
    }

    public String getuserName() {
        return this.userName;
    }

    public void setOnline() {
        if (this.online == true) {
            this.online = false;
        }
        else{
            this.online = true;
        }
    }

}
