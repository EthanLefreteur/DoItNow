import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

interface DeleteTaskProps {
    id: number;
    onTaskDeleted: () => void;
    onError: (message: string) => void;
}

export const deleteTask = ({ id, onTaskDeleted, onError }: DeleteTaskProps) => {
    if (!window.confirm("Supprimer cette tâche ?")) return;

    const token = localStorage.getItem("token");

    axios.delete(`http://127.0.0.1:8000/tache/tache/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(() => onTaskDeleted())
        .catch(() => onError("Erreur lors de la suppression."));
};

function DeleteTaskPage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState('');

    useEffect(() => {
        const handleDelete = async () => {
            if (!id) {
                navigate('/task');
                return;
            }

            if (!window.confirm("Supprimer cette tâche ?")) {
                navigate('/task');
                return;
            }

            const token = localStorage.getItem("token");

            try {
                await axios.delete(`http://127.0.0.1:8000/tache/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                navigate('/task');
            } catch (err) {
                setError("Erreur lors de la suppression.");
            }
        };

        handleDelete();
    }, [id, navigate]);

    if (error) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <p style={{ color: 'red' }}>{error}</p>
                <button onClick={() => navigate('/task')}>Retour aux tâches</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <p>Suppression en cours...</p>
        </div>
    );
}

export default DeleteTaskPage;


