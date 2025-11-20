<?php

namespace App\Controller;

use App\Repository\UtilisateurRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/utilisateur')]
class UtilisateurController extends AbstractController {

    #[Route(path: "/", name: 'app_utilisateur_index', methods: ['GET'])]
    public function index(Request $request, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $json_array = array();
        foreach ($utilisateurRepository->findAll() as $user) {
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
}