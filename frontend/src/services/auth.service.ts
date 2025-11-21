import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

class AuthService {
    login(identifiant: string, password: string) {
        return axios
            .post(API_URL + "/login", {
                identifiant,
                mot_de_passe: password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username: string, email: string, password: string, nom: string = "", prenom: string = "") {
        return axios.post(API_URL + "/signin", {
            identifiant: username,
            mail: email,
            mot_de_passe: password,
            nom,
            prenom
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();