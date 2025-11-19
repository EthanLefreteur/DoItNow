<?php

namespace App\Controller;

use App\Repository\PrioriteRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/priorite')]
class PrioriteController extends AbstractController {

    #[Route(path: "/", name: 'app_priorite_index', methods: ['GET'])]
    public function index(PrioriteRepository $prioriteRepository): JsonResponse
    {
        $json_array = array();
        foreach ($prioriteRepository->findAll() as $priorite) {
            array_push($json_array, 
                array(
                    "id" => $priorite->getId(),
                    "libelle" => $priorite->getLibelle()
                )
            );
        }
        
        return $this->json([
            "statuts" => $json_array
        ]);
    }
}