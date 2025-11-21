import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/taskForm.css';

function AddTaskPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        titre: '',
        description: '',
        categorie_id: 1,
        statut_id: 1,
        priorite_id: 1,
        echeance: '',
        archiver: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('_id') ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const token = localStorage.getItem("token");

        try {
            await axios.post("http://127.0.0.1:8000/tache/new", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/task');
        } catch (err) {
            setError("Erreur lors de l'ajout de la tâche.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/task');
    };

    return (
        <div className="task-form-page">
            <div className="task-form-container">
                <h1>Ajouter une nouvelle tâche</h1>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="titre">Titre *</label>
                        <input
                            type="text"
                            id="titre"
                            name="titre"
                            value={formData.titre}
                            onChange={handleChange}
                            required
                            placeholder="Entrez le titre de la tâche"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            placeholder="Entrez la description de la tâche"
                            rows={5}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="categorie_id">Catégorie</label>
                        <select
                            id="categorie_id"
                            name="categorie_id"
                            value={formData.categorie_id}
                            onChange={handleChange}
                        >
                            <option value={1}>getCategories</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="statut_id">Statut</label>
                            <select
                                id="statut_id"
                                name="statut_id"
                                value={formData.statut_id}
                                onChange={handleChange}
                            >
                                <option value={1}>En cours</option>
                                <option value={2}>Terminé</option>
                                <option value={3}>En attente</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="priorite_id">Priorité</label>
                            <select
                                id="priorite_id"
                                name="priorite_id"
                                value={formData.priorite_id}
                                onChange={handleChange}
                            >
                                <option value={1}>Basse</option>
                                <option value={2}>Moyenne</option>
                                <option value={3}>Haute</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="Echeance">Echeance *</label>
                            <input
                                type="text"
                                id="echeance"
                                name="echeance"
                                value={formData.echeance}
                                onChange={handleChange}
                                required
                                placeholder="Entrez l'échance de la tâche'"
                            />
                        </div>
                    </div>

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

