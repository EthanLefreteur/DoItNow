<?php

namespace App\Controller;

use DateTime;
use App\Entity\Tache;
use App\Entity\Statut;
use App\Entity\Priorite;
use App\Entity\Categorie;
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
                    "id_statut" => $tache->getStatut()->getId(),
                    "libelle_statut" => $tache->getStatut()->getLibelle(),
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
            "id_statut" => $tache->getStatut()->getId(),
            "libelle_statut" => $tache->getStatut()->getLibelle(),
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


        if (
            is_null($titre) || is_null($description) || is_null($date_echeance) || is_null($archiver)
            || is_null($id_categorie) || is_null($id_priorite) || is_null($id_statut)
        ) {
            return $this->json([
                "code_erreur" => 400,
                "titre" => $titre,
                "description" => $description,
                "date_echeance" => $date_echeance,
                "archiver" => $archiver,
                "id_categorie" => $id_categorie,
                "id_priorite" => $id_priorite,
                "id_statut" => $id_statut,

            ]);
        }

        $categorie = $entityManager->getRepository(Categorie::class)->findOneBy(array("id" => $id_categorie));
        $priorite = $entityManager->getRepository(Priorite::class)->findOneBy(array("id" => $id_priorite));
        $statut = $entityManager->getRepository(Statut::class)->findOneBy(array("id" => $id_statut));

        if ($utilisateur == null || $categorie == null || $priorite == null || $statut == null) {
            return $this->json([
                "code_erreur" => 400,
                "index" => 2,
            ]);
        }

        $tache = new Tache();
        $tache->setTitre($titre);
        $tache->setDescription($description);
        $tache->setDateEcheance(new DateTime($date_echeance));
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
                "n" => 0,
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
                "a" => 0,
            ]);
        }

        $entityManager->remove($tache);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
        ]);
    }

    #[Route(path: "/edit/{id}", name: 'app_tache_edit', methods: ['POST'])]
    public function edit(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $tache = $entityManager->getRepository(Tache::class)->findOneBy(array( "id" => $id));

        if ($tache === null) {
            return $this->json([
                "code_erreur" => 400,
                "message" => "Tâche introuvable."
            ]);
        }

        $currentUser = $entityManager->getRepository(Utilisateur::class)
            ->findOneBy(["token_jwt" => $token]);

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            if ($tache->getUtilisateur()->getId() !== $currentUser->getId()) {
                return $this->json([
                    "code_erreur" => 403,
                ]);
            }
        }

        $titre = $request->get("titre");
        $description = $request->get("description");
        $date_echeance = $request->get("date_echeance");
        $id_categorie = $request->get("id_categorie");
        $id_priorite = $request->get("id_priorite");
        $id_statut = $request->get("id_statut");
        $archiver = $request->get("archiver");
        $date_fin_archive = $request->get("date_fin_archive");

        if ($titre !== null) $tache->setTitre($titre);
        if ($description != null) $tache->setDescription($description);
        if ($archiver !== null) $tache->setArchiver($archiver);

        if ($date_fin_archive !== null) {
            $tache->setDateFinArchive(new DateTime($date_fin_archive));
        }

        if ($date_echeance !== null) {
            try {
                $tache->setDateEcheance(new DateTime($date_echeance));
            } catch (\Exception $e) {
                return $this->json([
                    "code_erreur" => 400,
                ]);
            }
        }

        if ($id_categorie !== null) {
            $categorie = $entityManager->getRepository(Categorie::class)->find($id_categorie);
            if ($categorie === null) {
                return $this->json([
                    "code_erreur" => 400,
                ]);
            }
            $tache->setCategorie($categorie);
        }

        if ($id_priorite !== null) {
            $priorite = $entityManager->getRepository(Priorite::class)->find($id_priorite);
            if ($priorite === null) {
                return $this->json([
                    "code_erreur" => 400,
                ]);
            }
            $tache->setPriorite($priorite);
        }

        // Update Status
        if ($id_statut !== null) {
            $statut = $entityManager->getRepository(Statut::class)->find($id_statut);
            if ($statut === null) {
                return $this->json([
                    "code_erreur" => 400,
                ]);
            }
            $tache->setStatut($statut);
        }

        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
            "t" => $tache->getDescription(),
            "b" => $description,
        ]);
    }
}
