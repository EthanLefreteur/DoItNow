import React, { useState } from 'react';
import axios from "axios";

function Show() {
    const [error, setError] = useState('');
    let [categories, setCategories] = useState('');

    axios.get("http://127.0.0.1:8000" + "/categorie/", {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }).then(
        response => {
            if (response.data.code_erreur == 200) {
                setCategories(response.data.categories);
            } else {
                setError("Couldn't fetch data");
            }
        }
    )

    var arr = [];
    Object.keys(categories).forEach(function (key) {
        arr.push(categories[key]);
    });

    return (
        <>
            <h1> Categories </h1>
            <ul>
                {arr.map((item, key) =>
                    <li key={key}>
                        <div>Libelle: {item.nom}</div>
                        <div>Couleur: {item.couleur}</div>
                    </li>
                )}
            </ul>
            <div>
                {error}
            </div>
        </>
    );
}

export default Show;