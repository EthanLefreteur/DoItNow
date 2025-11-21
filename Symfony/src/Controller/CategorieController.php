<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Entity\Utilisateur;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/categorie')]
class CategorieController extends AbstractController {

    #[Route(path: "/", name: 'app_categorie_index', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $entityManager, CategorieRepository $categorieRepository): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 401,
            ]);
        }

        $json_array = array();
        foreach ($categorieRepository->findAll() as $categorie) {
            array_push($json_array, 
                array(
                    "id" => $categorie->getId(),
                    "nom" => $categorie->getNom(),
                    "couleur" => $categorie->getCouleur()
                )
            );
        }
        
        return $this->json([
            "code_erreur" => 200,
            "categories" => $json_array
        ]);
    }

    #[Route(path: "/new", name: 'app_categorie_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $nom = $request->get("nom");
        $couleur = $request->get("couleur");

        if ($nom == null || $couleur == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        $categorie = new Categorie();
        $categorie->setNom($nom);
        $categorie->setCouleur($couleur);

        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
            "id" => 0,
        ]);
    }

    #[Route(path: "/delete/{id}", name: 'app_categorie_delete', methods: ['POST'])]
    public function delete(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $categorie = $entityManager->getRepository(Categorie::class)->findOneBy(array("id" => $id));

        if ($categorie == null ) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        $entityManager->remove($categorie);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
        ]);
    }

    #[Route(path: "/show/{id}", name: 'app_categorie_delete', methods: ['GET'])]
    public function show(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $categorie = $entityManager->getRepository(Categorie::class)->findOneBy(array("id" => $id));

        if ($categorie == null ) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        return $this->json([
            "code_erreur" => 200,
            "nom" => $categorie->getNom(),
            "couleur" => $categorie->getCouleur(),
        ]);
    }
}