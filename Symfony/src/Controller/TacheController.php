<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Entity\Priorite;
use App\Entity\Statut;
use App\Entity\Tache;
use App\Entity\Utilisateur;
use App\Repository\TacheRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/tache')]
class TacheController extends AbstractController
{

    #[Route(path: "/", name: 'app_tache_index', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 401,
            ]);
        }

        $utilisateur = $entityManager->getRepository(Utilisateur::class)->findOneBy(array("token_jwt" => $token));

        $json_array = array();
        foreach ($entityManager->getRepository(Tache::class)->findBy(array("utilisateur" => $utilisateur)) as $tache) {
            array_push(
                $json_array,
                array(
                    "id" => $tache->getId(),
                    "titre" => $tache->getTitre(),
                    "description" => $tache->getDescription(),
                    "date_echeance" => $tache->getDateEcheance(),
                    "id_utilisateur" => $tache->getUtilisateur()->getId(),
                    "archiver" => $tache->isArchiver(),
                    "date_fin_archive" => $tache->getDateFinArchive(),
                    "id_categorie" => $tache->getCategorie()->getId(),
                    "libelle_categorie" => $tache->getCategorie()->getNom(),
                    "couleur_categorie" => $tache->getCategorie()->getCouleur(),
                    "id_priorite" => $tache->getPriorite()->getId(),
                    "libelle_priorite" => $tache->getPriorite()->getLibelle(),
                    "id_statue" => $tache->getStatut()->getId(),
                    "libelle_statue" => $tache->getStatut()->getLibelle(),
                )
            );
        }

        return $this->json([
            "code_erreur" => 200,
            "taches" => $json_array,
        ]);
    }

    #[Route(path: "/show/{id}", name: 'app_tache_show', methods: ['GET'])]
    public function show(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $tache = $entityManager->getRepository(Tache::class)->findOneBy(array("id" => $id));

        if ($tache == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        return $this->json([
            "code_erreur" => 200,
            "titre" => $tache->getTitre(),
            "description" => $tache->getDescription(),
            "date_echeance" => $tache->getDateEcheance(),
            "id_utilisateur" => $tache->getUtilisateur()->getId(),
            "archiver" => $tache->isArchiver(),
            "date_fin_archive" => $tache->getDateFinArchive(),
            "id_categorie" => $tache->getCategorie()->getId(),
            "libelle_categorie" => $tache->getCategorie()->getNom(),
            "couleur_categorie" => $tache->getCategorie()->getCouleur(),
            "id_priorite" => $tache->getPriorite()->getId(),
            "libelle_priorite" => $tache->getPriorite()->getLibelle(),
            "id_statue" => $tache->getStatut()->getId(),
            "libelle_statue" => $tache->getStatut()->getLibelle(),
        ]);
    }

    #[Route(path: "/new", name: 'app_tache_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $titre = $request->get("titre");
        $description = $request->get("description");
        $date_echeance = $request->get("date_echeance");

        if (SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            $id_utilisateur = $request->get("id_utilisateur");
            $utilisateur = $entityManager->getRepository(Utilisateur::class)->findOneBy(array("id" => $id_utilisateur));
        }

        $utilisateur = $entityManager->getRepository(Utilisateur::class)->findOneBy(array("token_jwt" => $token));
        $archiver = false;
        $date_fin_archive = null;
        $id_categorie = $request->get("id_categorie");
        $id_priorite = $request->get("id_priorite");
        $id_statut = $request->get("id_statut");


        if ( $titre == null || $description == null || $date_echeance == null || $archiver == null
            || $id_categorie == null || $id_priorite == null || $id_statut == null ) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        $categorie = $entityManager->getRepository(Categorie::class)->findOneBy(array("id" => $id_categorie));
        $priorite = $entityManager->getRepository(Priorite::class)->findOneBy(array("id" => $id_priorite));
        $statut = $entityManager->getRepository(Statut::class)->findOneBy(array("id" => $id_statut));

        if ($utilisateur == null || $categorie == null || $priorite == null || $statut == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        $tache = new Tache();
        $tache->setTitre($titre);
        $tache->setDescription($description);
        $tache->setDateEcheance($date_echeance);
        $tache->setUtilisateur($utilisateur);
        $tache->setArchiver($archiver);
        $tache->setDateFinArchive($date_fin_archive);
        $tache->setCategorie($categorie);
        $tache->setPriorite($priorite);
        $tache->setStatut($statut);

        $entityManager->persist($tache);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
            "id" => 0,
        ]);
    }

    #[Route(path: "/delete/{id}", name: 'app_tache_delete', methods: ['POST'])]
    public function delete(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $tache = $entityManager->getRepository(Tache::class)->findOneBy(array("id" => $id));

        if ($tache == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        if (SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            $entityManager->remove($tache);
            $entityManager->flush();

            return $this->json([
                "code_erreur" => 200,
            ]);
        }

        if ($tache->getUtilisateur() != $entityManager->getRepository(Utilisateur::class)->findOneBy(array("token_jwt" => $token))) {
            return $this->json([
                "code_erreur" => 403,
            ]); 
        }

        $entityManager->remove($tache);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
        ]);
    }
}
