import React, { useEffect, useState } from "react";
import axios from "axios";

interface Tache {
    id: number;
    titre: string;
    description: string;
    date_echeance: string;
    id_statut: number;
    libelle_statut: string;
    id_categorie: number;
    libelle_categorie: string;
    couleur_categorie: string;
}

export default function TacheList() {
    const [taches, setTaches] = useState<Tache[]>([]);
    const [filtered, setFiltered] = useState<Tache[]>([]);

    const [filtreStatut, setFiltreStatut] = useState<string>("");
    const [filtreCategorie, setFiltreCategorie] = useState<string>("");

    // ---- Récupération des tâches ----
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/tache/list", {
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                },
            })
            .then((res) => {
                if (res.data.code_erreur === 200) {
                    setTaches(res.data.data);
                    setFiltered(res.data.data);
                }
            })
            .catch(() => { });
    }, []);

    // ---- Filtrage ----
    useEffect(() => {
        let result = [...taches];

        if (filtreStatut !== "") {
            result = result.filter(
                (t: Tache) => t.id_statut === Number(filtreStatut)
            );
        }

        if (filtreCategorie !== "") {
            result = result.filter(
                (t: Tache) => t.id_categorie === Number(filtreCategorie)
            );
        }

        setFiltered(result);
    }, [filtreStatut, filtreCategorie, taches]);

    return (
        <div className="task-form-container">
            <h1>Liste des tâches</h1>

            {/* FILTRES */}
            <div className="form-row">
                {/* Filtre Statut */}
                <div className="form-group">
                    <label>Filtrer par statut :</label>
                    <select
                        value={filtreStatut}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setFiltreStatut(e.target.value)
                        }
                    >
                        <option value="">Tous</option>
                        <option value="1">À faire</option>
                        <option value="2">En cours</option>
                        <option value="3">Terminé</option>
                    </select>
                </div>

                {/* Filtre Catégorie */}
                <div className="form-group">
                    <label>Filtrer par catégorie :</label>
                    <select
                        value={filtreCategorie}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setFiltreCategorie(e.target.value)
                        }
                    >
                        <option value="">Toutes</option>
                        <option value="1">Perso</option>
                        <option value="2">Travail</option>
                        <option value="3">Urgent</option>
                    </select>
                </div>
            </div>

            {/* LISTE DES TÂCHES */}
            {filtered.map((tache) => (
                <div
                    key={tache.id}
                    style={{
                        padding: "15px",
                        margin: "10px 0",
                        background: "#fafafa",
                        borderLeft: `5px solid ${tache.couleur_categorie}`,
                    }}
                >
                    <h3>{tache.titre}</h3>
                    <p>{tache.description}</p>

                    <small>Statut : {tache.libelle_statut}</small>
                    <br />
                    <small>Catégorie : {tache.libelle_categorie}</small>
                    <br />
                    <small>Échéance : {tache.date_echeance}</small>
                </div>
            ))}
        </div>
    );
}
