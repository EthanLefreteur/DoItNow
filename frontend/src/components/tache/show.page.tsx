import React, { useState } from 'react';
import axios from "axios";

function Show() {
    const [error, setError] = useState('');
    let [titre, setTitre] = useState('');
    let [description, setDesc] = useState('');
    let [date_echeance, setDateEcheance] = useState('');
    let [id_utilisateur, setIdUser] = useState('');
    let [archiver, setArchiver] = useState('');
    let [date_fin_archive, setDataFinArchive] = useState('');
    let [id_categorie, setIdCategorie] = useState('');
    let [libelle_categorie, setLibelleCategorie] = useState('');
    let [couleur_categorie, setCouleurCategorie] = useState('');
    let [id_priorite, setIdPriorite] = useState('');
    let [libelle_priorite, setLibellePriorite] = useState('');
    let [id_statut, setIdStatut] = useState('');
    let [libelle_statut, setLibelleStatut] = useState('');

    let id = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));

    axios.get("http://127.0.0.1:8000" + "/tache/show/" + id, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }).then(
        response => {
            if (response.data.code_erreur == 200) {
                setTitre(response.data.titre);
                setDesc(response.data.description);
                setDateEcheance(response.data.date_echeance);
                setIdUser(response.data.id_utilisateur);
                setArchiver(response.data.archiver);
                setDataFinArchive(response.data.date_fin_archive);
                setIdCategorie(response.data.id_categorie);
                setLibelleCategorie(response.data.libelle_categorie);
                setCouleurCategorie(response.data.couleur_categorie);
                setIdStatut(response.data.id_statut);
                setLibelleStatut(response.data.libelle_statut);
                setIdPriorite(response.data.id_priorite);
                setLibellePriorite(response.data.libelle_priorite);
            } else {
                setError("Couldn't fetch data");
            }
        }
    )

    return (
        <>
            <h1> Statut </h1>
            <div>
                Id: {id}
            </div>
            <div>
                Titre: {titre}
            </div>
            <div>
                Description: {description}
            </div>
            <div>
                Date d'échéance: {date_echeance}
            </div>
            <div>
                Id Utilisateur: {id_utilisateur}
            </div>
            <div>
                En archive: {archiver}
            </div>
            <div>
                Date de fin de l'Archive: {date_fin_archive}
            </div>
            <div>
                Catégorie: {libelle_categorie}
            </div>
            <div>
                Statut: {libelle_statut}
            </div>
            <div>
                Priorité: {libelle_priorite}
            </div>
            <div>
                {error}
            </div>
        </>
    );
}

export default Show;