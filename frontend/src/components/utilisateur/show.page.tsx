import React, { useState } from 'react';
import axios from "axios";
import '../../style/userShow.css';

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
        <div className="split-screen">

            {/* Partie Gauche */}
            <div className="left-pane">
                { }
                <h1>User</h1>
            </div>

            {/* Partie Droite */}
            <div className="right-pane">

                <div className="user-grid">

                    {/* ID */}
                    <div className="info-group">
                        <span className="label">ID</span>
                        <div className="value-box">{id}</div>
                    </div>

                    {/* Identifiant */}
                    <div className="info-group">
                        <span className="label">Identifiant</span>
                        <div className="value-box">{identifiant || "-"}</div>
                    </div>

                    {/* Nom */}
                    <div className="info-group">
                        <span className="label">Nom</span>
                        <div className="value-box">{nom || "-"}</div>
                    </div>

                    {/* Prénom */}
                    <div className="info-group">
                        <span className="label">Prénom</span>
                        <div className="value-box">{prenom || "-"}</div>
                    </div>

                    {/* Email (Pleine largeur) */}
                    <div className="info-group full-width">
                        <span className="label">E-Mail</span>
                        <div className="value-box">{mail || "-"}</div>
                    </div>

                    { }
                    <div className="info-group full-width">
                        <span className="label">Mot de passe (Hash)</span>
                        <div className="value-box" style={{ fontSize: '0.8rem' }}>
                            {mdp || "********"}
                        </div>
                    </div>

                    {/* Erreur */}
                    {error && <div className="error-msg">{error}</div>}

                </div>
            </div>
        </div>
    );
}

export default Show;