package com.example.Authentification;


///import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.io.InputStreamResource;

import org.springframework.http.ResponseEntity;
///import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//import org.springframework.core.io.ClassPathResource;
//import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;

//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;



@RestController
public class AccountController {

    @Autowired
    private AccountRepository repository;

    //@GetMapping("/")
    //public ResponseEntity<Resource> home() throws IOException {
    //    ClassPathResource resource = new ClassPathResource("static/index.html");
    //    byte[] data = Files.readAllBytes(Path.of(resource.getURI()));
    //    return ResponseEntity.ok()
    //            .contentType(MediaType.TEXT_HTML)
    //            .body(new InputStreamResource(resource.getInputStream()));
    //}

   ////Création d'un compte et Connexion (si nouveau compte)

   @PostMapping("/login/create-account")
   public ResponseEntity<String> Authentification(@RequestBody Account account){
       if (repository.findByuserName(account.userName)!= null){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Le nom d'utilisateur est déjà pris. Veuillez en choisir un autre.");
       }
       else{
           String newId = String.valueOf(repository.count()+1);
           String dateOfDay = LocalDate.now().toString();
           repository.save(new Account(newId, account.userName, account.password, dateOfDay, account.email,true));
           return ResponseEntity.status(HttpStatus.CREATED).body("Compte créé avec succès !");
       }
   }

   /// Connexion à un compte déjà existant

   @PostMapping("/login")
   public ResponseEntity<String> Login(@RequestBody Account account){
       Account accountConnection = repository.findByuserName(account.userName);
       if(accountConnection!= null){
           if(account.password.equals(accountConnection.password)){
               accountConnection.setOnline();
               repository.save(accountConnection);
               return ResponseEntity.ok("L'utilisateur est connecté avec succès.");
           }
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Mot de passe incorrect.");
       }
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Nom d'utilisateur non trouvé.");
   }


   /// Deconnexion d'un compte

   @PostMapping("/parameter/account")
   public ResponseEntity<String> Deconnection(@RequestBody Account account){
       Account accountConnection = repository.findByuserName(account.userName);
       if (repository.findByuserName(account.userName)!= null){
           accountConnection.setOnline();
           repository.save(accountConnection);
           return ResponseEntity.ok("L'utilisateur a été déconnecté avec succès.");
       }
       else{
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Le compte utilisateur n'a pas été trouvé.");
       }
   }

   /// Avoir les informations d'un compte

   @GetMapping("/{userName}")
   public Account getAccountByUserName(@PathVariable("userName") String userName){
       return repository.findByuserName(userName);
   }
   /// Avoir tout les comptes déjà crées

   @GetMapping("/all-account")
   public List<Account> AllAccount(){
       return repository.findAll();
   }

   ///@GetMapping("/deleteAll")
   ///public void deleteAll(){
   ///    repository.deleteAll();
   //}

    ///@GetMapping("/dieudonne")
    //public Map<String,Object> currentUser(OAuth2AuthenticationToken OAuth2AuthentificationToken){
    //   return OAuth2AuthentificationToken.getPrincipal().getAttributes();
    //}

    
}
