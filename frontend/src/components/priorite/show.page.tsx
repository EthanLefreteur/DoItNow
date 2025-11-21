import React, { useState } from 'react';
import axios from "axios";

function Show() {
    const [error, setError] = useState('');
    let [libelle, setLibelle] = useState('');

    let id = parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));

    axios.get("http://127.0.0.1:8000" + "/priorite/show/" + id, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }).then(
        response => {
            if (response.data.code_erreur == 200) {
                setLibelle(response.data.libelle);
            } else {
                setError("Couldn't fetch data");
            }
        }
    )

    return (
        <>
            <h1> Priorité </h1>
            <div>
                Id: {id}
            </div>
            <div>
                Niveau de priorite: {libelle}
            </div>
            <div>
                {error}
            </div>
        </>
    );
}

export default Show;