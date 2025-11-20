<?php

namespace App\Controller;

use DateTime;
use DateInterval;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;
use Symfony\Component\PasswordHasher\Hasher\PlaintextPasswordHasher;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[Route('/')]
class SecurityController extends AbstractController {
    public const USER_PERM = "USER";
    public const ADMIN_PERM = "ADMIN";

    public ?PasswordHasherFactory $passwordHasherFactory = null;

    public function __construct() {
        $this->passwordHasherFactory = new PasswordHasherFactory([
            // auto hasher with default options for the User class (and children)
            'mdp_hasher' => ['algorithm' => 'auto', 
                'cost' => 4, # Lowest possible value for bcrypt
                'time_cost' => 3, # Lowest possible value for argon
                'memory_cost' => 10, # Lowest possible value for argon
            ],
        ]);
    }

    public static function checkSecurity(EntityManagerInterface $entityManager,string $token, string $perm): bool {
        
        if ($token == null) {
            return false;
        }

        $repo = $entityManager->getRepository(Utilisateur::class);
        $user = $repo->findOneBy(array('token_jwt' => $token));

        if ($user == null) {
            return false;
        }
        
        // never connected
        if ($user->getDateEcheanceToken() == null) {
            return false;
        }

        // expired
        if ($user->getDateEcheanceToken() < new DateTime()) {
            return false;
        }

        if ($perm == SecurityController::USER_PERM || $user->getRole() == $perm) {
            $date = new DateTime();
            $date = $date->add(new DateInterval("P1D"));
            $user->setDateEcheanceToken($date);
            $entityManager->flush();
            return true;
        }

        return false;
    }

    #[Route(path: "/login", name: 'app_login', methods: ['POST'])]
    public function login(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $identifant = $request->get("identifiant");
        $mdp = $request->get("mot_de_passe");

        if ($identifant == null || $mdp == null) {
            return $this->json([
                "code-erreur" => 400,
                "token" => '',
            ]);
        }

        $user = new Utilisateur();

        $userRepo = $entityManager->getRepository(Utilisateur::class);
        $user = $userRepo->findOneBy(array('identifiant' => $identifant));

        if ($user != null) {
            $passwordHasher = $this->passwordHasherFactory->getPasswordHasher('mdp_hasher');
            if (!$passwordHasher->verify($user->getMdp(), $mdp)) {
                return $this->json([
                    "code-erreur" => 401,
                    "token" => '',
                ]);
            }

            $token = $this->getJWT();

            $user->setTokenJwt($token);
            $date = new DateTime();
            $date = $date->add(new DateInterval("P1D"));
            $user->setDateEcheanceToken($date);
            $entityManager->flush();

            return $this->json([
                "code-erreur" => 200,
                "token" => $token
            ]);
        }

        return $this->json([
            "code-erreur" => 401,
            "token" => '',
        ]);
    }

    #[Route(path: "/logout", name: 'app_logout', methods: ['POST'])]
    public function logout(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $token = $request->headers->get("Authorization");

        if ($token == null) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $userRepo = $entityManager->getRepository(Utilisateur::class);
        $user = $userRepo->findOneBy(array('token_jwt' => $token));

        if ($user == null) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $user->setDateEcheanceToken(new DateTime());
        $entityManager->flush();

        return $this->json([
            "code-erreur" => 200,
            "token" => '',
        ]);
    }

    #[Route(path: "/signin", name: 'app_signin', methods: ['POST'])]
    public function signin(Request $request, EntityManagerInterface $entityManager): JsonResponse {
        $identifant = $request->get("identifiant");
        $mdp = $request->get("mot_de_passe");
        $mail = $request->get("mail");
        $nom = $request->get("nom");
        $prenom = $request->get("prenom");

        if ($identifant == null || $mdp == null || $mail == null || $nom == null || $prenom == null) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $userRepo = $entityManager->getRepository(Utilisateur::class);

        if ($userRepo->findOneBy(array('identifiant' => $identifant))) {
            return $this->json([
                "code-erreur" => 401,
                "token" => '',
            ]);
        }

        $passwordHasher = $this->passwordHasherFactory->getPasswordHasher('mdp_hasher');

        $user = new Utilisateur();

        $hashedPassword = $passwordHasher->hash( $mdp );

        $user->setAdresseMail($mail);
        $user->setIdentifiant($identifant);
        $user->setMdp($hashedPassword);
        $user->setRole("USER");
        $user->setNom($nom);
        $user->setPrenom($prenom);
        $token = $this->getJWT();
        $user->setTokenJwt($token);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            "code-erreur" => 200,
            "token" => $token,
        ]);
    }

    private function getJWT(): string {
        return "test_token";
    }
}