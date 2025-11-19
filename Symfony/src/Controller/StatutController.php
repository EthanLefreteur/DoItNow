<?php

namespace App\Controller;

use App\Repository\StatutRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/statut')]
class StatutController extends AbstractController {

    #[Route(path: "/", name: 'app_statut_index', methods: ['GET'])]
    public function index(StatutRepository $statutRepository): JsonResponse
    {
        $json_array = array();
        foreach ($statutRepository->findAll() as $statut) {
            array_push($json_array, 
                array(
                    "id" => $statut->getId(),
                    "libelle" => $statut->getLibelle()
                )
            );
        }
        
        return $this->json([
            "statuts" => $json_array
        ]);
    }
}