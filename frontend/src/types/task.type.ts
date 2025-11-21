export interface Task {
    id: number;
    titre: string;
    description?: string;
    statut_id: number;
    categorie_id: number;
    priorite_id: number;
    utilisateur_id?: number;
    echeance?: string;
    archiver: boolean;
    date_fin_archive?: string;
}

