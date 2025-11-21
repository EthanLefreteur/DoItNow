import React, { useState, useEffect } from "react";
import axios from "axios";

interface Utilisateur {
    id: number;
    identifiant: string;
    mail: string;
    nom: string;
    prenom: string;
}

interface ApiShow {
    code_erreur: number;
    identifiant: string;
    mot_de_passe: string;
    mail: string;
    nom: string;
    prenom: string;
}

interface ApiList {
    code_erreur: number;
    utilisateurs: Utilisateur[];
}

const ShowUser: React.FC = () => {
    const [error, setError] = useState<string>("");
    const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

    const [identifiant, setIdentifiant] = useState<string>("");
    const [mdp, setMdp] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [nom, setNom] = useState<string>("");
    const [prenom, setPrenom] = useState<string>("");

    const [users, setUsers] = useState<Utilisateur[]>([]);

    const id = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));

    useEffect(() => {
        axios.get<ApiShow>(`http://127.0.0.1:8000/utilisateur/show/${id}`, {
            headers: { "Authorization": localStorage.getItem("token") || "" }
        })
            .then(response => {
                if (response.data.code_erreur === 200) {
                    setIdentifiant(response.data.identifiant);
                    setMdp(response.data.mot_de_passe);
                    setMail(response.data.mail);
                    setNom(response.data.nom);
                    setPrenom(response.data.prenom);
                } else {
                    setError("Impossible de récupérer l'utilisateur");
                }
            })
            .catch(() => setError("Erreur API (show)"));
    }, [id]);

    useEffect(() => {
        axios.get<ApiList>("http://127.0.0.1:8000/utilisateur/show", {
            headers: { "Authorization": localStorage.getItem("token") || "" }
        })
            .then(response => {
                if (response.data.code_erreur === 200) {
                    setUsers(response.data.utilisateurs);
                } else {
                    setError("Impossible de récupérer la liste des utilisateurs");
                }
            })
            .catch(() => setError("Erreur API (liste)"))
            .finally(() => setLoadingUsers(false));
    }, []);

    return (
        <>
            <h1>Utilisateur : {identifiant}</h1>
            <div>Statut (admin) : {localStorage.getItem("isAdmin")}</div>

            <h2>Détails</h2>
            <div>ID : {id}</div>
            <div>Identifiant : {identifiant}</div>
            <div>Mot de passe (hash) : {mdp}</div>
            <div>Email : {mail}</div>
            <div>Nom : {nom}</div>
            <div>Prénom : {prenom}</div>

            <h2>Tous les utilisateurs</h2>
            {loadingUsers && <div>Chargement...</div>}
            {!loadingUsers && users.length === 0 && <div>Aucun utilisateur trouvé.</div>}
            {users.map((u) => (
                <div key={u.id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
                    <strong>{u.nom} {u.prenom}</strong>
                    <br />
                    ID : {u.id} — {u.identifiant} — {u.mail}
                </div>
            ))}

            {error && <div style={{ color: "red" }}>{error}</div>}
        </>
    );
};

export default ShowUser;
