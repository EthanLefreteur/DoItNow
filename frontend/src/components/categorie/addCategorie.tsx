import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../../style/adminPanel.css'; export default function AddCategorie() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [categorie, setCategorie] = useState({
        nom: "",
        couleur: "#000000",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategorie({
            ...categorie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            await axios.post(
                "http://127.0.0.1:8000/admin/categorie/new",
                {
                    nom: categorie.nom,
                    couleur: categorie.couleur
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess(true);
            setCategorie({ nom: "", couleur: "#000000" });

            // redirection vers la liste des catégories
            navigate("/admin/categorie/show/:id");
        } catch {
            setError("Erreur lors de l'ajout de la catégorie.");
        }
    };

    return (
        <div className="user-management-page">
            <h1>Ajouter une catégorie</h1>

            {error && <p className="error">{error}</p>}
            {success && <p className="success">Catégorie ajoutée avec succès !</p>}

            <form onSubmit={handleSubmit} className="user-form">
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom de la catégorie"
                    value={categorie.nom}
                    onChange={handleChange}
                    required
                />

                <label>Couleur :</label>
                <input
                    type="color"
                    name="couleur"
                    value={categorie.couleur}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Ajouter la catégorie</button>
            </form>
        </div>
    );
}
