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
                    <button className="btn-section" onClick={() => navigate("/admin/utilisateur/new")}>
                        Ajouter un Utilisateur
                    </button>

                </section>

                {/* Gestion catégories */}
                <section>
                    <h2>Gestion des catégories</h2>
                    <p>Créer, modifier ou supprimer les catégories utilisées pour les tâches.</p>
                    <button className="btn-section" onClick={() => navigate("/admin/categories")}>
                        Gérer les catégories
                    </button>
                </section>

            </div>
        </div>
    );
}
