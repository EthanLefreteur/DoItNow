import React, { useState, useEffect } from 'react';
import axios from "axios";

function Show() {
    const [error, setError] = useState('');
    let [categories, setCategories] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/categorie/", {
                    headers: {
                        'Authorization': localStorage.getItem("token")
                    }
                });

                if (response.data?.code_erreur === 200) {
                    setCategories(response.data.categories);
                } else {
                    setError("Couldn't fetch data");
                }

            } catch (err) {
                setError("Error while connecting to server");
            }
        };

        fetchCategories();

    }, []);
    var arr = [];
    Object.keys(categories).forEach(function (key) {
        arr.push(categories[key]);
    });

    return (
        <>
            <h1>Categories</h1>

            {categories && categories.length > 0 ? (
                <ul>
                    {categories.map((item) => (
                        <li key={item.id}>
                            <div>Libelle: {item.nom}</div>
                            <div>Couleur: {item.couleur}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No categories available.</p>
            )}

            {error && (
                <div className="error">
                    {error}
                </div>
            )}
        </>

    );
}

export default Show;