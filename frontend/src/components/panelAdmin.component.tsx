import React from "react";
import { useNavigate } from "react-router-dom";
import '../style/adminPanel.css';

export default function AdminPanel() {
    const navigate = useNavigate();

    return (
        <div className="admin-panel">
            <h1>Panel Administrateur</h1>

            <div className="admin-sections">

                {/* Gestion utilisateurs */}
                <section>
                    <h2>Gestion des utilisateurs</h2>
                    <p>Consulter, ajouter ou supprimer les utilisateurs.</p>

                    <button
                        className="btn-section"
                        onClick={() => navigate("/admin/utilisateur/new")}
                    >
                        Ajouter un Utilisateur
                    </button>

                    <button
                        className="btn-section"
                        onClick={() => navigate("/admin/utilisateur/show/:id")}
                        style={{ marginLeft: '10px', backgroundColor: '#2ecc71' }}
                    >
                        Voir les Utilisateurs
                    </button>
                </section>

                {/* Gestion catégories */}
                <section>
                    <h2>Gestion des catégories</h2>
                    <p>Créer, modifier ou supprimer les catégories utilisées pour les tâches.</p>
                    <button className="btn-section" onClick={() => navigate("/admin/categorie/new")}>
                        Ajouter une catégorie
                    </button>
                    <button
                        className="btn-section"
                        onClick={() => navigate("/categorie/")}
                        style={{ marginLeft: '10px', backgroundColor: '#2ecc71' }}
                    >
                        Voir les catégories
                    </button>
                </section>

                {/* Gestion taches */}
                <section>
                    <h2>Gestion des taches</h2>
                    <p>Créer, modifier ou supprimer les tâches.</p>
                    <button className="btn-section" onClick={() => navigate("/tache/show")}>
                        Voir toutes les taches
                    </button>
                </section>

            </div>
        </div>
    );
}
