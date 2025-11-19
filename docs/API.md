<style> yellow { color: yellow; } orange { color: orange; } black { color: black; } blue { color: lightblue; } red { color: red; } green { color: lightgreen; } white { color: white; } </style>

# Listes des routes
## /categorie
### /

<green> Entrée
+ Aucune

<red> Sortie
+ Json {
    "categories": {
        "id": int,
        "nom": string,
        "couleur": string
    }
}

### /new

<green> Entrée
+ Form {
    "libelle": string,
    "couleur": string
}

<red> Sortie
+ Json {
    "code-erreur": [int](#code-erreur),
}

### /delete/{id}

<green> Entrée
+ Aucune

<red> Sortie
+ Aucune

### /show/{id}

<green> Entrée
+ Aucune

<red> Sortie
+ Aucune

## /tache
### /

<green> Entrée
+ Aucune

<red> Sortie
+ Json {
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
+ Aucune

<red> Sortie
+ Aucune

### /delete/{id}

<green> Entrée
+ Aucune

<red> Sortie
+ Aucune

### /show/{id}

<green> Entrée
+ Aucune

<red> Sortie
+ Aucune

## /utilisateur
### /

<green> Entrée
+ Aucune

<red> Sortie
+ Json {
    "utilisateurs": {
        "id": int,
        "identifiant": string,
        "adresse_mail": string
    }
}

## /statut
### /

<green> Entrée
+ Aucune

<red> Sortie
+ Json {
    "statuts": {
        "id": int,
        "libelle": string
    }
}

## /priorite
### /

<green> Entrée
+ Aucune

<red> Sortie
+ Json {
    "statuts": {
        "id": int,
        "libelle": string
    }
}

## /login

<green> Entrée
+ Aucune

<red> Sortie
+ Json {
    "code-erreur": int,
    "token": token-jwt (string),
}


# <a name="#code-erreur"></a> Code Erreur