<style> yellow { color: yellow; } orange { color: orange; } black { color: black; } blue { color: lightblue; } red { color: red; } green { color: lightgreen; } white { color: white; } </style>

# Listes des routes
## /categorie
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
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
    "code-erreur": [int](#code-erreur),
    "id": int,
}

### /delete/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "id": int,
}

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
}

### /show/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]
+ Form {
    "id": int,
}

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
    "id": int,
    "nom": string,
    "couleur": string
}

## /tache
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
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

<red> Sortie
+ Aucune

### /delete/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Aucune

### /show/{id}

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Aucune

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
    identifiant: string,
    mot_de_passe: string,
    mail: string,
    nom: string,
    prenom: string
}

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
    "id": int,
}

## /statut
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
    "statuts": {
        "id": int,
        "libelle": string
    }
}

## /priorite
### /

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
    "statuts": {
        "id": int,
        "libelle": string
    }
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
    "code-erreur": int,
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
    "code-erreur": int,
    "token": token-jwt (string),
}

## /logout

<green> Entrée
+ Header de la requête:
+ + Authorization: [Token JWT]

<red> Sortie
+ Json {
    "code-erreur": int,
}


# <a name="#code-erreur"></a> Code Erreur/HTTP

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