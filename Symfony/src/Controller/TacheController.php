<?php

namespace App\Controller;

use App\Repository\TacheRepository;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/tache')]
class TacheController extends AbstractController {

    #[Route(path: "/", name: 'app_tache_index', methods: ['GET'])]
    public function index(TacheRepository $tacheRepository): JsonResponse
    {
        return $this->json([
            "taches" => $tacheRepository->findAll()
        ]);
    }
}