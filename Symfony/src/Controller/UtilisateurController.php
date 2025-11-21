<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/utilisateur')]
class UtilisateurController extends AbstractController {
    
    #[Route(path: "/", name: 'app_utilisateur_index', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 401,
            ]);
        }

        $json_array = array();
        foreach ($entityManager->getRepository(Utilisateur::class)->findAll() as $user) {
            array_push($json_array, 
                array(
                    "id" => $user->getId(),
                    "identifiant" => $user->getIdentifiant(),
                    "adresse_mail" => $user->getAdresseMail()
                )
            );
        }
        
        return $this->json([
            "utilisateurs" => $json_array
        ]);
    }

    #[Route(path: "/show/{id}", name: 'app_utilisateur_show', methods: ['GET'])]
    public function show(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $utilisateur = $entityManager->getRepository(Utilisateur::class)->findOneBy(array("id" => $id));

        if ($utilisateur == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        return $this->json([
            "code_erreur" => 200,
            "identifiant" => $utilisateur->getIdentifiant(),
            "mot_de_passe" => $utilisateur->getMdp(),
            "mail" => $utilisateur->getAdresseMail(),
            "nom" => $utilisateur->getNom(),
            "prenom" => $utilisateur->getPrenom(),
            
        ]);
    }
}