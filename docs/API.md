<style> yellow { color: yellow; } orange { color: orange; } black { color: black; } blue { color: lightblue; } red { color: red; } green { color: lightgreen; } white { color: white; } </style>

# Listes des routes
## /categorie
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "categories": {
        "id": int,
        "nom": string,
        "couleur": string
    }
}

### /new

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "nom": string,
    "couleur": string
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "id": int,
}

### /delete/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

### /show/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "nom": string,
    "couleur": string
}

### /edit/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "nom": string,
    "couleur": string
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

## /tache
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "taches": {
        "id": int,
        "titre": string,
        "description": string,
        "date_echeance": string (format datetime),
        "id_utilisateur": int,
        "archiver": bool,
        "date_fin_archive": string (format datetime),
        "id_categorie": int,
        "libelle_categorie": string,
        "couleur_categorie": string (format Hex),
        "id_priorite": int,
        "libelle_priorite": string,
        "id_statue": int,
        "libelle_statue": string
    }
}

### /new

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "titre": string,
    "description": string,
    "date_echeance": string (format DateTime),
    "id_utilisateur": int,
    "archiver": bool,
    "date_fin_archive": string (format datetime),
    "id_categorie": int,
    "id_priorite": int,
    "id_statut": int,
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "id": int,
}

### /delete/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

### /show/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "titre": string,
    "description": string,
    "date_echeance": string (format datetime),
    "id_utilisateur": int,
    "archiver": bool,
    "date_fin_archive": string (format datetime),
    "id_categorie": int,
    "libelle_categorie": string,
    "couleur_categorie": string,
    "id_priorite": int,
    "libelle_priorite": string,
    "id_statut": int,
    "libelle_statut": string
}

### /edit/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "titre": string,
    "description": string,
    "date_echeance": string (format DateTime),
    "id_utilisateur": int,
    "archiver": bool,
    "date_fin_archive": string (format datetime),
    "id_categorie": int,
    "libelle_categorie": string,
    "id_priorite": int,
    "libelle_priorite": string,
    "id_statue": int,
    "libelle_statue": string
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

## /utilisateur
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "utilisateurs": {
        "id": int,
        "identifiant": string,
        "adresse_mail": string
    }
}

### /new

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "identifiant": string,
    "mot_de_passe": string,
    "mail": string,
    "nom": string,
    "prenom": string
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "id": int,
}

### /delete{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

### /show{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "identifiant": string,
    "mot_de_passe": string,
    "mail": string,
    "nom": string,
    "prenom": string
}

### /edit/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "identifiant": string,
    "mot_de_passe": string,
    "mail": string,
    "nom": string,
    "prenom": string
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

## /statut
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "statuts": {
        "id": int,
        "libelle": string
    }
}

### /new

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "libelle": string,
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "id": int,
}

### /delete/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

### /show/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "libelle": string,
}

### /edit/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "libelle": string,
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

## /priorite
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "priorites": {
        "id": int,
        "libelle": string
    }
}

### /new

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "libelle": string,
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "id": int,
}

### /delete/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

### /show/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
    "libelle": string,
}

### /edit/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "libelle": string,
}

<red> Sortie
+ Json {
    "code_erreur": [int](#code_erreur),
}

## /signin

<green> Entrée
+ Form {
    identifiant: string,
    mot_de_passe: string,
    mail: string,
    nom: string,
    prenom: string
}


<red> Sortie
+ Json {
    "code_erreur": int,
    "token": token-jwt (string),
}

## /login

<green> Entrée
+ Form {
    identifiant: string,
    mot_de_passe: string,
}

<red> Sortie
+ Json {
    "code_erreur": int,
    "token": token-jwt (string),
}

## /logout

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code_erreur": int,
}


# <a name="#code_erreur"></a> Code Erreur/HTTP

### 200
Réussite

### 400
Données invalides / manquantes

### 401
Non connecté / mauvais identifiants

### 403
Non autorisé

### 501
Non implémenté