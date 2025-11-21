import React, { useState } from "react";

export default function RegisterAdmin() {
    const [formData, setFormData] = useState({
        identifiant: "",
        adresse_mail: "",
        mdp: "",
        nom: "",
        prenom: "",
        role: "", // par défaut
    });

    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setSuccess(false);

        try {
            const response = await fetch("http://127.0.0.1:8000" + "/admin/utilisateur/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Erreur lors de la création.");

            setMessage("Utilisateur créé avec succès !");
            setSuccess(true);

            setFormData({
                identifiant: "",
                adresse_mail: "",
                mdp: "",
                nom: "",
                prenom: "",
                role: "user",
            });

        } catch (error: any) {
            setMessage(error.message || "Une erreur est survenue.");
            setSuccess(false);
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />

                <form onSubmit={handleSubmit}>
                    {!success && (
                        <>
                            <div className="form-group">
                                <label>Identifiant</label>
                                <input
                                    type="text"
                                    name="identifiant"
                                    className="form-control"
                                    value={formData.identifiant}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="adresse_mail"
                                    className="form-control"
                                    value={formData.adresse_mail}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Nom</label>
                                <input
                                    type="text"
                                    name="nom"
                                    className="form-control"
                                    value={formData.nom}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Prénom</label>
                                <input
                                    type="text"
                                    name="prenom"
                                    className="form-control"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Mot de passe</label>
                                <input
                                    type="password"
                                    name="mdp"
                                    className="form-control"
                                    value={formData.mdp}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* AJOUT DU ROLE */}
                            <div className="form-group">
                                <label>Rôle</label>
                                <select
                                    name="role"
                                    className="form-control"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">Utilisateur</option>
                                    <option value="admin">Administrateur</option>
                                </select>
                            </div>

                            <button className="btn btn-primary btn-block" type="submit">
                                Créer l'utilisateur
                            </button>
                        </>
                    )}

                    {message && (
                        <div className={`alert ${success ? "alert-success" : "alert-danger"}`}>
                            {message}
                        </div>
                    )}
                </form>

            </div>
        </div>
    );
}
