import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import type { Task } from '../types/task.type';
import { deleteTask } from './tache/deleteTask.component';
import '../style/task.css';

function TaskPage() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const loadTasks = () => {
        axios.get("http://127.0.0.1:8000/tache/", {
            headers: { Authorization: `Bearer ${token}` }
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
        <div className="task-page">

            <div className="header">
                <h1>Mes Tâches</h1>
                <button className="logout-btn" onClick={logout}>Déconnexion</button>
            </div>

            <div className="top-bar">
                <span>Titre</span>
                <span>Description</span>
                <span>Status</span>
                <span>Actions</span>
                <button className="add-btn" onClick={handleAddTask}>Ajouter tâche</button>
            </div>

            {error && <p className="error">{error}</p>}
            {loading && <p>Chargement...</p>}

            <div className="task-list">
                {tasks.map(task => (
                    <div key={task.id} className="task-row">

                        <div className="task-col">{task.titreTache}</div>
                        <div className="task-col">{task.description}</div>
                        <div className="task-col">{task.statut_id}</div>

                        <div className="task-actions">
                            <button className="edit-btn"
                                onClick={() => handleEditTask(task)}>

                            </button>

                            <button className="delete-btn"
                                onClick={() => handleDeleteTask(task.id)}>

                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
}

export default TaskPage;
