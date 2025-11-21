<?php

namespace App\Controller;

use App\Entity\Priorite;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/priorite')]
class PrioriteController extends AbstractController {

    #[Route(path: "/", name: 'app_priorite_index', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 401,
            ]);
        }

        $json_array = array();
        foreach ($entityManager->getRepository(Priorite::class)->findAll() as $priorite) {
            array_push($json_array, 
                array(
                    "id" => $priorite->getId(),
                    "libelle" => $priorite->getLibelle()
                )
            );
        }

        return $this->json([
            "code_erreur" => 200,
            "priorites" => $json_array,
        ]);
    }

    #[Route(path: "/show/{id}", name: 'app_priorite_show', methods: ['GET'])]
    public function show(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $priorite = $entityManager->getRepository(Priorite::class)->findOneBy(array("id" => $id));

        if ($priorite == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        return $this->json([
            "code_erreur" => 200,
            "libelle" => $priorite->getLibelle(),
        ]);
    }

    #[Route(path: "/new", name: 'app_priorite_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $libelle = $request->get("libelle");

        if ($libelle == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        $priorite = new Priorite();
        $priorite->setLibelle($libelle);

        $entityManager->persist($priorite);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
            "id" => 0,
        ]);
    }

    #[Route(path: "/delete/{id}", name: 'app_priorite_delete', methods: ['POST'])]
    public function delete(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $priorite = $entityManager->getRepository(Priorite::class)->findOneBy(array("id" => $id));

        if ($priorite == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        $entityManager->remove($priorite);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
        ]);
    }
}