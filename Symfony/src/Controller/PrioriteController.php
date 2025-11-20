<?php

namespace App\Controller;

use App\Repository\PrioriteRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/priorite')]
class PrioriteController extends AbstractController {

    #[Route(path: "/", name: 'app_priorite_index', methods: ['GET'])]
    public function index(Request $request): JsonResponse
    {
        return $this->json([
            "code-erreur" => 501,
        ]);
    }

    #[Route(path: "/show/{id}", name: 'app_priorite_show', methods: ['GET'])]
    public function show(Request $request): JsonResponse
    {
        return $this->json([
            "code-erreur" => 501,
        ]);
    }

    #[Route(path: "/new", name: 'app_priorite_new', methods: ['POST'])]
    public function new(Request $request): JsonResponse
    {
        return $this->json([
            "code-erreur" => 501,
        ]);
    }

    #[Route(path: "/delete/{id}", name: 'app_priorite_delete', methods: ['POST'])]
    public function delete(Request $request): JsonResponse
    {
        return $this->json([
            "code-erreur" => 501,
        ]);
    }
}