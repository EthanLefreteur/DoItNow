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

    axios.post(`http://127.0.0.1:8000/tache/delete/${id}`,{}, {
            headers: { 'Authorization': localStorage.getItem("token") }
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
                navigate('/tache');
                return;
            }

            if (!window.confirm("Supprimer cette tâche ?")) {
                navigate('/tache');
                return;
            }

            try {
                await axios.post(`http://127.0.0.1:8000/tache/delete/${id}`,{}, {
                    headers: { 'Authorization': localStorage.getItem("token") }
                })
                navigate('/tache');
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
                <button onClick={() => navigate('/tache')}>Retour aux tâches</button>
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


