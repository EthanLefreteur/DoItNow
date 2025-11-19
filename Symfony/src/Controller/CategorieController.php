<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/categorie')]
class CategorieController extends AbstractController {

    #[Route(path: "/", name: 'app_categorie_index', methods: ['GET'])]
    public function index(CategorieRepository $categorieRepository): JsonResponse
    {
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
    public function new(Request $request, CategorieRepository $categorieRepository, EntityManagerInterface $entityManager,): JsonResponse
    {
        //$categorie = new Categorie();
        $infos = $request->getContent();

        /*$entityManager->persist($categorie);
        $entityManager->flush();*/

        return $this->json([
            "code-erreur" => 200,
            /*"infos" => $infos,
            "header" => $request->headers->get("content-type")*/
        ]);
    }
}