import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import type { Task } from '../types/task.type';
import '../style/taskForm.css';

function EditTaskPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [formData, setFormData] = useState<Task | null>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadTask = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://127.0.0.1:8000/tache/edit/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData(response.data);
                setLoading(false);
            } catch (err) {
                setError("Erreur lors du chargement de la tâche.");
                setLoading(false);
            }
        };

        if (id) {
            loadTask();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!formData) return;

        const { name, value } = e.target;
        setFormData(prev => prev ? {
            ...prev,
            [name]: name.includes('_id') ? parseInt(value) : value
        } : null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        setSubmitting(true);
        setError('');

        const token = localStorage.getItem("token");

        try {
            await axios.put(`http://127.0.0.1:8000/tache/edit/${id}`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/task');
        } catch (err) {
            setError("Erreur lors de la modification de la tâche.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        navigate('/task');
    };

    if (loading) {
        return (
            <div className="task-form-page">
                <div className="task-form-container">
                    <p>Chargement...</p>
                </div>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="task-form-page">
                <div className="task-form-container">
                    <p className="error-message">Tâche non trouvée.</p>
                    <button onClick={handleCancel} className="btn-cancel">Retour</button>
                </div>
            </div>
        );
    }

    return (
        <div className="task-form-page">
            <div className="task-form-container">
                <h1>Modifier la tâche</h1>

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
                            <label htmlFor="categorie_id">Catégorie</label>
                            <select
                                id="categorie_id"
                                name="categorie_id"
                                value={formData.categorie_id}
                                onChange={handleChange}
                            >
                                <option value={1}>Travail</option>
                                <option value={2}>Personnel</option>
                                <option value={3}>Urgent</option>
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
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={handleCancel} className="btn-cancel">
                            Annuler
                        </button>
                        <button type="submit" disabled={submitting} className="btn-submit">
                            {submitting ? 'Modification en cours...' : 'Modifier la tâche'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTaskPage;

