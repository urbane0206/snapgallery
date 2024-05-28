package com.example.Authentification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);
    private String CLIENT_ID = "Ov23likhB2rCIFONu2Wq";
    private String CLIENT_SECRET = "712c6b35b179fdfaa3a69dea563d97f1b4bf4498";

    @Autowired
    private AccountRepository repository;

    // Création d'un compte et Connexion (si nouveau compte)

    @PostMapping("/login/create-account")
    public ResponseEntity<String> Authentification(@RequestBody Account account) {
        if (repository.findByuserName(account.userName) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Le nom d'utilisateur est déjà pris. Veuillez en choisir un autre.");
        } else {
            String newId = String.valueOf(repository.count() + 1);
            String dateOfDay = LocalDate.now().toString();
            repository.save(new Account(newId, account.userName, account.password, dateOfDay, account.email, true,
                    account.nom, account.prenom, account.dateDeNaissance));
            return ResponseEntity.status(HttpStatus.CREATED).body("Compte créé avec succès !");
        }
    }

    // Connexion à un compte déjà existant

    @PostMapping("/login")
    public ResponseEntity<Account> Login(@RequestBody Account account) {
        Account accountConnection = repository.findByemail(account.email);
        if (accountConnection != null) {
            if (account.password.equals(accountConnection.password)) {
                accountConnection.setOnline(true);
                repository.save(accountConnection);
                return ResponseEntity.ok(accountConnection);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    // Connexion ou inscription avec des infos Github

    @PostMapping("/connect-by-github")
    public ResponseEntity<Account> ConnexionByGithub(@RequestBody Account account) {
        Account accountConnection = repository.findByuserName(account.userName);
        if (accountConnection != null) {
            accountConnection.setOnline(true);
            repository.save(accountConnection);
            return ResponseEntity.ok(accountConnection);
        } else {
            String newId = String.valueOf(repository.count() + 1);
            String dateOfDay = LocalDate.now().toString();
            if (account.email == null) {
                account.email = "githubaccount";
            }
            repository.save(new Account(newId, account.userName, "github", dateOfDay, account.email, true, "github",
                    "github ", "github"));
            return null;
        }

    }

    // Deconnexion d'un compte

    @PostMapping("/parameter/account")
    public ResponseEntity<String> Deconnection(@RequestBody Account account) {
        Account accountConnection = repository.findByuserName(account.userName);
        if (repository.findByuserName(account.userName) != null) {
            logger.info(accountConnection.userName);
            accountConnection.setOnline(false);
            logger.info(String.valueOf(accountConnection.online));
            repository.save(accountConnection);
            return ResponseEntity.ok("L'utilisateur a été déconnecté avec succès.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Le compte utilisateur n'a pas été trouvé.");
        }
    }

    // Avoir les informations d'un compte

    @GetMapping("/{userName}")
    public Account getAccountByUserName(@PathVariable("userName") String userName) {
        return repository.findByuserName(userName);
    }
    // Avoir tout les comptes déjà crées

    @GetMapping("/all-account")
    public List<Account> AllAccount() {
        return repository.findAll();
    }

    @GetMapping("/User-connected")
    public Account getAccountConnected() {
        List<Account> listeCompte = new ArrayList<>();
        listeCompte = repository.findAll();
        for (Account account : listeCompte) {
            if (account.online == true) {
                return account;
            }
        }
        return null;
    }

    @PostMapping("/get-Token")
    public ResponseEntity<String> exchangeCodeForToken(@RequestBody codeToToken code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", CLIENT_ID);
        params.add("client_secret", CLIENT_SECRET);
        params.add("code", code.code);
        params.add("redirect_uri", "http://localhost:5173/login");

        String url = "https://github.com/login/oauth/access_token";
        String authHeader = AuthHeaderBuilder.buildBasicAuthHeader(code.client_id, code.client_secret);
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", authHeader);
        headers.set("User-Agent", "snapgallery");

        @SuppressWarnings("rawtypes")
        HttpEntity<MultiValueMap> requestEntity = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.POST, requestEntity,
                    String.class);
            return responseEntity;

        } catch (Exception e) {
            logger.error("Une erreur s'est produite lors de l'envoi de la requête : " + e.getMessage());
        }
        return null;
    }

}
