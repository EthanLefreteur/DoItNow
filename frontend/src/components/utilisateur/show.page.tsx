import React, { useState } from 'react';
import axios from "axios";

function Show() {
    const [error, setError] = useState('');
    let [identifiant, setIdentifiant] = useState('');
    let [mdp, setMdp] = useState('');
    let [mail, setMail] = useState('');
    let [nom, setNom] = useState('');
    let [prenom, setPrenom] = useState('');

    let id = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));

    axios.get("http://127.0.0.1:8000" + "/utilisateur/show/" + id, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }).then(
        response => {
            if (response.data.code_erreur == 200) {
                setIdentifiant(response.data.identifiant);
                setMdp(response.data.mot_de_passe);
                setMail(response.data.mail);
                setNom(response.data.nom);
                setPrenom(response.data.prenom);
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
                Identifiant: {identifiant}
            </div>
            <div>
                Mot de passe (hash): {mdp}
            </div>
            <div>
                E-Mail: {mail}
            </div>
            <div>
                Nom: {nom}
            </div>
            <div>
                Prenom: {prenom}
            </div>
            <div>
                {error}
            </div>
        </>
    );
}

export default Show;