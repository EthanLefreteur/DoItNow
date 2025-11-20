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
                "code-erreur" => 401,
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
            "categories" => $json_array
        ]);
    }

    #[Route(path: "/new", name: 'app_categorie_new', methods: ['POST'])]
    public function new(Request $request, CategorieRepository $categorieRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code-erreur" => 401,
            ]);
        }

        $nom = $request->get("nom");
        $couleur = $request->get("couleur");

        if ($nom == null || $couleur == null) {
            return $this->json([
                "code-erreur" => 400,
            ]);
        }

        $categorie = new Categorie();
        $categorie->setNom($nom);
        $categorie->setCouleur($couleur);

        $entityManager->persist($categorie);
        $entityManager->flush();

        return $this->json([
            "code-erreur" => 200,
            "id" => 0,
        ]);
    }

    #[Route(path: "/delete/{id}", name: 'app_categorie_delete', methods: ['POST'])]
    public function delete(Request $request, CategorieRepository $categorieRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        return $this->json([
            "code-erreur" => 501,
        ]);
    }

    #[Route(path: "/show/{id}", name: 'app_categorie_delete', methods: ['GET'])]
    public function show(Request $request, CategorieRepository $categorieRepository, EntityManagerInterface $entityManager): JsonResponse
    {
        return $this->json([
            "code-erreur" => 501,
            "id" => 0,
            "nom" => "",
            "couleur" => "",
        ]);
    }
}