import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import type { Task } from '../../types/task.type';
import { deleteTask } from './delete.component';
import '../../style/task.css';

function TaskPage() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const loadTasks = () => {
        axios.get("http://127.0.0.1:8000/tache/", {
            headers: { Authorization: ` ${token}` }
        })
            .then(res => {
                setTasks(res.data.taches || []);
                setLoading(false);
            })
            .catch(() => {
                setError("Erreur lors du chargement des tâches.");
                setLoading(false);
            });
    };

    useEffect(() => { loadTasks(); }, []);

    const handleAddTask = () => {
        navigate('/tache/new');
    };

    const handleEditTask = (task: Task) => {
        navigate(`/tache/edit/${task.id}`);
    };

    const handleDeleteTask = (id: number) => {
        deleteTask({
            id,
            onTaskDeleted: () => loadTasks(),
            onError: (message: string) => setError(message)
        });
    };

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="split-screen">

            {/* Partie Gauche : Statique "Tache" */}
            <div className="left-pane">
                <h1>Tache</h1>
            </div>

            {/* Partie Droite : La liste */}
            <div className="right-pane">

                {/* En-tête : Titre + Logout */}
                <div className="header-container">
                    <h2>Mes Tâches</h2>
                    <button className="btn-black" onClick={logout}>Déconnexion</button>
                </div>

                {/* Bouton Ajouter (placé au dessus de la liste) */}
                <div className="add-btn-container">
                    <button className="btn-black" onClick={handleAddTask}>
                        + Ajouter tâche
                    </button>
                </div>

                {/* Messages d'état */}
                {error && <p className="error-msg">{error}</p>}
                {loading && <p className="loading-msg">Chargement...</p>}

                {/* En-têtes des colonnes */}
                <div className="list-grid list-headers">
                    <span>Titre</span>
                    <span>Description</span>
                    <span>Status</span>
                    <span style={{ textAlign: 'right' }}>Actions</span>
                </div>

                {/* Liste des tâches (Barres noires) */}
                <div className="task-list">
                    {tasks.map(task => (
                        <div key={task.id} className="list-grid task-row-black">

                            <div className="task-col" title={task.titre}>
                                {task.titre}
                            </div>

                            <div className="task-col" title={task.description}>
                                {task.description}
                            </div>

                            <div className="task-col">
                                {task.statut_id}
                            </div>

                            <div className="task-actions">
                                <button
                                    className="action-btn"
                                    onClick={() => handleEditTask(task)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="action-btn"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Suppr
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskPage;
