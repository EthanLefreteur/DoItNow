import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/taskForm.css';
function AddTaskPage() {
    const navigate = useNavigate();

    const [titreTache, setTitreTache] = useState('');
    const [description, setDescription] = useState('');
    const [categorie_id, setCategorieId] = useState(1);
    const [statut_id, setStatutId] = useState(1);
    const [priorite_id, setPrioriteId] = useState(1);
    const [echeance, setEcheance] = useState('');
    const [archiver, setArchiver] = useState(false);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem("token");

        try {
            await axios.post(
                "http://127.0.0.1:8000/tache/new",
                {
                    titre: titreTache,
                    description: description,
                    id_categorie: categorie_id,
                    id_statut: statut_id,
                    id_priorite: priorite_id,
                    date_echeance: echeance,
                    archiver: archiver
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            navigate('/tache');
        } catch (err) {
            setError("Erreur lors de l'ajout de la tâche.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/tache');
    };

    return (
        <div className="task-form-page">
            <div className="task-form-container">
                <h1>Ajouter une nouvelle tâche</h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>

                    {/* TITRE */}
                    <div className="form-group">
                        <label htmlFor="titre">Titre *</label>
                        <input
                            type="text"
                            id="titre"
                            value={titreTache}
                            onChange={(e) => setTitreTache(e.target.value)}
                            required
                            placeholder="Entrez le titre de la tâche"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Entrez la description"
                            rows={5}
                        />
                    </div>

                    {/* CATEGORIE */}
                    <div className="form-group">
                        <label htmlFor="categorie_id">Catégorie</label>
                        <select
                            id="categorie_id"
                            value={categorie_id}
                            onChange={(e) => setCategorieId(parseInt(e.target.value))}
                        >
                            <option value={1}>getCategories</option>
                        </select>
                    </div>

                    <div className="form-row">
                        {/* STATUT */}
                        <div className="form-group">
                            <label htmlFor="statut_id">Statut</label>
                            <select
                                id="statut_id"
                                value={statut_id}
                                onChange={(e) => setStatutId(parseInt(e.target.value))}
                            >
                                <option value={1}>En cours</option>
                                <option value={2}>Terminé</option>
                                <option value={3}>En attente</option>
                            </select>
                        </div>

                        {/* PRIORITE */}
                        <div className="form-group">
                            <label htmlFor="priorite_id">Priorité</label>
                            <select
                                id="priorite_id"
                                value={priorite_id}
                                onChange={(e) => setPrioriteId(parseInt(e.target.value))}
                            >
                                <option value={1}>Basse</option>
                                <option value={2}>Moyenne</option>
                                <option value={3}>Haute</option>
                            </select>
                        </div>

                        {/* ECHEANCE */}
                        <div className="form-group">
                            <label htmlFor="echeance">Échéance *</label>
                            <input
                                type="date"
                                id="echeance"
                                value={echeance}
                                onChange={(e) => setEcheance(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* BOUTONS */}
                    <div className="form-actions">
                        <button type="button" onClick={handleCancel} className="btn-cancel">
                            Annuler
                        </button>
                        <button type="submit" disabled={loading} className="btn-submit">
                            {loading ? 'Ajout en cours...' : 'Ajouter la tâche'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddTaskPage;
