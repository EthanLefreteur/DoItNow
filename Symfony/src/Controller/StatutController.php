<?php

namespace App\Controller;

use App\Entity\Statut;
use App\Repository\StatutRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/statut')]
class StatutController extends AbstractController {

    #[Route(path: "/", name: 'app_statut_index', methods: ['GET'])]
    public function index(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "USER")) {
            return $this->json([
                "code_erreur" => 401,
            ]);
        }

        $json_array = array();
        foreach ($entityManager->getRepository(Statut::class)->findAll() as $statut) {
            array_push($json_array, 
                array(
                    "id" => $statut->getId(),
                    "libelle" => $statut->getLibelle()
                )
            );
        }

        return $this->json([
            "code_erreur" => 200,
            "status" => $json_array,
        ]);
    }

    #[Route(path: "/show/{id}", name: 'app_statut_show', methods: ['GET'])]
    public function show(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $statut = $entityManager->getRepository(Statut::class)->findOneBy(array("id" => $id));

        if ($statut == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        return $this->json([
            "code_erreur" => 200,
            "libelle" => $statut->getLibelle(),
        ]);
    }

    #[Route(path: "/new", name: 'app_statut_new', methods: ['POST'])]
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

        $statut = new Statut();
        $statut->setLibelle($libelle);

        $entityManager->persist($statut);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
            "id" => 0,
        ]);
    }

    #[Route(path: "/delete/{id}", name: 'app_statut_delete', methods: ['POST'])]
    public function delete(Request $request, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $token = $request->headers->get("Authorization");

        if (!SecurityController::checkSecurity($entityManager, $token, "ADMIN")) {
            return $this->json([
                "code_erreur" => 403,
            ]);
        }

        $statut = $entityManager->getRepository(Statut::class)->findOneBy(array("id" => $id));

        if ($statut == null) {
            return $this->json([
                "code_erreur" => 400,
            ]);
        }

        $entityManager->remove($statut);
        $entityManager->flush();

        return $this->json([
            "code_erreur" => 200,
        ]);
    }
}